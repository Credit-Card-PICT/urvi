import React from 'react';
import { ResponseItem } from '../../config/dummyData/types';
import { TemplateConfig } from '../../config/modules/types';

interface ForexLayoutProps {
  responses: ResponseItem[];
  template: TemplateConfig;
}

const ForexLayout: React.FC<ForexLayoutProps> = ({ responses, template }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-4">
        <h2 className={`text-xl font-semibold mb-2 text-cyan-600 dark:text-cyan-400`}>
          Foreign Exchange Recommendations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {responses.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg ${template.cardBackground} border border-cyan-200 dark:border-cyan-700 shadow-md transition-all hover:shadow-lg`}
            >
              {item.type === 'card' && (
                <div>
                  <div className="font-medium text-lg mb-2">{item.content}</div>
                  {item.features && (
                    <ul className="mt-2 space-y-1">
                      {item.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="material-icons text-cyan-500 mr-1 text-sm">check_circle</span>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              
              {item.type === 'product' && (
                <div>
                  <div className="font-medium text-lg mb-1">{item.content}</div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-cyan-600 dark:text-cyan-400 font-bold">{item.price}</div>
                    {item.discount && (
                      <div className="bg-cyan-100 dark:bg-cyan-800 text-cyan-700 dark:text-cyan-300 text-xs px-2 py-1 rounded">
                        {item.discount}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {item.type === 'text' && (
                <div className="prose dark:prose-invert">
                  <p>{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Exchange rates panel */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-4">
        <h3 className={`text-lg font-semibold mb-2 text-cyan-600 dark:text-cyan-400`}>
          Current Exchange Rates
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 bg-cyan-50 dark:bg-cyan-900/30 rounded-md border border-cyan-200 dark:border-cyan-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">EUR/USD</div>
            <div className="font-mono text-lg">1.0921</div>
            <div className="text-xs text-green-500">+0.12%</div>
          </div>
          
          <div className="p-3 bg-cyan-50 dark:bg-cyan-900/30 rounded-md border border-cyan-200 dark:border-cyan-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">GBP/USD</div>
            <div className="font-mono text-lg">1.2534</div>
            <div className="text-xs text-red-500">-0.08%</div>
          </div>
          
          <div className="p-3 bg-cyan-50 dark:bg-cyan-900/30 rounded-md border border-cyan-200 dark:border-cyan-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">USD/JPY</div>
            <div className="font-mono text-lg">113.84</div>
            <div className="text-xs text-green-500">+0.21%</div>
          </div>
          
          <div className="p-3 bg-cyan-50 dark:bg-cyan-900/30 rounded-md border border-cyan-200 dark:border-cyan-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">USD/CHF</div>
            <div className="font-mono text-lg">0.9213</div>
            <div className="text-xs text-red-500">-0.15%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForexLayout;