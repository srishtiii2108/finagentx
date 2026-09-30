import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, unique: true },
    cashBalance: { type: Number, required: true, default: 1000000 }, // Starting with 10 Lakhs
    holdings: [
        {
            symbol: { type: String, required: true }, // e.g., "TCS.NS"
            quantity: { type: Number, required: true },
            averagePrice: { type: Number, required: true }
        }
    ]
}, { timestamps: true });

const portfolioModel = mongoose.models.portfolio || mongoose.model('portfolio', portfolioSchema);

export default portfolioModel;