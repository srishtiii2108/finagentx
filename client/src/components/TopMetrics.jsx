import React from 'react';
import { Briefcase, Cpu, Activity } from 'lucide-react';

const TopMetrics = ({ isDataLoaded }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-brand-surface border border-brand-border p-5 rounded-xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-brand-muted text-sm font-medium mb-1">Virtual Buying Power</p>
            <h3 className="text-2xl font-bold text-white">₹10,00,000</h3>
          </div>
          <div className="p-2 bg-brand-primary rounded-lg">
            <Briefcase className="w-5 h-5 text-brand-blue" />
          </div>
        </div>
        <p className="text-brand-muted text-xs">Ready for simulated trading</p>
      </div>

      <div className="bg-brand-surface border border-brand-border p-5 rounded-xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-brand-muted text-sm font-medium mb-1">Active AI Agents</p>
            <h3 className="text-2xl font-bold text-white">3 Modules</h3>
          </div>
          <div className="p-2 bg-brand-primary rounded-lg">
            <Cpu className="w-5 h-5 text-brand-success" />
          </div>
        </div>
        <p className="text-brand-muted text-xs">Bull, Bear & Judge engines online</p>
      </div>

      <div className="bg-brand-surface border border-brand-border p-5 rounded-xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-brand-muted text-sm font-medium mb-1">Session Insights</p>
            <h3 className="text-2xl font-bold text-white">{isDataLoaded ? 1 : 0}</h3>
          </div>
          <div className="p-2 bg-brand-primary rounded-lg">
            <Activity className="w-5 h-5 text-brand-indigo" />
          </div>
        </div>
        <p className="text-brand-muted text-xs">Analyses generated in current session</p>
      </div>
    </div>
  );
};

export default TopMetrics;