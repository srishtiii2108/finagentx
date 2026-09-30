import React from 'react';

const CompanyOverview = ({ companyInfo, ticker, newsAnalyzed }) => {
  return (
    <div className="bg-brand-surface border border-brand-border p-6 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-6">
      <div>
        <span className="text-brand-muted text-xs uppercase">Company</span>
        <h3 className="text-lg font-bold text-white mt-1">{companyInfo.company_name}</h3>
        <p className="text-brand-muted text-sm">{ticker}</p>
      </div>
      <div>
        <span className="text-brand-muted text-xs uppercase">Current Price</span>
        <h3 className="text-lg font-bold text-emerald-400 mt-1">₹{companyInfo.current_price}</h3>
        <p className="text-brand-muted text-sm">P/E: {companyInfo.pe_ratio}</p>
      </div>
      <div>
        <span className="text-brand-muted text-xs uppercase">Sector</span>
        <h3 className="text-lg font-semibold text-white mt-1">{companyInfo.sector}</h3>
        <p className="text-brand-muted text-sm">{companyInfo.industry}</p>
      </div>
      <div>
        <span className="text-brand-muted text-xs uppercase">News Analyzed</span>
        <h3 className="text-lg font-bold text-blue-400 mt-1">{newsAnalyzed} Articles</h3>
        <p className="text-brand-muted text-sm">Real-time sentiment</p>
      </div>
    </div>
  );
};

export default CompanyOverview;