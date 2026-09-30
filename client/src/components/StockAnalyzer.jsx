import React, { useState } from 'react';
import { analyzeStock } from '../services/api';
import { Search, TrendingUp, TrendingDown, ShieldAlert, CheckCircle, Activity, Building2 } from 'lucide-react';

export default function StockAnalyzer() {
  const [ticker, setTicker] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!ticker.trim()) return;

    setLoading(true);
    setError('');
    setData(null);

    try {
      const result = await analyzeStock(ticker.trim());
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      {/* Search Bar Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl mb-8">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Activity className="text-blue-500" /> Multi-Agent AI Investment Engine
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          Search any stock ticker (e.g., TCS.NS, RELIANCE.NS, AAPL) to trigger Bull, Bear, and Judge AI debate.
        </p>

        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              placeholder="Enter stock ticker (e.g. TCS.NS)..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Run AI Analysis'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-950/50 border border-red-800 text-red-300 rounded-xl text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-slate-400">Agents are gathering financial data, scanning news, and debating...</p>
        </div>
      )}

      {/* Results Section */}
      {data && (
        <div className="space-y-8 animate-fadeIn">
          {/* Company Quick Overview */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <span className="text-slate-400 text-xs uppercase tracking-wider">Company</span>
              <h3 className="text-xl font-bold text-white mt-1">{data.company_info.company_name}</h3>
              <p className="text-slate-400 text-sm">{data.ticker}</p>
            </div>
            <div>
              <span className="text-slate-400 text-xs uppercase tracking-wider">Current Price</span>
              <h3 className="text-xl font-bold text-emerald-400 mt-1">₹{data.company_info.current_price}</h3>
              <p className="text-slate-400 text-sm">P/E: {data.company_info.pe_ratio}</p>
            </div>
            <div>
              <span className="text-slate-400 text-xs uppercase tracking-wider">Sector</span>
              <h3 className="text-lg font-semibold text-white mt-1">{data.company_info.sector}</h3>
              <p className="text-slate-400 text-sm">{data.company_info.industry}</p>
            </div>
            <div>
              <span className="text-slate-400 text-xs uppercase tracking-wider">News Analyzed</span>
              <h3 className="text-xl font-bold text-blue-400 mt-1">{data.news_analyzed} Articles</h3>
              <p className="text-slate-400 text-sm">Real-time sentiment checked</p>
            </div>
          </div>

          {/* Judge Verdict Box */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border-2 border-blue-500/50 p-6 rounded-2xl shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div>
                <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Final Verdict (Judge Agent)</span>
                <h3 className="text-3xl font-black text-white mt-1 flex items-center gap-3">
                  {data.ai_analysis.judge_agent.recommendation}
                  <span className={`text-sm px-3 py-1 rounded-full font-semibold ${
                    data.ai_analysis.judge_agent.recommendation === 'BUY' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    data.ai_analysis.judge_agent.recommendation === 'SELL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    Confidence: {data.ai_analysis.judge_agent.confidence}%
                  </span>
                </h3>
              </div>
              <div className="text-right">
                <span className="text-slate-400 text-xs">Risk Assessment</span>
                <p className="text-lg font-bold text-amber-400">{data.ai_analysis.judge_agent.risk_level} Risk</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800">
              {data.ai_analysis.judge_agent.reasoning_summary}
            </p>
          </div>

          {/* Bull vs Bear Debate Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bull Case */}
            <div className="bg-slate-900 border border-emerald-500/30 p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-emerald-400">
                <TrendingUp className="w-6 h-6" />
                <h4 className="font-bold text-lg">Bull Analyst Case</h4>
              </div>
              <div className="text-slate-300 text-sm whitespace-pre-line leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
                {data.ai_analysis.bull_agent}
              </div>
            </div>

            {/* Bear Case */}
            <div className="bg-slate-900 border border-red-500/30 p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-red-400">
                <TrendingDown className="w-6 h-6" />
                <h4 className="font-bold text-lg">Bear Analyst Case</h4>
              </div>
              <div className="text-slate-300 text-sm whitespace-pre-line leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
                {data.ai_analysis.bear_agent}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}