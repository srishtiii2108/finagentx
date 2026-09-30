import React from 'react';
import { Flame, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const TrendingStocks = ({ stocks, onSelectTicker }) => {
  if (!stocks || stocks.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <Flame className="w-5 h-5 text-amber-400" />
        <h3 className="text-base font-bold text-white">Trending Stocks (One-Click AI Analysis)</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {stocks.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onSelectTicker(item.symbol)}
            className="bg-brand-surface border border-brand-border hover:border-brand-blue p-3.5 rounded-xl text-left transition-all hover:bg-slate-800/60 group cursor-pointer shadow-sm"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
                {item.name}
              </span>
              {item.change >= 0 ? (
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-400" />
              )}
            </div>
            <p className="text-xs text-brand-muted mb-1">{item.symbol}</p>
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-200">₹{item.price}</span>
              <span className={`font-bold ${item.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {item.change >= 0 ? '+' : ''}{item.change_percent}%
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrendingStocks;