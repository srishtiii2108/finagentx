import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { executeVirtualTrade } from '../services/api';

const TradeModal = ({ isOpen, onClose, ticker, currentPrice, companyName, onTradeSuccess }) => {
  const [tradeType, setTradeType] = useState('BUY');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  if (!isOpen) return null;

  const totalCost = quantity * currentPrice;

  const handleTradeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // Note: userId backend mein req.body se ya token se uthega based on your auth middleware
      const payload = {
        symbol: ticker,
        quantity: Number(quantity),
        tradeType,
        currentPrice: Number(currentPrice)
      };

      const res = await executeVirtualTrade(payload);
      if (res.success) {
        setMessage({ text: res.message, type: 'success' });
        setTimeout(() => {
          onTradeSuccess && onTradeSuccess();
          onClose();
        }, 1500);
      } else {
        setMessage({ text: res.message, type: 'error' });
      }
    } catch (err) {
      setMessage({ text: typeof err === 'string' ? err : 'Trade execution failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Virtual Trading Simulator</span>
            <h3 className="text-lg font-bold text-white">{companyName || ticker} ({ticker})</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleTradeSubmit} className="p-6 space-y-5">
          
          {/* Buy / Sell Switch Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setTradeType('BUY')}
              className={`py-2 text-sm font-bold rounded-lg transition ${
                tradeType === 'BUY' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              BUY
            </button>
            <button
              type="button"
              onClick={() => setTradeType('SELL')}
              className={`py-2 text-sm font-bold rounded-lg transition ${
                tradeType === 'SELL' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              SELL
            </button>
          </div>

          {/* Current Market Price Box */}
          <div className="flex justify-between items-center bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
            <span className="text-slate-400 text-xs uppercase font-medium">Live Market Price</span>
            <span className="text-lg font-bold text-white">₹{currentPrice?.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
          </div>

          {/* Quantity Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Number of Shares</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 font-semibold"
            />
          </div>

          {/* Total Value Calculation */}
          <div className="flex justify-between items-center border-t border-slate-800 pt-4">
            <span className="text-slate-400 text-sm">Total Estimated Cost</span>
            <span className="text-xl font-extrabold text-blue-400">₹{totalCost.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
          </div>

          {/* Status Message */}
          {message.text && (
            <div className={`p-3 rounded-xl text-xs font-medium text-center ${
              message.type === 'success' ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300' : 'bg-red-950/60 border border-red-800 text-red-300'
            }`}>
              {message.text}
            </div>
          )}

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-sm text-white transition shadow-lg ${
              tradeType === 'BUY' ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/30' : 'bg-red-600 hover:bg-red-500 shadow-red-900/30'
            } disabled:opacity-50`}
          >
            {loading ? 'Executing Trade...' : `Confirm & Execute ${tradeType}`}
          </button>

        </form>

      </div>
    </div>
  );
};

export default TradeModal;