import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';
import { Activity, Briefcase, TrendingUp, Search } from 'lucide-react';

const Dashboard = () => {
  const { isLoggedin, userData } = useContext(AppContent);
  const navigate = useNavigate();

  // Basic route protection: Agar login nahi hai toh home pe bhej do
  useEffect(() => {
    // Note: AppContext initialization me thoda delay ho sakta hai, toh isko properly handle karna padta hai
    // Par abhi ke liye basic check laga rahe hain
    if (isLoggedin === false) {
      navigate('/login');
    }
  }, [isLoggedin, navigate]);

  return (
    <div className="min-h-screen bg-brand-dark">
      <DashboardNavbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Welcome back, {userData ? userData.name.split(' ')[0] : 'Investor'}
            </h1>
            <p className="text-brand-muted text-sm">Here is your portfolio overview and market intelligence.</p>
          </div>
          
          {/* Quick Search */}
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-brand-muted" />
            </div>
            <input 
              type="text" 
              placeholder="Search stocks (e.g. INFY)" 
              className="w-full pl-10 pr-4 py-2 bg-brand-surface border border-brand-border rounded-lg text-white text-sm focus:outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        {/* Top Metric Cards (Mock UI) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-brand-surface border border-brand-border p-5 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-brand-muted text-sm font-medium mb-1">Portfolio Value</p>
                <h3 className="text-2xl font-bold text-white">₹0.00</h3>
              </div>
              <div className="p-2 bg-brand-primary rounded-lg">
                <Briefcase className="w-5 h-5 text-brand-blue" />
              </div>
            </div>
            <p className="text-brand-muted text-xs">Waiting for your first investment</p>
          </div>

          <div className="bg-brand-surface border border-brand-border p-5 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-brand-muted text-sm font-medium mb-1">Day's Return</p>
                <h3 className="text-2xl font-bold text-white">₹0.00</h3>
              </div>
              <div className="p-2 bg-brand-primary rounded-lg">
                <TrendingUp className="w-5 h-5 text-brand-success" />
              </div>
            </div>
            <p className="text-brand-muted text-xs">Market is open</p>
          </div>

          <div className="bg-brand-surface border border-brand-border p-5 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-brand-muted text-sm font-medium mb-1">AI Insights Generated</p>
                <h3 className="text-2xl font-bold text-white">0</h3>
              </div>
              <div className="p-2 bg-brand-primary rounded-lg">
                <Activity className="w-5 h-5 text-brand-indigo" />
              </div>
            </div>
            <p className="text-brand-muted text-xs">Run analysis on a stock to see insights</p>
          </div>
        </div>
        
        {/* Placeholder for Watchlist or AI Analysis */}
        <div className="bg-brand-surface border border-brand-border rounded-xl p-8 text-center">
          <Activity className="w-12 h-12 text-brand-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Ready to Analyze?</h3>
          <p className="text-brand-muted text-sm mb-4 max-w-md mx-auto">
            Search for a company ticker like INFY or TCS to trigger the Multi-Agent Financial Engine.
          </p>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;