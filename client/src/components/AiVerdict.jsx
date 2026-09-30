import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const AiVerdict = ({ aiAnalysis }) => {
  const { judge_agent, bull_agent, bear_agent } = aiAnalysis;

  return (
    <>
      {/* Judge Verdict Box */}
      <div className="bg-gradient-to-r from-brand-surface via-slate-900 to-slate-950 border-2 border-blue-500/50 p-6 rounded-xl shadow-xl mt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">Judge AI Verdict</span>
            <h3 className="text-2xl font-extrabold text-white mt-1 flex items-center gap-3">
              {judge_agent.recommendation}
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                judge_agent.recommendation === 'BUY' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                judge_agent.recommendation === 'SELL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                Confidence: {judge_agent.confidence}%
              </span>
            </h3>
          </div>
          <div className="text-right">
            <span className="text-brand-muted text-xs">Risk Level</span>
            <p className="text-base font-bold text-amber-400">{judge_agent.risk_level} Risk</p>
          </div>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed bg-brand-dark/50 p-4 rounded-lg border border-brand-border">
          {judge_agent.reasoning_summary}
        </p>
      </div>

      {/* Bull vs Bear Debate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-brand-surface border border-emerald-500/30 p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-3 text-emerald-400">
            <TrendingUp className="w-5 h-5" />
            <h4 className="font-bold text-base">Bull Analyst Case</h4>
          </div>
          <div className="text-slate-300 text-sm whitespace-pre-line leading-relaxed bg-brand-dark/40 p-4 rounded-lg border border-brand-border">
            {bull_agent}
          </div>
        </div>

        <div className="bg-brand-surface border border-red-500/30 p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-3 text-red-400">
            <TrendingDown className="w-5 h-5" />
            <h4 className="font-bold text-base">Bear Analyst Case</h4>
          </div>
          <div className="text-slate-300 text-sm whitespace-pre-line leading-relaxed bg-brand-dark/40 p-4 rounded-lg border border-brand-border">
            {bear_agent}
          </div>
        </div>
      </div>
    /</>
  );
};

export default AiVerdict;