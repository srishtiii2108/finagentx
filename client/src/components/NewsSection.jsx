import React from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';

const NewsSection = ({ newsList }) => {
  if (!newsList || newsList.length === 0) return null;

  return (
    <div className="bg-brand-surface border border-brand-border p-6 rounded-xl mt-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Newspaper className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-bold text-white">Latest Market News</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {newsList.map((news, index) => (
          <a 
            key={index}
            href={news.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block bg-brand-dark border border-brand-border p-4 rounded-lg hover:border-brand-blue hover:bg-slate-800/50 transition-all group"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-brand-muted bg-slate-800 px-2 py-1 rounded">
                {news.publisher || "News Source"}
              </span>
              <ExternalLink className="w-4 h-4 text-brand-muted group-hover:text-blue-400 transition-colors" />
            </div>
            <h4 className="text-sm font-medium text-white line-clamp-3 leading-snug">
              {news.title}
            </h4>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;