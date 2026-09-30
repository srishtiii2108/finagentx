import portfolioModel from "../models/portfolioModel.js";
import transactionModel from "../models/transactionModel.js";

// 1. Get User Portfolio
export const getPortfolio = async (req, res) => {
    try {
        const userId = req.userId; // Middleware se aayega

        let portfolio = await portfolioModel.findOne({ userId });

        if (!portfolio) {
            portfolio = await portfolioModel.create({
                userId,
                cashBalance: 1000000,
                holdings: []
            });
        }

        const transactions = await transactionModel.find({ userId }).sort({ createdAt: -1 }).limit(20);

        return res.json({
            success: true,
            portfolio,
            transactions
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// 2. Execute Virtual Trade (BUY / SELL)
export const executeTrade = async (req, res) => {
    try {
        const userId = req.userId; // Middleware se secure userId
        const { symbol, quantity, tradeType, currentPrice } = req.body;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized user!" });
        }

        if (!symbol || !quantity || !tradeType || !currentPrice || quantity <= 0) {
            return res.status(400).json({ success: false, message: "Invalid trade parameters!" });
        }

        let portfolio = await portfolioModel.findOne({ userId });

        if (!portfolio) {
            portfolio = await portfolioModel.create({
                userId,
                cashBalance: 1000000,
                holdings: []
            });
        }

        const upperSymbol = symbol.toUpperCase();
        const totalAmount = quantity * currentPrice;

        if (tradeType === "BUY") {
            if (portfolio.cashBalance < totalAmount) {
                return res.json({ success: false, message: "Insufficient virtual cash balance!" });
            }

            portfolio.cashBalance -= totalAmount;

            const existingHolding = portfolio.holdings.find(h => h.symbol === upperSymbol);

            if (existingHolding) {
                const totalQty = existingHolding.quantity + quantity;
                const totalSpent = (existingHolding.quantity * existingHolding.averagePrice) + totalAmount;
                existingHolding.averagePrice = totalSpent / totalQty;
                existingHolding.quantity = totalQty;
            } else {
                portfolio.holdings.push({
                    symbol: upperSymbol,
                    quantity,
                    averagePrice: currentPrice
                });
            }

        } else if (tradeType === "SELL") {
            const existingHolding = portfolio.holdings.find(h => h.symbol === upperSymbol);

            if (!existingHolding || existingHolding.quantity < quantity) {
                return res.json({ success: false, message: "You do not own enough shares to sell!" });
            }

            portfolio.cashBalance += totalAmount;
            existingHolding.quantity -= quantity;
            if (existingHolding.quantity === 0) {
                portfolio.holdings = portfolio.holdings.filter(h => h.symbol !== upperSymbol);
            }
        } else {
            return res.status(400).json({ success: false, message: "Invalid trade type! Use BUY or SELL." });
        }

        await portfolio.save();

        const newTransaction = await transactionModel.create({
            userId,
            symbol: upperSymbol,
            type: tradeType,
            quantity,
            price: currentPrice,
            totalAmount
        });

        return res.json({
            success: true,
            message: `Successfully executed ${tradeType} for ${quantity} shares of ${upperSymbol}`,
            portfolio,
            transaction: newTransaction
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};