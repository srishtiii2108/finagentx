import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';
import { fetchUserPortfolio, analyzeStock } from '../services/api';
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Layers, History, RefreshCw, Stethoscope } from 'lucide-react';

const Portfolio = () => {
  const navigate = useNavigate();
  const [portfolioData, setPortfolioData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [livePrices, setLivePrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPortfolioData = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchUserPortfolio();
      if (res.success) {
        const portfolio = res.portfolio;
        setPortfolioData(portfolio);
        setTransactions(res.transactions || []);
        
        // Turant loading off kar do taaki UI block na ho
        setLoading(false);

        // Background me live prices fetch karo
        const prices = {};
        for (const item of (portfolio.holdings || [])) {
          prices[item.symbol] = item.averagePrice; // Default fallback to avg buy price
          try {
            const stockRes = await analyzeStock(item.symbol);
            if (stockRes && stockRes.company_info?.current_price) {
              prices[item.symbol] = stockRes.company_info.current_price;
            }
          } catch (err) {
            console.error(`Failed live price for ${item.symbol}`);
          }
        }
        setLivePrices(prices);
      }
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to load portfolio data');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const cashBalance = portfolioData?.cashBalance || 1000000;
  const holdings = portfolioData?.holdings || [];
  
  let investedValue = 0;
  let currentMarketValue = 0;

  holdings.forEach(item => {
    const inv = item.quantity * item.averagePrice;
    const curPrice = livePrices[item.symbol] || item.averagePrice;
    const curVal = item.quantity * curPrice;
    
    investedValue += inv;
    currentMarketValue += curVal;
  });

  const totalNetWorth = cashBalance + currentMarketValue;
  const totalProfitLoss = currentMarketValue - investedValue;
  const totalProfitLossPercentage = investedValue > 0 ? (totalProfitLoss / investedValue) * 100 : 0;

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <DashboardNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header with New AI Doctor Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Virtual Trading Portfolio</h1>
            <p className="text-brand-muted text-sm">Manage your simulated assets, active holdings, and transaction history.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/portfolio-doctor')}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-brand-blue hover:from-purple-500 hover:to-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-lg shadow-purple-900/20 border border-purple-500/30"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              AI Portfolio Doctor
            </button>
            <button
              onClick={loadPortfolioData}
              disabled={loading}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold transition border border-slate-700"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/50 border border-red-800 text-red-300 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Top Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          
          {/* Net Worth */}
          <div className="bg-brand-surface border border-brand-border p-5 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">Total Net Worth</span>
              <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-white">
              ₹{totalNetWorth.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </h3>
            <span className="text-xs text-emerald-400 font-medium mt-1 inline-block">Initial Capital: ₹10,00,000</span>
          </div>

          {/* Cash Balance */}
          <div className="bg-brand-surface border border-brand-border p-5 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">Available Cash</span>
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-white">
              ₹{cashBalance.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </h3>
            <span className="text-xs text-brand-muted mt-1 inline-block">Ready for deployment</span>
          </div>

          {/* Invested Value */}
          <div className="bg-brand-surface border border-brand-border p-5 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">Invested Capital</span>
              <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl">
                <Layers className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-white">
              ₹{investedValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </h3>
            <span className="text-xs text-brand-muted mt-1 inline-block">{holdings.length} Active Stocks</span>
          </div>

          {/* Total P/L */}
          <div className="bg-brand-surface border border-brand-border p-5 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">Total Profit / Loss</span>
              <div className={`p-2 rounded-xl ${totalProfitLoss >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                {totalProfitLoss >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              </div>
            </div>
            <h3 className={`text-2xl font-black ${totalProfitLoss >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {totalProfitLoss >= 0 ? '+' : ''}₹{totalProfitLoss.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </h3>
            <span className={`text-xs font-medium mt-1 inline-block ${totalProfitLoss >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {totalProfitLoss >= 0 ? '+' : ''}{totalProfitLossPercentage.toFixed(2)}% returns
            </span>
          </div>

        </div>

        {/* Holdings Section */}
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 mb-8 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-400" /> Active Holdings
          </h3>

          {loading ? (
            <div className="py-12 text-center text-brand-muted animate-pulse">Loading portfolio holdings...</div>
          ) : holdings.length === 0 ? (
            <div className="py-12 text-center border border-dashed border-slate-800 rounded-xl">
              <p className="text-slate-400 text-sm font-medium mb-1">No active stock holdings found.</p>
              <p className="text-brand-muted text-xs">Search for any stock on the dashboard and execute a virtual trade to start investing!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-xs font-bold text-brand-muted uppercase">
                    <th className="py-3 px-4">Symbol</th>
                    <th className="py-3 px-4">Qty</th>
                    <th className="py-3 px-4">Avg. Price</th>
                    <th className="py-3 px-4">Live Price</th>
                    <th className="py-3 px-4">Current Value</th>
                    <th className="py-3 px-4">Profit / Loss</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {holdings.map((item, idx) => {
                    const livePrice = livePrices[item.symbol] || item.averagePrice;
                    const invested = item.quantity * item.averagePrice;
                    const currentVal = item.quantity * livePrice;
                    const pl = currentVal - invested;
                    const plPerc = invested > 0 ? (pl / invested) * 100 : 0;

                    return (
                      <tr key={idx} className="hover:bg-slate-900/40 transition">
                        <td className="py-4 px-4 font-bold text-white">{item.symbol}</td>
                        <td className="py-4 px-4 text-slate-300 font-semibold">{item.quantity}</td>
                        <td className="py-4 px-4 text-slate-300">₹{item.averagePrice.toFixed(2)}</td>
                        <td className="py-4 px-4 text-slate-200 font-bold">₹{livePrice.toFixed(2)}</td>
                        <td className="py-4 px-4 text-slate-200 font-semibold">₹{currentVal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                        <td className={`py-4 px-4 font-bold ${pl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {pl >= 0 ? '+' : ''}₹{pl.toFixed(2)} ({pl >= 0 ? '+' : ''}{plPerc.toFixed(2)}%)
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button 
                            onClick={() => navigate('/dashboard')}
                            className="bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white px-3 py-1 rounded-lg text-xs font-semibold transition border border-blue-500/30"
                          >
                            Trade More
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Transaction History Section */}
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <History className="w-5 h-5 text-purple-400" /> Recent Transactions
          </h3>

          {transactions.length === 0 ? (
            <div className="py-8 text-center text-brand-muted text-sm">No transaction records found yet.</div>
          ) : (
            <div className="space-y-3">
              {transactions.map((tx, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${tx.type === 'BUY' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                      {tx.type === 'BUY' ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{tx.type} {tx.symbol}</h4>
                      <p className="text-xs text-brand-muted">{new Date(tx.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white text-sm">₹{tx.totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                    <p className="text-xs text-brand-muted">{tx.quantity} shares @ ₹{tx.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default Portfolio;