import React, { useEffect, useState } from 'react';
import { Wallet, Cpu, Activity } from 'lucide-react';
import { fetchUserPortfolio } from '../services/api';

const TopMetrics = ({ isDataLoaded }) => {
  const [cashBalance, setCashBalance] = useState(1000000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPortfolioSummary = async () => {
      try {
        const res = await fetchUserPortfolio();
        if (res.success && res.portfolio) {
          setCashBalance(res.portfolio.cashBalance || 1000000);
        }
      } catch (err) {
        console.error("Failed to load portfolio metrics");
      } finally {
        setLoading(false);
      }
    };
    getPortfolioSummary();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      {/* Metric 1: Real Virtual Buying Power from DB */}
      <div className="bg-brand-surface border border-brand-border p-5 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">Virtual Buying Power</span>
          <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
            <Wallet className="w-5 h-5" />
          </div>
        </div>
        <h3 className="text-2xl font-black text-white">
          ₹{cashBalance.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
        </h3>
        <span className="text-xs text-emerald-400 font-medium mt-1 inline-block">Synced with Virtual Portfolio</span>
      </div>

      {/* Metric 2: Active AI Agents */}
      <div className="bg-brand-surface border border-brand-border p-5 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">Active AI Agents</span>
          <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl">
            <Cpu className="w-5 h-5" />
          </div>
        </div>
        <h3 className="text-2xl font-black text-white">3 Modules</h3>
        <span className="text-xs text-brand-muted mt-1 inline-block">Bull, Bear & Judge engines online</span>
      </div>

      {/* Metric 3: Session Insights */}
      <div className="bg-brand-surface border border-brand-border p-5 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">Session Insights</span>
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <Activity className="w-5 h-5" />
          </div>
        </div>
        <h3 className="text-2xl font-black text-white">{isDataLoaded ? '1' : '0'}</h3>
        <span className="text-xs text-brand-muted mt-1 inline-block">Analyses generated in current session</span>
      </div>
    </div>
  );
};

export default TopMetrics;