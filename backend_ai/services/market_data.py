import yfinance as yf
import pandas as pd
import pandas_ta_classic as ta
import requests

# Custom session with User-Agent to bypass Yahoo Finance rate-limiting / blocking on Render
def get_yf_session():
    session = requests.Session()
    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    })
    return session

def get_stock_info(ticker: str):
    try:
        session = get_yf_session()
        stock = yf.Ticker(ticker, session=session)
        
        # Safe info fetch with fallback
        info = {}
        try:
            info = stock.info
        except Exception:
            pass
            
        current_price = info.get("currentPrice") or info.get("regularMarketPrice") or info.get("previousClose")
        company_name = info.get("longName") or info.get("shortName") or ticker
        market_cap = info.get("marketCap", "N/A")
        pe_ratio = info.get("trailingPE", "N/A")
        eps = info.get("trailingEps", "N/A")
        roe = info.get("returnOnEquity", "N/A")
        sector = info.get("sector", "N/A")
        industry = info.get("industry", "N/A")
        summary = info.get("longBusinessSummary", "N/A")

        # Fallback: Agar .info se price nahi mila, toh 5 days ka history fetch karke latest close price utha lo
        if not current_price:
            hist_fallback = stock.history(period="5d")
            if not hist_fallback.empty:
                current_price = float(hist_fallback["Close"].iloc[-1])

        if not current_price:
            return {"success": False, "message": f"Could not fetch price for ticker {ticker}"}

        return {
            "success": True,
            "data": {
                "symbol": ticker.upper(),
                "company_name": company_name,
                "current_price": round(current_price, 2),
                "market_cap": market_cap,
                "pe_ratio": pe_ratio,
                "eps": eps,
                "roe": roe,
                "sector": sector,
                "industry": industry,
                "summary": summary
            }
        }
    except Exception as e:
        return {"success": False, "message": f"Failed to fetch stock info: {str(e)}"}


def get_stock_history(ticker: str, period: str = "1mo"):
    try:
        session = get_yf_session()
        stock = yf.Ticker(ticker, session=session)
        hist = stock.history(period=period)
        
        if hist.empty:
            return {"success": False, "message": f"No historical data found for {ticker}"}
            
        chart_data = []
        for index, row in hist.iterrows():
            chart_data.append({
                "date": index.strftime('%Y-%m-%d'),
                "price": round(row["Close"], 2)
            })
            
        return {
            "success": True, 
            "ticker": ticker.upper(),
            "period": period,
            "data": chart_data
        }
    except Exception as e:
        return {"success": False, "message": f"Failed to fetch chart data: {str(e)}"}


def get_market_overview():
    try:
        session = get_yf_session()
        def calc_change(hist_df):
            if hist_df.empty:
                return 0.0, 0.0, 0.0
            if len(hist_df) >= 2:
                prev = hist_df["Close"].iloc[-2]
                curr = hist_df["Close"].iloc[-1]
                chg = curr - prev
                pct = (chg / prev) * 100 if prev != 0 else 0
                return round(curr, 2), round(chg, 2), round(pct, 2)
            elif len(hist_df) == 1:
                curr = hist_df["Close"].iloc[-1]
                return round(curr, 2), 0.0, 0.0
            return 0.0, 0.0, 0.0

        nifty_val, nifty_chg, nifty_pct = 0.0, 0.0, 0.0
        sensex_val, sensex_chg, sensex_pct = 0.0, 0.0, 0.0
        
        try:
            nifty = yf.Ticker("^NSEI", session=session).history(period="2d")
            nifty_val, nifty_chg, nifty_pct = calc_change(nifty)
        except Exception:
            pass

        try:
            sensex = yf.Ticker("^BSESN", session=session).history(period="2d")
            sensex_val, sensex_chg, sensex_pct = calc_change(sensex)
        except Exception:
            pass

        trending_tickers = ["RELIANCE.NS", "TCS.NS", "INFY.NS", "HDFCBANK.NS", "SBIN.NS"]
        trending_list = []

        for sym in trending_tickers:
            try:
                stk = yf.Ticker(sym, session=session)
                h = stk.history(period="2d")
                
                if h.empty:
                    continue
                    
                val, chg, pct = calc_change(h)
                name = sym.replace(".NS", "")
                trending_list.append({
                    "symbol": sym,
                    "name": name,
                    "price": val,
                    "change": chg,
                    "change_percent": pct
                })
            except Exception as e:
                print(f"Skipping {sym} due to error: {e}")
                continue

        return {
            "success": True,
            "indices": {
                "nifty": {"value": nifty_val, "change": nifty_chg, "percent": nifty_pct},
                "sensex": {"value": sensex_val, "change": sensex_chg, "percent": sensex_pct}
            },
            "trending": trending_list
        }
    except Exception as e:
        return {"success": False, "message": f"Failed to fetch market overview: {str(e)}"}


def get_technical_indicators(ticker: str):
    try:
        session = get_yf_session()
        stock = yf.Ticker(ticker, session=session)
        df = stock.history(period="1y")
        
        if df.empty or len(df) < 50:
            return {"success": False, "message": "Not enough historical data for technical indicators"}
            
        df.ta.rsi(length=14, append=True)
        df.ta.macd(fast=12, slow=26, signal=9, append=True)
        df.ta.ema(length=50, append=True)
        df.ta.ema(length=200, append=True)
        
        latest = df.iloc[-1]
        current_price = latest['Close']
        
        rsi = round(latest.get('RSI_14', 50), 2)
        macd = round(latest.get('MACD_12_26_9', 0), 2)
        macd_signal = round(latest.get('MACDs_12_26_9', 0), 2)
        ema_50 = round(latest.get('EMA_50', current_price), 2)
        ema_200 = round(latest.get('EMA_200', current_price), 2)
        
        rsi_status = "Overbought (Bearish bias)" if rsi > 70 else "Oversold (Bullish bias)" if rsi < 30 else "Neutral"
        macd_status = "Bullish Crossover" if macd > macd_signal else "Bearish Crossover"
        trend_50 = "Short-term Bullish" if current_price > ema_50 else "Short-term Bearish"
        trend_200 = "Long-term Bullish" if current_price > ema_200 else "Long-term Bearish"
        
        ai_summary = (
            f"Technical Analysis Summary for {ticker}: "
            f"Current Price is {round(current_price, 2)}. "
            f"RSI (14) is {rsi} indicating it is {rsi_status}. "
            f"MACD shows a {macd_status} (MACD: {macd}, Signal: {macd_signal}). "
            f"Price action is {trend_50} (vs 50 EMA: {ema_50}) and {trend_200} (vs 200 EMA: {ema_200})."
        )
        
        return {
            "success": True,
            "data": {
                "rsi": rsi,
                "rsi_status": rsi_status,
                "macd_status": macd_status,
                "trend_50": trend_50,
                "trend_200": trend_200,
                "ai_summary": ai_summary
            }
        }
    except Exception as e:
        return {"success": False, "message": f"Failed to compute technicals: {str(e)}"}