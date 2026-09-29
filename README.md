::: {align="center"}
# 🚀 FinAgentX

### Multi-Agent AI for Personalized Investment Decision Support

```{=html}
<p>
```
`<strong>`{=html}An explainable AI-powered financial intelligence
platform that combines market data, fundamental analysis, technical
analysis, financial news, multi-agent reasoning, portfolio intelligence,
and document-grounded financial research in one place.`</strong>`{=html}
```{=html}
</p>
```
```{=html}
<p>
```
`<img src="https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge" alt="Status">`{=html}
`<img src="https://img.shields.io/badge/AI-Gemini-blue?style=for-the-badge" alt="Gemini">`{=html}
`<img src="https://img.shields.io/badge/Multi--Agent-LangGraph-purple?style=for-the-badge" alt="Multi Agent">`{=html}
`<img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge" alt="FastAPI">`{=html}
`<img src="https://img.shields.io/badge/Frontend-Next.js-black?style=for-the-badge" alt="Next.js">`{=html}
```{=html}
</p>
```
```{=html}
<p>
```
`<a href="#-overview">`{=html}Overview`</a>`{=html} •
`<a href="#-features">`{=html}Features`</a>`{=html} •
`<a href="#-architecture">`{=html}Architecture`</a>`{=html} •
`<a href="#-tech-stack">`{=html}Tech Stack`</a>`{=html} •
`<a href="#-setup">`{=html}Setup`</a>`{=html} •
`<a href="#-roadmap">`{=html}Roadmap`</a>`{=html}
```{=html}
</p>
```
:::

------------------------------------------------------------------------

## 📌 Overview

**FinAgentX** is a multi-agent AI-powered investment decision-support
platform designed to bring fragmented financial research into a single,
explainable web application.

Retail investors often need to switch between different platforms to
view stock prices, company fundamentals, technical charts, financial
news, portfolio information, and annual reports. FinAgentX is designed
to consolidate these sources and use specialized AI agents to analyze
the information from different perspectives.

The core workflow is:

``` text
Financial Data + Historical Prices + Technical Indicators + News
                         │
                         ▼
              ┌──────────────────────┐
              │   Research Agent     │
              ├──────────────────────┤
              │ Fundamental Agent    │
              ├──────────────────────┤
              │ Technical Agent      │
              ├──────────────────────┤
              │ News Analysis Agent  │
              └──────────┬───────────┘
                         │
                  ┌──────┴──────┐
                  ▼             ▼
             Bull Agent     Bear Agent
                  │             │
                  └──────┬──────┘
                         ▼
                  ┌──────────────┐
                  │ Judge Agent  │
                  └──────┬───────┘
                         ▼
             Explainable Decision Support
               BUY / HOLD / SELL
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
          Portfolio   AI Doctor   RAG Reader
```

> **Important:** FinAgentX is an investment decision-support and
> educational research system. It does not execute real-money trades,
> guarantee returns, or replace a licensed financial advisor.

------------------------------------------------------------------------

## 🎯 Problem Statement

Investors frequently rely on multiple disconnected platforms for:

-   Stock prices
-   Company financials
-   Technical charts
-   Financial news
-   Market sentiment
-   Portfolio analysis
-   Annual reports

This fragmented workflow can make financial research time-consuming and
difficult to interpret, particularly for beginners.

FinAgentX addresses this problem by bringing multiple financial
information sources and specialized AI analysis into one platform while
exposing structured evidence and explanations behind the generated
decision-support output.

------------------------------------------------------------------------

## 💡 Project Objectives

### Major Objective

Build an explainable multi-agent AI platform that integrates financial
data, fundamental analysis, technical analysis, news sentiment, and
agent-based debate into a unified investment decision-support workflow.

### Supporting Objectives

-   Provide a unified stock research dashboard.
-   Perform automated fundamental analysis.
-   Calculate and interpret technical indicators.
-   Analyze financial news and market sentiment.
-   Use specialized AI agents for different analytical responsibilities.
-   Generate structured Bull vs. Bear arguments.
-   Use a Judge Agent to synthesize the available evidence.
-   Provide transparent recommendation summaries with confidence and
    risk indicators.
-   Allow users to manage and analyze their portfolios.
-   Provide an AI Portfolio Doctor for diversification and risk
    analysis.
-   Allow users to query annual reports using Retrieval-Augmented
    Generation (RAG).
-   Provide a virtual trading environment for practice.
-   Support market-event alerts and performance tracking.

------------------------------------------------------------------------

# ✨ Features

## 🔐 1. User Authentication

-   Secure user registration and login
-   JWT-based authentication
-   Protected application routes
-   User profile
-   Google OAuth support planned
-   User-specific portfolio and activity data

------------------------------------------------------------------------

## 📊 2. Live Stock Dashboard

Users can search for companies such as:

``` text
INFY
TCS
RELIANCE
HDFCBANK
ITC
```

The platform is designed to display:

-   Current stock price
-   Price change
-   Market capitalization
-   P/E ratio
-   EPS
-   ROE
-   Revenue
-   Profit/Loss
-   Quarterly performance
-   Dividend history
-   Shareholding information
-   Sector information
-   Company overview
-   Competitor information where available

Data freshness and source information should be displayed wherever
possible.

------------------------------------------------------------------------

## 📈 3. Interactive Stock Charts

FinAgentX provides interactive historical market visualization.

### Supported Time Ranges

-   1 Day
-   5 Days
-   1 Month
-   6 Months
-   1 Year
-   5 Years
-   Maximum available history

### Technical Indicators

-   Moving Average / SMA
-   RSI
-   MACD
-   Bollinger Bands
-   Trading Volume
-   Support and Resistance analysis

The system separates:

``` text
Raw Market Data
       ↓
Calculated Indicators
       ↓
AI Interpretation
```

------------------------------------------------------------------------

# 🤖 4. Multi-Agent AI Analysis

The multi-agent architecture is the core of FinAgentX.

Instead of asking one AI model to perform the complete analysis,
specialized agents are assigned different responsibilities.

### Agent Architecture

  -----------------------------------------------------------------------
  Agent                               Responsibility
  ----------------------------------- -----------------------------------
  🔎 Research Agent                   Company profile, peers, corporate
                                      events and relevant information

  📊 Fundamental Agent                Revenue, profit, debt, valuation
                                      and financial health

  📈 Technical Agent                  RSI, MACD, moving averages,
                                      volatility and price signals

  📰 News Agent                       Financial news summarization and
                                      sentiment analysis

  🐂 Bull Agent                       Strongest evidence-backed bullish
                                      case

  🐻 Bear Agent                       Strongest evidence-backed bearish
                                      case

  ⚖️ Judge Agent                      Evaluates evidence and synthesizes
                                      the final decision-support output
  -----------------------------------------------------------------------

### Agent Workflow

``` text
                    ┌─────────────────┐
                    │   Stock/Ticker  │
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
   Research Agent     Fundamental Agent   Technical Agent
          │                  │                  │
          └──────────────────┼──────────────────┘
                             ▼
                       News Agent
                             │
                  ┌──────────┴──────────┐
                  ▼                     ▼
             Bull Agent            Bear Agent
                  │                     │
                  └──────────┬──────────┘
                             ▼
                       Judge Agent
                             │
                             ▼
                 Explainable Output
```

The analyst agents should produce structured machine-readable outputs
rather than uncontrolled free-form responses. Missing data should be
explicitly marked as unavailable instead of being fabricated.

------------------------------------------------------------------------

# 🧠 5. Fundamental Analysis

The Fundamental Agent evaluates available company financial information
including:

-   Revenue growth
-   Profit growth
-   Debt
-   Cash flow
-   ROE
-   EPS
-   P/E
-   Quarterly performance
-   Valuation-related indicators

Example output structure:

``` json
{
  "score": 78,
  "outlook": "Positive",
  "strengths": [],
  "weaknesses": [],
  "valuation_notes": [],
  "reasoning_summary": ""
}
```

The exact scoring methodology will be validated during development and
evaluation.

------------------------------------------------------------------------

# 📉 6. Technical Analysis

The Technical Agent works with historical OHLCV data and calculated
indicators.

It evaluates:

-   RSI
-   MACD
-   Moving Averages
-   Bollinger Bands
-   Trading volume
-   Support levels
-   Resistance levels
-   Trend signals

The result contains structured signals and a concise explanation of the
observed technical evidence.

------------------------------------------------------------------------

# 📰 7. AI Financial News Analysis

FinAgentX collects relevant financial news and processes it using AI.

### News Pipeline

``` text
Financial News
      ↓
Article Collection
      ↓
Cleaning / Filtering
      ↓
Summarization
      ↓
Sentiment Classification
      ↓
Market Impact Interpretation
```

Sentiment categories:

-   🟢 Positive
-   ⚪ Neutral
-   🔴 Negative

The system should distinguish between the source article and
AI-generated interpretation.

------------------------------------------------------------------------

# 🐂🐻 8. Bull vs. Bear AI Debate

The Bull and Bear Agents receive the available analyst reports.

### Bull Agent

Builds the strongest case in favor of the positive investment scenario.

### Bear Agent

Builds the strongest case against the positive investment scenario.

Both sides should be evidence-based and should identify uncertainty
rather than simply agreeing with the expected outcome.

------------------------------------------------------------------------

# ⚖️ 9. Judge Agent

The Judge Agent receives:

``` text
Research Report
       +
Fundamental Report
       +
Technical Report
       +
News Report
       +
Bull Case
       +
Bear Case
       ↓
   Judge Agent
       ↓
Decision Support Output
```

The Judge produces:

-   Buy / Hold / Sell classification
-   Confidence indicator
-   Risk level
-   Bullish factors
-   Bearish factors
-   Key evidence
-   Risk factors
-   Reasoning summary
-   Data/evidence quality
-   Expected scenario/range where supported

Confidence indicators should not be presented as guaranteed
probabilities of success.

------------------------------------------------------------------------

# 💼 10. Portfolio Management

Users can maintain their investment portfolio by recording holdings such
as:

-   Stock
-   Quantity
-   Buy price
-   Buy date

The system can calculate:

-   Current holding value
-   Total portfolio value
-   Profit/Loss
-   Return percentage
-   Sector allocation
-   Portfolio concentration
-   Portfolio risk indicators

Portfolio information is scoped to the authenticated user.

------------------------------------------------------------------------

# 🩺 11. AI Portfolio Doctor

The AI Portfolio Doctor analyzes portfolio-level risk and
diversification.

### It evaluates

-   Sector concentration
-   Single-stock concentration
-   Diversification
-   Historical volatility
-   Portfolio imbalance
-   High-risk exposure

### Example output

``` text
Portfolio Health
       ↓
Risk Analysis
       ↓
Concentration Analysis
       ↓
Diversification Analysis
       ↓
AI-generated observations
       ↓
Actionable suggestions
```

The underlying risk methodology is intended to combine normalized
measures of sector concentration, single-stock concentration, and
historical volatility. Its weights and interpretation thresholds require
empirical validation.

------------------------------------------------------------------------

# 📄 12. Annual Report AI Reader

Users can upload a company's annual report in PDF format.

### RAG Pipeline

``` text
PDF Upload
    ↓
Text Extraction
    ↓
Cleaning & Normalization
    ↓
Chunking
    ↓
Embedding Generation
    ↓
Vector Store
    ↓
Similarity Search
    ↓
Relevant Context
    ↓
Gemini
    ↓
Grounded Answer + Source Reference
```

Users can ask questions such as:

> "Why did the company's debt increase this year?"

> "What were the major risks mentioned in the report?"

> "How did revenue change compared with the previous year?"

The system should ground answers in retrieved document content and
provide source/page references wherever feasible.

------------------------------------------------------------------------

# 🧪 13. Virtual Trading

FinAgentX can include a paper-trading environment for educational
practice.

### Features

-   Virtual starting balance
-   Buy stocks
-   Sell stocks
-   Track holdings
-   Transaction history
-   Profit/Loss
-   Virtual portfolio value

No real-money trade execution is performed.

------------------------------------------------------------------------

# 🔔 14. Smart Alerts

The platform is designed to support alerts for events such as:

-   Price target reached
-   Significant price movement
-   Technical breakout
-   Abnormal trading volume
-   Important company news
-   Quarterly results
-   Significant positive/negative sentiment

------------------------------------------------------------------------

# 🏆 15. Leaderboard

The virtual trading module can provide a competitive learning
environment.

Possible metrics include:

-   Virtual portfolio return
-   Portfolio growth
-   Trading performance
-   Other transparent performance metrics

------------------------------------------------------------------------

# 🔄 16. Reflection Agent --- Future Enhancement

A future Reflection Agent can evaluate previous recommendations after
sufficient outcome data becomes available.

``` text
Previous Recommendation
        ↓
Observed Outcome
        ↓
Expected vs Actual
        ↓
Reflection Agent
        ↓
Identify Contributing Factors
        ↓
Store Evaluation
        ↓
Future Research / Improvement
```

This feature is intentionally treated as a future enhancement because it
requires meaningful historical evaluation data.

------------------------------------------------------------------------

# 🏗️ Architecture

## High-Level Architecture

``` text
┌───────────────────────────────────────────────┐
│                  User                         │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│        Next.js / React Web Application        │
│                                               │
│ Dashboard │ Stocks │ Analysis │ Portfolio    │
│ Reports   │ Trading │ Alerts │ Leaderboard   │
└───────────────────────┬───────────────────────┘
                        │ REST API
                        ▼
┌───────────────────────────────────────────────┐
│                FastAPI Backend                │
│                                               │
│ Auth │ Market │ News │ Analysis │ Portfolio  │
│ RAG  │ Trading │ Alerts │ AI Orchestration   │
└───────────┬───────────────┬───────────────────┘
            │               │
            ▼               ▼
┌──────────────────┐   ┌────────────────────────┐
│   PostgreSQL     │   │   External Services    │
│                  │   │                        │
│ Users            │   │ Market Data APIs       │
│ Portfolio        │   │ Financial APIs         │
│ Analyses         │   │ News APIs              │
│ Reports          │   │ Gemini API             │
│ Transactions     │   │ Vector Store           │
└──────────────────┘   └────────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Multi-Agent Engine   │
                         │                      │
                         │ Research             │
                         │ Fundamental          │
                         │ Technical            │
                         │ News                 │
                         │ Bull                 │
                         │ Bear                 │
                         │ Judge                │
                         └──────────────────────┘
```

------------------------------------------------------------------------

# 🧩 Technology Stack

  Layer                 Technology
  --------------------- -----------------------------------------------------------
  Frontend              Next.js, React, TypeScript
  Styling               Tailwind CSS
  Backend               FastAPI, Python
  Database              PostgreSQL
  Authentication        JWT, Google OAuth
  AI Model              Gemini API
  Agent Orchestration   LangGraph, LangChain
  RAG                   FAISS / ChromaDB
  Stock Data            Yahoo Finance / yfinance, Finnhub
  Financial Data        Financial Modeling Prep / Finnhub where required
  News                  NewsAPI
  Technical Analysis    Python-based indicator calculations
  Charts                TradingView-compatible charting / financial chart library
  Deployment            Vercel + managed backend/database services

> The final provider selection may change during implementation
> depending on API availability, rate limits, cost, and deployment
> requirements.

------------------------------------------------------------------------

# 📂 Proposed Project Structure

``` text
FINAGENTX/
│
├── frontend/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── dashboard/
│   │   ├── stocks/
│   │   ├── analysis/
│   │   ├── portfolio/
│   │   ├── reports/
│   │   ├── trading/
│   │   └── leaderboard/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── dashboard/
│   │   ├── stocks/
│   │   ├── charts/
│   │   ├── analysis/
│   │   ├── agents/
│   │   └── portfolio/
│   │
│   ├── hooks/
│   ├── lib/
│   │   ├── api/
│   │   ├── auth/
│   │   └── utils/
│   │
│   ├── types/
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   ├── agents/
│   │   ├── services/
│   │   │   ├── market_data/
│   │   │   ├── news/
│   │   │   ├── fundamentals/
│   │   │   ├── technicals/
│   │   │   ├── portfolio/
│   │   │   └── rag/
│   │   ├── workflows/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   ├── models/
│   │   ├── core/
│   │   └── db/
│   │
│   ├── tests/
│   ├── requirements.txt
│   └── main.py
│
├── docs/
│   ├── architecture/
│   ├── api/
│   └── research/
│
├── .env.example
├── .gitignore
└── README.md
```

------------------------------------------------------------------------

# 🗄️ Core Database Entities

The planned relational model includes:

``` text
User
 │
 ├── Profile
 ├── Watchlist
 │     └── Watchlist Items
 │
 ├── Portfolio
 │     └── Holdings
 │
 ├── Analyses
 │     └── Agent Reports
 │
 ├── Recommendations
 │
 ├── Annual Reports
 │     └── Report Chunks
 │
 ├── Virtual Account
 │     └── Virtual Trades
 │
 └── Alerts
```

Additional market and news entities can be introduced as implementation
requirements evolve.

------------------------------------------------------------------------

# 🔌 Planned API Modules

Example backend API groups:

