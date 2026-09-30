import os
import requests
from dotenv import load_dotenv

load_dotenv()
NEWS_API_KEY = os.getenv("NEWS_API_KEY")

def get_company_news(company_name: str):
    if not NEWS_API_KEY:
        return {"success": False, "message": "NewsAPI key is missing in .env"}
    
    try:
        # Fetching top 5 recent news articles in English
        url = f"https://newsapi.org/v2/everything?q={company_name}&language=en&sortBy=publishedAt&pageSize=5&apiKey={NEWS_API_KEY}"
        response = requests.get(url)
        data = response.json()
        
        if data.get("status") != "ok":
            return {"success": False, "message": data.get("message", "Failed to fetch news")}
        
        articles = []
        for item in data.get("articles", []):
            # Filtering out broken or removed articles
            if item.get("title") and item.get("description") and "[Removed]" not in item.get("title"):
                articles.append({
                    "title": item["title"],
                    "description": item["description"],
                    "source": item["source"]["name"],
                    "published_at": item["publishedAt"]
                })
        
        return {"success": True, "data": articles}
    except Exception as e:
        return {"success": False, "message": str(e)}