import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';
import { fetchUserPortfolio, getPortfolioDoctorAdvice } from '../services/api';
import { Stethoscope, Activity, ShieldAlert, CheckCircle2, XCircle, ArrowRight, BrainCircuit } from 'lucide-react';

const PortfolioDoctor = () => {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const runHealthCheck = async () => {
      try {
        // 1. Pehle user ka portfolio fetch karo
        const portfolioRes = await fetchUserPortfolio();
        if (!portfolioRes.success || !portfolioRes.portfolio) {
          throw new Error("Could not load portfolio data for analysis.");
        }

        // 2. Portfolio data ko AI Doctor ke paas bhejo
        const aiRes = await getPortfolioDoctorAdvice(portfolioRes.portfolio);
        if (aiRes.success) {
          setAnalysis(aiRes.analysis);
        }
      } catch (err) {
        setError(typeof err === 'string' ? err : err.message || "Failed to run AI Health Check");
      } finally {
        setLoading(false);
      }
    };

    runHealthCheck();
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <DashboardNavbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl border border-purple-500/20">
            <Stethoscope className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">AI Portfolio Doctor</h1>
            <p className="text-brand-muted text-sm">Deep-dive health checkup and risk analysis of your virtual assets.</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/50 border border-red-800 text-red-300 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Loading State - Sci-Fi Scanner Look */}
        {loading && (
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent animate-pulse"></div>
            <BrainCircuit className="w-16 h-16 text-purple-500 mx-auto mb-6 animate-bounce" />
            <h3 className="text-xl font-bold text-white mb-2">Scanning Your Portfolio...</h3>
            <p className="text-brand-muted text-sm max-w-md mx-auto">
              Cohere AI is analyzing your asset allocation, evaluating risk exposure, and generating personalized actionable insights.
            </p>
            <div className="w-48 h-1.5 bg-slate-800 rounded-full mx-auto mt-6 overflow-hidden">
              <div className="h-full bg-purple-500 animate-pulse w-full"></div>
            </div>
          </div>
        )}

        {/* AI Analysis Results */}
        {analysis && !loading && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Health Score */}
              <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl shadow-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">Overall Health Score</span>
                  <h3 className="text-4xl font-black mt-2 text-white">{analysis.health_score}<span className="text-lg text-slate-500">/100</span></h3>
                </div>
                <div className={`w-20 h-20 rounded-full border-8 flex items-center justify-center ${
                  analysis.health_score >= 70 ? 'border-emerald-500 text-emerald-400' : analysis.health_score >= 40 ? 'border-amber-500 text-amber-400' : 'border-red-500 text-red-400'
                }`}>
                  <Activity className="w-8 h-8" />
                </div>
              </div>

              {/* Risk Level */}
              <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl shadow-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">Assessed Risk Level</span>
                  <h3 className={`text-3xl font-black mt-2 uppercase ${
                    analysis.risk_level.toLowerCase().includes('low') ? 'text-emerald-400' : analysis.risk_level.toLowerCase().includes('high') ? 'text-red-400' : 'text-amber-400'
                  }`}>
                    {analysis.risk_level}
                  </h3>
                </div>
                <div className="p-4 bg-slate-900 rounded-full text-slate-400 border border-slate-800">
                  <ShieldAlert className="w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="bg-gradient-to-r from-purple-950/40 to-brand-surface border border-purple-500/20 p-6 rounded-2xl shadow-xl">
              <h4 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-3">AI Diagnostic Overview</h4>
              <p className="text-slate-200 leading-relaxed text-sm">{analysis.overview}</p>
            </div>

            {/* Strengths & Weaknesses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl shadow-xl">
                <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Portfolio Strengths
                </h4>
                <ul className="space-y-3">
                  {analysis.strengths.map((item, idx) => (
                    <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl shadow-xl">
                <h4 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Areas of Concern
                </h4>
                <ul className="space-y-3">
                  {analysis.weaknesses.map((item, idx) => (
                    <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Plan */}
            <div className="bg-brand-surface border border-blue-500/20 p-6 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">Recommended Action Plan</h4>
              <div className="space-y-3">
                {analysis.action_plan.map((item, idx) => (
                  <div key={idx} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center pt-4">
              <button onClick={() => navigate('/portfolio')} className="text-slate-400 hover:text-white text-sm font-medium transition underline underline-offset-4">
                Return to Portfolio
              </button>
            </div>

          </div>
        )}

      </main>
    </div>
  );
};

export default PortfolioDoctor;