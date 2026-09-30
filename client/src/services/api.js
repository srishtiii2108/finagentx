import axios from 'axios';


const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const AI_BACKEND_URL = isLocal 
  ? 'http://localhost:8000/api' 
  : 'https://finagentx-ai-backend.onrender.com/api';

const nodeEnvUrl = import.meta.env.VITE_BACKEND_URL;
const NODE_SERVER_URL = isLocal 
  ? (nodeEnvUrl ? `${nodeEnvUrl}/api` : 'http://localhost:4000/api')
  : 'https://finagentx-node-backend.onrender.com/api';

export const analyzeStock = async (ticker) => {
  try {
    const response = await axios.get(`${AI_BACKEND_URL}/analyze/${ticker}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Failed to fetch AI stock analysis";
  }
};

export const getStockChart = async (ticker, period = '1mo') => {
  try {
    const response = await axios.get(`${AI_BACKEND_URL}/charts/${ticker}?period=${period}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Failed to fetch chart data";
  }
};

export const getMarketSummary = async () => {
  try {
    const response = await axios.get(`${AI_BACKEND_URL}/market-summary`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Failed to fetch market summary";
  }
};

export const fetchUserPortfolio = async () => {
    try {
        const response = await axios.post(`${NODE_SERVER_URL}/trading/get`, {}, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch portfolio";
    }
};

export const executeVirtualTrade = async (tradeData) => {
    try {
        const response = await axios.post(`${NODE_SERVER_URL}/trading/execute`, tradeData, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Trade execution failed";
    }
};

export const getPortfolioDoctorAdvice = async (portfolioData) => {
  try {
    const response = await axios.post(`${AI_BACKEND_URL}/portfolio-doctor`, portfolioData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Failed to fetch AI Portfolio Doctor advice";
  }
};