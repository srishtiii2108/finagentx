import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, Activity, ShieldCheck } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-indigo/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/10 border border-brand-indigo/30 text-brand-indigo mb-6">
              <span className="flex w-2 h-2 rounded-full bg-brand-indigo animate-pulse"></span>
              <span className="text-sm font-medium">Multi-Agent AI Financial Engine</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 tracking-tight">
              AI-Powered <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-indigo">
                Financial Intelligence
              </span>
            </h1>
            
            <p className="text-lg text-brand-muted mb-8 max-w-xl leading-relaxed">
              FinAgentX combines live market data, multi-agent AI debate, and explainable reasoning to help you make smarter, data-driven investment decisions.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="px-8 py-3.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-semibold flex items-center gap-2 transition-all shadow-lg shadow-brand-blue/25"
              >
                Explore FinAgentX
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Visual Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:h-[500px] flex items-center justify-center"
          >
            {/* Main Floating Card */}
            <div className="relative w-full max-w-md bg-brand-surface/80 backdrop-blur-xl border border-brand-border rounded-2xl p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-white font-bold text-xl">INFY <span className="text-sm text-brand-muted font-normal">Infosys Ltd.</span></h3>
                  <p className="text-2xl font-semibold text-white mt-1">₹1,420.50 <span className="text-brand-success text-sm">+2.4%</span></p>
                </div>
                <div className="p-3 bg-brand-primary rounded-xl border border-brand-border">
                  <Activity className="w-6 h-6 text-brand-blue" />
                </div>
              </div>

              {/* AI Debate Mock */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 rounded-lg bg-brand-primary border border-brand-border/50">
                  <span className="text-sm text-brand-muted flex items-center gap-2"><BrainCircuit className="w-4 h-4 text-brand-success"/> Bull Agent</span>
                  <span className="text-sm text-white font-medium">Strong Fundamentals</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-brand-primary border border-brand-border/50">
                  <span className="text-sm text-brand-muted flex items-center gap-2"><BrainCircuit className="w-4 h-4 text-brand-danger"/> Bear Agent</span>
                  <span className="text-sm text-white font-medium">Market Volatility</span>
                </div>
              </div>

              {/* Final Verdict Mock */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-brand-success/20 to-transparent border border-brand-success/30">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-5 h-5 text-brand-success" />
                  <span className="text-sm font-semibold text-brand-success">Judge AI Verdict</span>
                </div>
                <h4 className="text-2xl font-bold text-white">BUY</h4>
                <p className="text-xs text-brand-success mt-1">Confidence Score: 85%</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;