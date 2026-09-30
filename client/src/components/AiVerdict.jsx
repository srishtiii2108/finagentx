import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, ShieldCheck, Activity, CheckCircle, XCircle } from 'lucide-react';

const AiVerdict = ({ aiAnalysis, technicalInfo }) => {
  if (!aiAnalysis) return null;

  const { judge_agent, bull_agent, bear_agent } = aiAnalysis;

  // Helper function to format bullet points
  const formatAgentPoints = (text) => {
    if (!text) return null;
    const points = text.split(/(?=\d\.\s)/g);

    return points.map((pt, idx) => {
      if (!pt.trim()) return null;
      const cleaned = pt.replace(/^\d+\.\s*/, '');
      const parts = cleaned.split(/\*\*/);

      let title = "";
      let description = "";

      if (parts.length >= 3) {
        title = parts[1].trim();
        description = parts.slice(2).join(' ').replace(/\*\*/g, '').trim();
      } else {
        description = cleaned.replace(/\*\*/g, '').trim();
      }

      return (
        <div key={idx} className="mb-3 last:mb-0 bg-slate-950/50 border border-slate-800/80 p-3.5 rounded-xl">
          {title && (
            <h5 className="text-white font-bold text-xs uppercase tracking-wide mb-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              {title}
            </h5>
          )}
          <p className="text-slate-300 text-xs leading-relaxed">{description}</p>
        </div>
      );
    });
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Judge Verdict Box */}
      <div className="bg-gradient-to-br from-brand-surface via-slate-900 to-slate-950 border-2 border-blue-500/50 p-6 rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">Explainable Multi-Agent Verdict</span>
            </div>
            <h3 className="text-3xl font-black text-white flex items-center gap-3 mt-1">
              {judge_agent.recommendation}
              <span className={`text-xs px-3 py-1 rounded-full font-bold tracking-wide uppercase ${
                judge_agent.recommendation === 'BUY' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                judge_agent.recommendation === 'SELL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                Confidence: {judge_agent.confidence}%
              </span>
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-brand-dark/85 border border-brand-border px-4 py-2 rounded-xl text-right">
              <span className="text-brand-muted text-xs block uppercase font-medium">Risk Level</span>
              <span className="text-sm font-bold text-amber-400 flex items-center justify-end gap-1.5 mt-0.5">
                <AlertTriangle className="w-4 h-4" /> {judge_agent.risk_level} Risk
              </span>
            </div>
          </div>
        </div>

        {/* Reasoning Summary */}
        <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl relative z-10 mb-6">
          <p className="text-slate-200 text-sm leading-relaxed font-medium">
            {judge_agent.reasoning_summary}
          </p>
        </div>

        {/* Visual Factor Matrix (Explainability Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 relative z-10">
          <div className="bg-brand-dark/60 border border-slate-800 p-3.5 rounded-xl">
            <span className="text-xs text-brand-muted uppercase font-semibold block mb-1">Fundamental Health</span>
            <span className={`text-sm font-bold px-2.5 py-1 rounded inline-block ${
              judge_agent.fundamental_score === 'Strong' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
            }`}>
              {judge_agent.fundamental_score || 'Moderate'}
            </span>
          </div>

          <div className="bg-brand-dark/60 border border-slate-800 p-3.5 rounded-xl">
            <span className="text-xs text-brand-muted uppercase font-semibold block mb-1">Technical Momentum</span>
            <span className={`text-sm font-bold px-2.5 py-1 rounded inline-block ${
              judge_agent.technical_score === 'Bullish' ? 'bg-emerald-500/20 text-emerald-400' : 
              judge_agent.technical_score === 'Bearish' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
            }`}>
              {judge_agent.technical_score || 'Neutral'} ({technicalInfo?.rsi ? `RSI: ${technicalInfo.rsi}` : ''})
            </span>
          </div>

          <div className="bg-brand-dark/60 border border-slate-800 p-3.5 rounded-xl">
            <span className="text-xs text-brand-muted uppercase font-semibold block mb-1">News Sentiment</span>
            <span className={`text-sm font-bold px-2.5 py-1 rounded inline-block ${
              judge_agent.sentiment_score === 'Positive' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {judge_agent.sentiment_score || 'Neutral'}
            </span>
          </div>
        </div>

        {/* Data Provenance Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800/50 flex flex-col sm:flex-row justify-between items-center text-xs text-brand-muted gap-2">
          <span>Model: Cohere Command-R+ (08-2024)</span>
          <span>Analysis Timestamp: {judge_agent.data_timestamp || 'Live Real-Time'}</span>
        </div>
      </div>

      {/* Bull vs Bear Debate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bull Case */}
        <div className="bg-brand-surface border border-emerald-500/30 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-emerald-500/20 text-emerald-400">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base text-white">Bull Analyst Argument</h4>
                <p className="text-xs text-brand-muted">Growth drivers & positive momentum</p>
              </div>
            </div>
            <div className="space-y-2">
              {formatAgentPoints(bull_agent)}
            </div>
          </div>
        </div>

        {/* Bear Case */}
        <div className="bg-brand-surface border border-red-500/30 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-red-500/20 text-red-400">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base text-white">Bear Analyst Argument</h4>
                <p className="text-xs text-brand-muted">Risks, sentiment & technical downsides</p>
              </div>
            </div>
            <div className="space-y-2">
              {formatAgentPoints(bear_agent)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiVerdict;