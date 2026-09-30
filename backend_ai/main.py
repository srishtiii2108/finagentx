from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

from services.market_data import get_stock_info, get_stock_history, get_market_overview, get_technical_indicators
from services.news_data import get_company_news 
from agents.debate_agent import generate_ai_analysis
from agents.portfolio_agent import analyze_portfolio_health  # <-- Naya Cohere Agent Import

load_dotenv()

app = FastAPI(title="FinAgentX AI Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "FinAgentX AI Engine is running successfully!"}

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy", 
        "cohere_api_configured": bool(os.getenv("COHERE_API_KEY")),
        "news_api_configured": bool(os.getenv("NEWS_API_KEY"))
    }

@app.get("/api/market-summary")
def fetch_market_summary():
    try:
        overview = get_market_overview()
        news_res = get_company_news("Indian Stock Market Sensex Nifty")
        default_news = news_res["data"] if news_res.get("success") else []

        nifty_pct = overview.get("indices", {}).get("nifty", {}).get("percent", 0)
        mood = "BULLISH" if nifty_pct > 0.2 else ("BEARISH" if nifty_pct < -0.2 else "NEUTRAL")

        return {
            "success": True,
            "indices": overview.get("indices", {}),
            "trending": overview.get("trending", []),
            "default_news": default_news,
            "market_mood": mood
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load market summary: {str(e)}")

@app.get("/api/stocks/{ticker}")
def fetch_stock_data(ticker: str):
    result = get_stock_info(ticker)
    if result.get("success"):
        return result
    raise HTTPException(status_code=404, detail=result.get("message", "Stock data not found"))

@app.get("/api/charts/{ticker}")
def fetch_stock_chart(ticker: str, period: str = "1mo"):
    result = get_stock_history(ticker, period)
    if result.get("success"):
        return result
    raise HTTPException(status_code=404, detail=result.get("message", "Chart data not found"))

@app.get("/api/news/{company_name}")
def fetch_news(company_name: str):
    result = get_company_news(company_name)
    if result.get("success"):
        return result
    raise HTTPException(status_code=400, detail=result.get("message", "News not found"))

@app.get("/api/analyze/{ticker}")
def analyze_stock(ticker: str):
    try:
        # 1. Fetch Financials
        stock_res = get_stock_info(ticker)
        if not stock_res.get("success"):
            raise HTTPException(status_code=404, detail=stock_res.get("message", "Stock data fetch failed"))
        
        company_name = stock_res["data"].get("company_name", ticker)
        
        # 2. Fetch News
        search_query = company_name if company_name != "N/A" else ticker
        news_res = get_company_news(search_query)
        news_data = news_res["data"] if news_res.get("success") else []

        # 3. Fetch Deterministic Technical Indicators (RSI, MACD, EMA)
        tech_res = get_technical_indicators(ticker)
        tech_data = tech_res["data"] if tech_res.get("success") else {}
        
        # 4. Run Multi-Agent AI Debate incorporating Technicals
        ai_res = generate_ai_analysis(stock_res["data"], news_data, tech_data)
        
        if not ai_res.get("success"):
            raise HTTPException(status_code=500, detail=ai_res.get("message", "AI analysis failed"))
            
        return {
            "success": True,
            "ticker": ticker.upper(),
            "company_info": stock_res["data"],
            "technical_info": tech_data,
            "news_analyzed": len(news_data),
            "news_list": news_data,
            "ai_analysis": {
                "bull_agent": ai_res.get("bull_case"),
                "bear_agent": ai_res.get("bear_case"),
                "judge_agent": ai_res.get("judge_verdict")
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error during analysis: {str(e)}")

# NAYA ENDPOINT: Portfolio Doctor (Cohere Powered)
@app.post("/api/portfolio-doctor")
async def get_portfolio_doctor_advice(request: Request):
    try:
        portfolio_data = await request.json()
        result = analyze_portfolio_health(portfolio_data)
        
        if not result.get("success"):
            raise HTTPException(status_code=500, detail=result.get("message"))
            
        return {"success": True, "analysis": result["data"]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid request format: {str(e)}")