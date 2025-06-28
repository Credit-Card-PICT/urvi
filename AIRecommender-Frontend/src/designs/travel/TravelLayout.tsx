import React from 'react';
import { ResponseItem } from '../../config/dummyData/types';
import { TemplateConfig } from '../../config/templates';

interface TravelLayoutProps {
  responses: ResponseItem[];
  template: TemplateConfig;
}

const TravelLayout: React.FC<TravelLayoutProps> = ({ responses, template }) => {
  // This will render text responses differently from card responses
  return (
    <div className="max-w-3xl mx-auto">
      {/* AI Response Card - With improved background contrast */}
      {responses.length > 0 && responses[0].type === 'text' && (
        <div 
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-md border border-blue-300 dark:border-blue-500 p-4 mb-5 relative overflow-hidden"
        >
          {/* AI Badge */}
          <div className="absolute top-0 right-0 bg-blue-600 dark:bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-bl-lg">
            AI
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-800 flex items-center justify-center mr-3 shadow-md border border-white dark:border-gray-700">
              <span className="material-icons text-white text-lg">smart_toy</span>
            </div>
            <div className="w-full">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border-l-3 border-blue-500">
                <p className="text-gray-900 dark:text-white font-medium text-base leading-relaxed">
                  {responses[0].content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* UI-Generated Content Section - Visually distinct from AI response */}
      <div className="bg-blue-600 dark:bg-blue-800 rounded-t-xl pt-2 shadow-md">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-t-lg border-t-4 border-blue-600 dark:border-blue-600 p-3 mb-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center mr-2 shadow-md">
                <span className="material-icons text-white text-sm">flight</span>
              </div>
              <h3 className="text-lg font-bold text-blue-800 dark:text-white">Top Flight Deals ✈️</h3>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs font-bold px-2 py-0.5 rounded-full">
              RECOMMENDED
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg mb-2 text-xs">
            <p className="text-blue-800 dark:text-blue-100 font-medium">
              Based on your search criteria, we've found these flight deals with the best value:
            </p>
          </div>
        </div>
        
        {/* Flight Cards - Compact version */}
        <div className="space-y-2">
          {responses.map((response, index) => {
            if (index === 0 || response.type !== 'card') return null;
            
            return (
              <div 
                key={response.id} 
                className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-3 border border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center mr-2 shadow-sm">
                      <span className="material-icons text-white text-sm">flight_takeoff</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm">{response.content}</h4>
                      <div className="flex items-center text-xs font-medium text-gray-700 dark:text-blue-200">
                        <span className="material-icons text-blue-600 dark:text-blue-300 text-xs mr-1">calendar_today</span>
                        {response.features?.[1] || 'Available'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right bg-blue-100 dark:bg-blue-800 p-2 rounded-md shadow-sm border border-blue-200 dark:border-blue-700">
                    <div className="text-base font-bold text-gray-900 dark:text-white">{response.price}</div>
                    <div className="text-xs bg-green-500 dark:bg-green-600 text-white px-2 py-0.5 rounded-sm inline-block font-medium">
                      {response.discount}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 py-1 border-t border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center text-xs font-medium text-blue-800 dark:text-white bg-blue-100 dark:bg-blue-600 px-2 py-1 rounded-md">
                    <span className="material-icons text-blue-600 dark:text-white text-xs mr-1">access_time</span>
                    {response.features?.[0] || 'Standard'}
                  </div>
                  <div className="flex items-center text-xs font-medium text-blue-800 dark:text-white bg-blue-100 dark:bg-blue-600 px-2 py-1 rounded-md">
                    <span className="material-icons text-blue-600 dark:text-white text-xs mr-1">luggage</span>
                    Baggage
                  </div>
                  <div className="flex items-center text-xs font-medium text-blue-800 dark:text-white bg-blue-100 dark:bg-blue-600 px-2 py-1 rounded-md">
                    <span className="material-icons text-blue-600 dark:text-white text-xs mr-1">event_available</span>
                    Free Cancel
                  </div>
                </div>
                
                <div className="mt-2 flex justify-end">
                  <button className={`${template.buttonColor} text-white px-3 py-1 rounded-md text-xs font-medium shadow-sm transition flex items-center`}>
                    <span className="material-icons text-xs mr-1">airplane_ticket</span>
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TravelLayout;