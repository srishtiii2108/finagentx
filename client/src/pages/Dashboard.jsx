import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';
import { Search, ShoppingCart } from 'lucide-react';
import { analyzeStock, getMarketSummary } from '../services/api';

// Modular Components
import TopMetrics from '../components/TopMetrics';
import MarketBanner from '../components/MarketBanner';
import TrendingStocks from '../components/TrendingStocks';
import CompanyOverview from '../components/CompanyOverview';
import AiVerdict from '../components/AiVerdict';
import StockChart from '../components/StockChart'; 
import NewsSection from '../components/NewsSection';
import TradeModal from '../components/TradeModal';

const Dashboard = () => {
  const { isLoggedin, userData } = useContext(AppContent);
  const navigate = useNavigate();

  // 1. SMART STATE PRESERVATION: Session Storage se data uthao taaki tab switch/refresh pe gayab na ho
  const [ticker, setTicker] = useState(() => sessionStorage.getItem('dashboardTicker') || '');
  const [aiData, setAiData] = useState(() => JSON.parse(sessionStorage.getItem('dashboardAiData')) || null);
  const [summaryData, setSummaryData] = useState(() => JSON.parse(sessionStorage.getItem('dashboardSummary')) || null);

  const [loading, setLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(!summaryData); // Agar data hai toh loading false
  const [error, setError] = useState('');
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);

  // 2. AUTH BUFFER FIX: Refresh hone par turant login par fekne se bachane ke liye 1 second ka wait
  useEffect(() => {
    const checkAuthTimer = setTimeout(() => {
      // Agar 1 second baad bhi user data nahi mila aur login false hai, tabhi login par bhejo
      if (isLoggedin === false && !userData) {
        navigate('/login');
      }
    }, 1000); 

    return () => clearTimeout(checkAuthTimer);
  }, [isLoggedin, userData, navigate]);

  // 3. AUTO-SAVE DATA: Jab bhi data aaye, usko instantly session storage me save kar do
  useEffect(() => {
    if (aiData) sessionStorage.setItem('dashboardAiData', JSON.stringify(aiData));
  }, [aiData]);

  useEffect(() => {
    if (summaryData) sessionStorage.setItem('dashboardSummary', JSON.stringify(summaryData));
  }, [summaryData]);

  useEffect(() => {
    sessionStorage.setItem('dashboardTicker', ticker);
  }, [ticker]);

  // 4. PREVENT RE-FETCHING: Agar session storage me data pehle se hai toh dobara API call mat karo!
  useEffect(() => {
    if (summaryData) return; // Saves those 2 seconds!

    const loadSummary = async () => {
      try {
        const res = await getMarketSummary();
        if (res.success) {
          setSummaryData(res);
        }
      } catch (err) {
        console.error("Failed to load market summary:", err);
      } finally {
        setSummaryLoading(false);
      }
    };
    loadSummary();
  }, [summaryData]);

  const triggerAnalysis = async (selectedTicker) => {
    if (!selectedTicker.trim()) return;

    setLoading(true);
    setError('');
    // Naya search karte waqt purana data clear karo
    setAiData(null);
    sessionStorage.removeItem('dashboardAiData'); 
    setTicker(selectedTicker);

    try {
      const result = await analyzeStock(selectedTicker.trim());
      setAiData(result);
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to fetch AI stock analysis');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    triggerAnalysis(ticker);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <DashboardNavbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Header & Search */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Welcome back, {userData ? userData.name.split(' ')[0] : 'Investor'}
            </h1>
            <p className="text-brand-muted text-sm">Here is your portfolio overview and market intelligence.</p>
          </div>
          
          <form onSubmit={handleSearch} className="relative w-full md:w-80 flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-brand-muted" />
              </div>
              <input 
                type="text" 
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                placeholder="Search stocks (e.g. TCS.NS)" 
                className="w-full pl-10 pr-4 py-2 bg-brand-surface border border-brand-border rounded-lg text-white text-sm focus:outline-none focus:border-brand-blue"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-semibold transition-all disabled:opacity-50 flex items-center justify-center min-w-[80px]"
            >
              {loading ? '...' : 'Analyze'}
            </button>
          </form>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/50 border border-red-800 text-red-300 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Live Market Indices & AI Mood Banner */}
        {summaryData && (
          <MarketBanner indices={summaryData.indices} mood={summaryData.market_mood} />
        )}

        {/* Top Metric Cards */}
        <TopMetrics isDataLoaded={!!aiData} />

        {/* Trending Stocks Quick Cards (Clickable) */}
        {summaryData && summaryData.trending && (
          <TrendingStocks stocks={summaryData.trending} onSelectTicker={(sym) => triggerAnalysis(sym)} />
        )}

        {/* Loading State for Analysis */}
        {loading && (
          <div className="bg-brand-surface border border-brand-border rounded-xl p-12 text-center mb-8">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <p className="text-white font-medium">Multi-Agent AI Engine is debating...</p>
            <p className="text-brand-muted text-xs mt-1">Fetching market data, running technical engines, and rendering AI agents.</p>
          </div>
        )}

        {/* Analyzed Results Section */}
        {aiData && !loading && (
          <div className="space-y-6 mb-8 animate-fadeIn">
            <CompanyOverview 
              companyInfo={aiData.company_info} 
              ticker={aiData.ticker} 
              newsAnalyzed={aiData.news_analyzed} 
            />
            
            <StockChart ticker={aiData.ticker} />
            
            {/* Virtual Trade Action Banner */}
            <div className="bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-950 border border-blue-500/40 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xl">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Paper Trading Simulation</span>
                <h4 className="text-white font-bold text-base mt-0.5">Want to trade {aiData.ticker} using AI insights?</h4>
                <p className="text-brand-muted text-xs mt-0.5">Execute simulated BUY/SELL orders instantly with your ₹10 Lakhs virtual balance.</p>
              </div>
              <button
                onClick={() => setIsTradeModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition shadow-lg shadow-blue-900/30 flex items-center gap-2 whitespace-nowrap"
              >
                <ShoppingCart className="w-4 h-4" /> Execute Virtual Trade
              </button>
            </div>

            {/* Connected AiVerdict with Advanced Technical & Structured Verdict Data */}
            <AiVerdict 
              aiAnalysis={aiData.ai_analysis} 
              technicalInfo={aiData.technical_info} 
            />

            {aiData.news_list && <NewsSection newsList={aiData.news_list} title="Company Specific News" />}
          </div>
        )}

        {/* Pre-Search Default Market News Feed (When no stock searched yet) */}
        {!aiData && !loading && summaryData && summaryData.default_news && (
          <div className="mt-4">
            <NewsSection newsList={summaryData.default_news} title="Top Market News Today" />
          </div>
        )}

      </main>

      {/* Trade Execution Modal */}
      {aiData && (
        <TradeModal
          isOpen={isTradeModalOpen}
          onClose={() => setIsTradeModalOpen(false)}
          ticker={aiData.ticker}
          currentPrice={aiData.company_info?.current_price || 1500}
          companyName={aiData.company_info?.company_name}
          onTradeSuccess={() => {
            // Modal band hone ke baad koi alert dena ho toh yahan handle kar sakte hain
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;