``` text
/api/auth
/api/users
/api/stocks
/api/market
/api/news
/api/technical-analysis
/api/ai-analysis
/api/agents
/api/recommendations
/api/portfolio
/api/portfolio-doctor
/api/reports
/api/rag
/api/trading
/api/alerts
/api/leaderboard
```

All sensitive API keys remain server-side.

------------------------------------------------------------------------

# ⚙️ Installation & Setup

## 1. Clone the Repository

``` bash
git clone <YOUR_FINAGENTX_REPOSITORY_URL>
cd FinAgentX
```

------------------------------------------------------------------------

## 2. Frontend Setup

``` bash
cd frontend
npm install
npm run dev
```

The frontend will run on the local development URL shown by Next.js.

------------------------------------------------------------------------

## 3. Backend Setup

Create a Python virtual environment:

``` bash
cd backend

python -m venv venv
```

### Windows

``` bash
venv\Scripts\activate
```

### macOS / Linux

``` bash
source venv/bin/activate
```

Install dependencies:

``` bash
pip install -r requirements.txt
```

Run FastAPI:

``` bash
uvicorn app.main:app --reload
```

------------------------------------------------------------------------

# 🔐 Environment Variables

Create a `.env` file for the backend.

Example:

``` env
# Application
ENVIRONMENT=development

# Database
DATABASE_URL=postgresql://username:password@host:5432/finagentx

# Authentication
JWT_SECRET=your_secure_secret
JWT_ALGORITHM=HS256

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Gemini
GEMINI_API_KEY=your_gemini_api_key

# Market Data
FINNHUB_API_KEY=your_finnhub_api_key

# News
NEWS_API_KEY=your_news_api_key

# RAG
VECTOR_DB_PATH=./data/vector_store
```

> Never commit `.env` files or API keys to GitHub.

------------------------------------------------------------------------

# 🔑 API/Data Providers

The architecture is designed around provider abstractions so services
can be replaced without rewriting the application.

### Market Data

-   Yahoo Finance / yfinance
-   Finnhub

### Company Financial Data

-   Financial Modeling Prep
-   Finnhub

### Financial News

-   NewsAPI

### AI

-   Gemini API

### RAG

-   FAISS during development
-   ChromaDB as a possible persistent alternative

------------------------------------------------------------------------

# 🧪 Testing Strategy

FinAgentX should be tested at multiple levels.

## Backend

-   Unit tests
-   API tests
-   Authentication tests
-   Market-data service tests
-   Technical-indicator tests
-   Agent schema validation
-   RAG retrieval tests

## Frontend

-   Component testing
-   API integration testing
-   Protected-route testing
-   Loading/error-state testing

## AI System

Evaluate:

-   Structured output validity
-   Missing-data handling
-   Evidence grounding
-   Agent consistency
-   Recommendation reproducibility
-   Explainability
-   RAG retrieval quality

------------------------------------------------------------------------

# 🛡️ Security Considerations

The project follows security-oriented development practices including:

-   Password hashing
-   JWT validation
-   Protected API routes
-   Environment-based secrets
-   Input validation
-   CORS configuration
-   File upload validation
-   PDF size/type restrictions
-   Server-side API credentials
-   User-scoped portfolio data
-   Safe error responses

Annual-report processing should be designed to prevent unsafe file
handling and prompt-injection risks.

------------------------------------------------------------------------

# 📊 Data & AI Reliability

FinAgentX is designed to distinguish between:

``` text
DATA
↓
CALCULATED METRICS
↓
AI INTERPRETATION
```

The system should:

-   Display data sources where possible.
-   Display retrieval timestamps for external data.
-   Handle API failures gracefully.
-   Avoid fabricating missing financial values.
-   Reduce confidence when important evidence is unavailable.
-   Validate structured AI responses.
-   Keep generated explanations tied to available evidence.

------------------------------------------------------------------------

# 🗺️ Development Roadmap

### Phase 1 --- Foundation

-   [ ] Repository setup
-   [ ] Next.js frontend
-   [ ] FastAPI backend
-   [ ] PostgreSQL
-   [ ] Authentication
-   [ ] Environment configuration
-   [ ] Base API architecture

### Phase 2 --- Market Intelligence

-   [ ] Company search
-   [ ] Live market data
-   [ ] Historical OHLCV
-   [ ] Stock detail page
-   [ ] Interactive charts
-   [ ] Technical indicators

