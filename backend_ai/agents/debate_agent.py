import os
import cohere
import json
from dotenv import load_dotenv

load_dotenv()

# Cohere API client initialize kar rahe hain
cohere_api_key = os.getenv("COHERE_API_KEY")
co_client = cohere.Client(cohere_api_key) if cohere_api_key else None

def generate_ai_analysis(company_data, news_data):
    if not co_client:
        return {"success": False, "message": "Cohere API key missing"}

    try:
        # Hum AI ko raw data feed kar rahe hain
        context = f"Company Financials: {company_data}\nRecent News & Sentiment: {news_data}"
        
        # 1. BULL AGENT: Positive points dhundhega
        bull_prompt = f"You are a Bull Market Analyst. Based on the data below, provide the top 3 strong reasons to BUY this stock. Be concise.\n\n{context}"
        bull_res = co_client.chat(
            model="command-r-plus-08-2024", # Updated current valid model name
            message=bull_prompt
        )
        bull_response = bull_res.text.strip()
        
        # 2. BEAR AGENT: Negative points aur risks dhundhega
        bear_prompt = f"You are a Bear Market Analyst. Based on the data below, provide the top 3 strong reasons to SELL or AVOID this stock. Be concise.\n\n{context}"
        bear_res = co_client.chat(
            model="command-r-plus-08-2024", # Updated current valid model name
            message=bear_prompt
        )
        bear_response = bear_res.text.strip()
        
        # 3. JUDGE AGENT: Dono side sunkar final faisla lega (Structured JSON output)
        judge_prompt = f"""You are the Judge AI Agent for FinAgentX.
        Evaluate the following Context, Bull Arguments, and Bear Arguments.
        
        Context: {context}
        Bull Arguments: {bull_response}
        Bear Arguments: {bear_response}
        
        Provide a final verdict. You must output ONLY a valid JSON object in the exact format below, without any markdown tags or backticks:
        {{
            "recommendation": "BUY" | "HOLD" | "SELL",
            "confidence": <integer between 1 to 100>,
            "risk_level": "LOW" | "MEDIUM" | "HIGH",
            "reasoning_summary": "<your detailed 3-4 line explanation comparing bull and bear cases>"
        }}
        """
        judge_res = co_client.chat(
            model="command-r-plus-08-2024", # Updated current valid model name
            message=judge_prompt
        )
        judge_response = judge_res.text.strip()
        
        # Agar Cohere galti se markdown backticks bhej de, toh usko clean karna
        if judge_response.startswith("```json"):
            judge_response = judge_response[7:-3].strip()
        elif judge_response.startswith("```"):
            judge_response = judge_response[3:-3].strip()
            
        judge_json = json.loads(judge_response)
        
        return {
            "success": True,
            "bull_case": bull_response,
            "bear_case": bear_response,
            "judge_verdict": judge_json
        }
    except Exception as e:
        return {"success": False, "message": f"AI Generation Failed: {str(e)}"}