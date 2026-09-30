import os
import json
import cohere
from dotenv import load_dotenv

load_dotenv()

# Initialize Cohere Client
co = cohere.Client(os.getenv("COHERE_API_KEY"))

def analyze_portfolio_health(portfolio_data: dict) -> dict:
    try:
        cash = portfolio_data.get("cashBalance", 0)
        holdings = portfolio_data.get("holdings", [])
        
        # Calculate totals for context
        invested_value = sum(item.get("quantity", 0) * item.get("averagePrice", 0) for item in holdings)
        total_value = cash + invested_value
        
        portfolio_summary = f"Total Net Worth: ₹{total_value}. Cash Balance: ₹{cash}. Invested Value: ₹{invested_value}. Active Holdings: {holdings}"

        prompt = f"""
        You are an expert AI Financial Advisor. Analyze the following user stock portfolio and provide a health checkup.
        
        Portfolio Details:
        {portfolio_summary}
        
        Analyze the asset allocation (cash vs equities), diversification (if any), and overall risk.
        Return the response EXACTLY as a raw JSON object with the following structure (do not include markdown tags like ```json):
        {{
            "health_score": <int between 0-100 based on diversification and cash management>,
            "risk_level": "<Low, High Medium, or>",
            "overview": "<2-3 sentences summarizing their portfolio status>",
            "strengths": ["<strength 1>", "<strength 2>"],
            "weaknesses": ["<weakness 1>", "<weakness 2>"],
            "action_plan": ["<action 1>", "<action 2>"]
        }}
        """

        # Using the advanced command-r-plus-08-2024 model as requested
        response = co.chat(
            message=prompt,
            model="command-r-plus-08-2024", 
            temperature=0.3
        )
        
        # Clean up response text in case Cohere adds markdown formatting
        response_text = response.text.strip()
        if response_text.startswith("```json"):
            response_text = response_text[7:]
        if response_text.startswith("```"):
            response_text = response_text[3:]
        if response_text.endswith("```"):
            response_text = response_text[:-3]
            
        result_json = json.loads(response_text.strip())
        return {"success": True, "data": result_json}
        
    except Exception as e:
        return {"success": False, "message": f"Portfolio analysis failed: {str(e)}"}