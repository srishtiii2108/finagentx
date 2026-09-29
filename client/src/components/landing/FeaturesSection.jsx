import React from 'react';
import { motion } from 'framer-motion';
import { Search, LineChart, MessageSquare, PieChart, FileText, Bell } from 'lucide-react';

const features = [
  {
    icon: <Search className="w-6 h-6 text-brand-blue" />,
    title: "AI Financial Research",
    description: "Instant analysis of company fundamentals, valuation metrics, and market sentiment."
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-brand-indigo" />,
    title: "Multi-Agent Debate",
    description: "Bull and Bear agents debate market conditions before a Judge AI provides a final verdict."
  },
  {
    icon: <LineChart className="w-6 h-6 text-brand-success" />,
    title: "Technical Analysis",
    description: "Automated extraction of moving averages, RSI, and MACD indicators for precision."
  },
  {
    icon: <PieChart className="w-6 h-6 text-purple-400" />,
    title: "Portfolio Intelligence",
    description: "AI Portfolio Doctor analyzes risk, sector concentration, and diversification."
  },
  {
    icon: <FileText className="w-6 h-6 text-orange-400" />,
    title: "Annual Report RAG",
    description: "Upload PDFs and ask natural language questions directly grounded in company filings."
  },
  {
    icon: <Bell className="w-6 h-6 text-brand-danger" />,
    title: "Virtual Trading & Alerts",
    description: "Paper trade to build confidence and set smart alerts for major price movements."
  }
];

const FeaturesSection = () => {
  return (
    <div className="py-24 bg-brand-primary" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
            Comprehensive Analysis, <br/> Simplified by AI.
          </h2>
          <p className="text-brand-muted text-lg">
            Stop jumping between disconnected tools. FinAgentX brings multi-source data and agentic reasoning into a single intelligent platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-surface border border-brand-border hover:border-brand-indigo/50 p-6 rounded-2xl transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center border border-brand-border mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FeaturesSection;