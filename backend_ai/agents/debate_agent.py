import os
import cohere
import json
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

cohere_api_key = os.getenv("COHERE_API_KEY")
co_client = cohere.Client(cohere_api_key) if cohere_api_key else None

def generate_ai_analysis(company_data, news_data, tech_data):
    if not co_client:
        return {"success": False, "message": "Cohere API key missing"}

    try:
        current_time = datetime.now().strftime("%d %b %Y, %I:%M %p IST")

        # Context combining all three pillars
        context = (
            f"Company Financials: {company_data}\n"
            f"Technical Indicators Summary: {tech_data.get('ai_summary', 'N/A')}\n"
            f"Recent News & Sentiment: {news_data}"
        )
        
        # 1. Bull Agent
        bull_prompt = (
            f"You are an expert Bull Market Analyst. Based on the comprehensive data below (Fundamentals, Technicals, News), "
            f"provide the top 3 strong reasons to BUY this stock. Emphasize positive technical signals and growth catalysts. Be concise.\n\n{context}"
        )
        bull_res = co_client.chat(model="command-r-plus-08-2024", message=bull_prompt)
        bull_response = bull_res.text.strip()
        
        # 2. Bear Agent
        bear_prompt = (
            f"You are an expert Bear Market Analyst. Based on the comprehensive data below (Fundamentals, Technicals, News), "
            f"provide the top 3 strong reasons to SELL or AVOID this stock. Emphasize negative technical signals or risks. Be concise.\n\n{context}"
        )
        bear_res = co_client.chat(model="command-r-plus-08-2024", message=bear_prompt)
        bear_response = bear_res.text.strip()
        
        # 3. Judge Agent with Advanced Structured Schema
        judge_prompt = f"""You are the Chief Judge AI Agent for FinAgentX.
        Evaluate the complete Context, Bull Arguments, and Bear Arguments objectively.
        
        Context: {context}
        Bull Arguments: {bull_response}
        Bear Arguments: {bear_response}
        
        Provide a final investment verdict. You must output ONLY a valid JSON object in the exact format below, without any markdown tags or backticks:
        {{
            "recommendation": "BUY" | "HOLD" | "SELL",
            "confidence": <integer between 1 to 100>,
            "risk_level": "LOW" | "MEDIUM" | "HIGH",
            "reasoning_summary": "<detailed 3-4 line explanation combining bull, bear cases and technicals>",
            "fundamental_score": "Strong" | "Moderate" | "Weak",
            "technical_score": "Bullish" | "Neutral" | "Bearish",
            "sentiment_score": "Positive" | "Neutral" | "Negative",
            "key_catalysts": ["<catalyst 1>", "<catalyst 2>"],
            "key_risks": ["<risk 1>", "<risk 2>"]
        }}
        """
        judge_res = co_client.chat(model="command-r-plus-08-2024", message=judge_prompt)
        judge_response = judge_res.text.strip()
        
        if judge_response.startswith("```json"):
            judge_response = judge_response[7:-3].strip()
        elif judge_response.startswith("```"):
            judge_response = judge_response[3:-3].strip()
            
        judge_json = json.loads(judge_response)
        
        # Attach data provenance timestamp
        judge_json["data_timestamp"] = current_time

        return {
            "success": True,
            "bull_case": bull_response,
            "bear_case": bear_response,
            "judge_verdict": judge_json
        }
    except Exception as e:
        return {"success": False, "message": f"AI Generation Failed: {str(e)}"}