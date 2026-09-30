import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getStockChart } from '../services/api';

const StockChart = ({ ticker }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('1mo');

  useEffect(() => {
    const fetchChart = async () => {
      setLoading(true);
      try {
        const res = await getStockChart(ticker, period);
        if (res.success) {
          setChartData(res.data);
        }
      } catch (error) {
        console.error("Chart fetch error", error);
      } finally {
        setLoading(false);
      }
    };
    if (ticker) fetchChart();
  }, [ticker, period]);

  if (loading) {
    return (
      <div className="bg-brand-surface border border-brand-border rounded-xl mt-6 h-80 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-brand-blue border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="bg-brand-surface border border-brand-border p-6 rounded-xl mt-6 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">Price History</h3>
          <p className="text-brand-muted text-xs">Interactive historical performance</p>
        </div>
        <div className="flex gap-2 bg-brand-dark p-1 rounded-lg border border-brand-border">
          {['1mo', '3mo', '6mo', '1y'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                period === p 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-brand-muted hover:text-white hover:bg-slate-800'
              }`}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(str) => {
                const date = new Date(str);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              }} 
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              domain={['auto', 'auto']} 
              tickFormatter={(val) => `₹${val}`} 
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
              labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;