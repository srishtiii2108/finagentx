import React from 'react';
import { TrendingUp, TrendingDown, Zap, ShieldCheck } from 'lucide-react';

const MarketBanner = ({ indices, mood }) => {
  if (!indices) return null;

  const nifty = indices.nifty || { value: 0, change: 0, percent: 0 };
  const sensex = indices.sensex || { value: 0, change: 0, percent: 0 };

  return (
    <div className="bg-brand-surface border border-brand-border p-5 rounded-xl mb-6 shadow-md">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        
        {/* Indices Grid */}
        <div className="flex flex-wrap items-center gap-6">
          {/* NIFTY 50 */}
          <div className="flex items-center gap-3 bg-brand-dark/60 border border-brand-border px-4 py-2.5 rounded-lg">
            <div>
              <p className="text-brand-muted text-xs font-semibold uppercase">NIFTY 50</p>
              <p className="text-lg font-bold text-white">₹{nifty.value}</p>
            </div>
            <div className={`flex items-center text-xs font-bold px-2 py-1 rounded ${
              nifty.change >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {nifty.change >= 0 ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : <TrendingDown className="w-3.5 h-3.5 mr-1" />}
              {nifty.change >= 0 ? '+' : ''}{nifty.change} ({nifty.percent}%)
            </div>
          </div>

          {/* SENSEX */}
          <div className="flex items-center gap-3 bg-brand-dark/60 border border-brand-border px-4 py-2.5 rounded-lg">
            <div>
              <p className="text-brand-muted text-xs font-semibold uppercase">SENSEX</p>
              <p className="text-lg font-bold text-white">₹{sensex.value}</p>
            </div>
            <div className={`flex items-center text-xs font-bold px-2 py-1 rounded ${
              sensex.change >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {sensex.change >= 0 ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : <TrendingDown className="w-3.5 h-3.5 mr-1" />}
              {sensex.change >= 0 ? '+' : ''}{sensex.change} ({sensex.percent}%)
            </div>
          </div>
        </div>

        {/* AI Market Mood Indicator */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-900/40 to-slate-900 border border-blue-500/30 px-4 py-2.5 rounded-lg">
          <Zap className="w-4 h-4 text-blue-400 animate-pulse" />
          <span className="text-xs text-brand-muted font-medium">AI Market Sentiment:</span>
          <span className={`text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
            mood === 'BULLISH' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
            mood === 'BEARISH' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
            'bg-amber-500/20 text-amber-400 border border-amber-500/40'
          }`}>
            {mood || 'NEUTRAL'}
          </span>
        </div>

      </div>
    </div>
  );
};

export default MarketBanner;