### Phase 3 --- AI Analysis

-   [ ] Research Agent
-   [ ] Fundamental Agent
-   [ ] Technical Agent
-   [ ] News Agent
-   [ ] Bull Agent
-   [ ] Bear Agent
-   [ ] Judge Agent
-   [ ] Explainable recommendation UI

### Phase 4 --- Portfolio Intelligence

-   [ ] Portfolio management
-   [ ] Holdings
-   [ ] Profit/Loss
-   [ ] Sector allocation
-   [ ] Risk metrics
-   [ ] AI Portfolio Doctor

### Phase 5 --- RAG

-   [ ] PDF upload
-   [ ] Text extraction
-   [ ] Chunking
-   [ ] Embeddings
-   [ ] Vector search
-   [ ] Gemini RAG responses
-   [ ] Source/page references

### Phase 6 --- FinAgentX Ecosystem

-   [ ] Virtual trading
-   [ ] Smart alerts
-   [ ] Leaderboard
-   [ ] Reflection Agent

### Phase 7 --- Production

-   [ ] Automated testing
-   [ ] Security review
-   [ ] API optimization
-   [ ] Database optimization
-   [ ] Production environment
-   [ ] Frontend deployment
-   [ ] Backend deployment
-   [ ] Database deployment
-   [ ] Monitoring and logging
-   [ ] Final documentation

------------------------------------------------------------------------

# 🚀 Intended User Journey

``` text
Login
  ↓
Dashboard
  ↓
Search Company
  ↓
Company Overview
  ↓
Live / Historical Market Data
  ↓
Technical Indicators
  ↓
Financial News
  ↓
AI Analysis
  ↓
Research + Fundamental + Technical + News Agents
  ↓
Bull vs Bear Debate
  ↓
Judge Agent
  ↓
Explainable Decision-Support Output
  ↓
Portfolio
  ↓
AI Portfolio Doctor
  ↓
Annual Report Reader
  ↓
Virtual Trading
  ↓
Alerts & Leaderboard
```

------------------------------------------------------------------------

# 🎓 Academic & Research Foundation

FinAgentX is based on the proposed research work:

**"FinAgentX: A Proposed Multi-Agent AI Framework for Explainable and
Personalized Investment Decision Support"**

The research architecture focuses on:

-   Multi-Agent Systems
-   Large Language Models
-   Explainable AI
-   Stock Market Analysis
-   Sentiment Analysis
-   Portfolio Management
-   Retrieval-Augmented Generation

The project is intended to turn the proposed architecture into an
implemented and evaluated working prototype.

------------------------------------------------------------------------

# ⚠️ Limitations & Responsible Use

FinAgentX is a research and decision-support project.

It should **not** be interpreted as:

-   Guaranteed financial advice
-   Guaranteed returns
-   A replacement for a licensed financial advisor
-   A real-money brokerage system
-   A system capable of predicting markets with certainty

Financial data can be delayed, incomplete, unavailable, or incorrect.
AI-generated analysis can also contain errors or biases.

Users remain responsible for their own financial decisions.

------------------------------------------------------------------------

# 📚 Research References

The project research includes work related to:

-   Multi-agent financial AI
-   TradingAgents
-   FinRobot
-   FinGPT
-   Financial sentiment analysis
-   Machine-learning-based portfolio optimization
-   Explainable portfolio visualization
-   LLM-driven financial decision support

See the `docs/research/` directory for the project's detailed literature
survey and research materials.

------------------------------------------------------------------------

# 👥 Project Team

**FinAgentX --- Multi-Agent AI for Personalized Investment Support**

  Member             Role
  ------------------ ---------------------
  Shruti Shinde      Project Team Member
  Srishti Anand      Project Team Member
  Vaidehi Mandhare   Project Team Member

**Department:** Artificial Intelligence & Machine Learning\
**Institution:** SIES Graduate School of Technology, Navi Mumbai

------------------------------------------------------------------------

# 👨‍💻 Development

Built as a major academic project with a focus on:

``` text
Artificial Intelligence
        +
Multi-Agent Systems
        +
Financial Data Engineering
        +
Full-Stack Development
        +
Explainable AI
        +
Retrieval-Augmented Generation
```

------------------------------------------------------------------------

::: {align="center"}
### 🚀 FinAgentX

**Research. Analyze. Debate. Understand.**

Built for research, learning, and responsible AI-powered investment
decision support.
:::
