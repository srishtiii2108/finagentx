import yfinance as yf
import pandas as pd

def get_stock_info(ticker: str):
    try:
        stock = yf.Ticker(ticker)
        info = stock.info
        
        current_price = info.get("currentPrice") or info.get("regularMarketPrice") or info.get("previousClose")
        company_name = info.get("longName") or info.get("shortName") or ticker
        market_cap = info.get("marketCap", "N/A")
        pe_ratio = info.get("trailingPE", "N/A")
        eps = info.get("trailingEps", "N/A")
        roe = info.get("returnOnEquity", "N/A")
        sector = info.get("sector", "N/A")
        industry = info.get("industry", "N/A")
        summary = info.get("longBusinessSummary", "N/A")

        if not current_price:
            return {"success": False, "message": f"Could not fetch price for ticker {ticker}"}

        return {
            "success": True,
            "data": {
                "symbol": ticker.upper(),
                "company_name": company_name,
                "current_price": current_price,
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
        stock = yf.Ticker(ticker)
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
    """
    Fetches live NIFTY 50, SENSEX indices and top trending stocks for initial dashboard view.
    """
    try:
        # Indices Data
        nifty = yf.Ticker("^NSEI").history(period="2d")
        sensex = yf.Ticker("^BSESN").history(period="2d")

        def calc_change(hist_df):
            if len(hist_df) >= 2:
                prev = hist_df["Close"].iloc[-2]
                curr = hist_df["Close"].iloc[-1]
                chg = curr - prev
                pct = (chg / prev) * 100
                return round(curr, 2), round(chg, 2), round(pct, 2)
            elif len(hist_df) == 1:
                curr = hist_df["Close"].iloc[-1]
                return round(curr, 2), 0.0, 0.0
            return 0.0, 0.0, 0.0

        nifty_val, nifty_chg, nifty_pct = calc_change(nifty)
        sensex_val, sensex_chg, sensex_pct = calc_change(sensex)

        # Trending Stocks Mini List
        trending_tickers = ["RELIANCE.NS", "TCS.NS", "INFY.NS", "HDFCBANK.NS", "TATAMOTORS.NS"]
        trending_list = []

        for sym in trending_tickers:
            stk = yf.Ticker(sym)
            h = stk.history(period="2d")
            val, chg, pct = calc_change(h)
            name = sym.replace(".NS", "")
            trending_list.append({
                "symbol": sym,
                "name": name,
                "price": val,
                "change": chg,
                "change_percent": pct
            })

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