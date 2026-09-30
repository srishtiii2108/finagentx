import axios from 'axios';

const AI_BACKEND_URL = 'http://localhost:8000/api';

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