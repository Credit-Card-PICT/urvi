import React from 'react';
import { ResponseItem } from '../../config/dummyData/types';
import { TemplateConfig } from '../../config/templates';

interface HotelLayoutProps {
  responses: ResponseItem[];
  template: TemplateConfig;
}

const HotelLayout: React.FC<HotelLayoutProps> = ({ responses, template }) => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* AI Response Card - With improved background contrast */}
      {responses.length > 0 && responses[0].type === 'text' && (
        <div 
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-md border border-amber-300 dark:border-amber-500 p-3 mb-4 relative overflow-hidden"
        >
          {/* AI Badge */}
          <div className="absolute top-0 right-0 bg-amber-600 dark:bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-bl-lg">
            AI
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-800 flex items-center justify-center mr-3 shadow-md border border-white dark:border-gray-700">
              <span className="material-icons text-white text-lg">smart_toy</span>
            </div>
            <div className="w-full">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border-l-3 border-amber-500">
                <p className="text-gray-900 dark:text-white font-medium text-base leading-relaxed">
                  {responses[0].content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* UI-Generated Content Section - Visually distinct from AI response */}
      <div className="bg-amber-600 dark:bg-amber-800 rounded-t-xl pt-2 shadow-md">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-t-lg border-t-4 border-amber-600 dark:border-amber-600 p-3 mb-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-amber-500 dark:bg-amber-600 flex items-center justify-center mr-2 shadow-md">
                <span className="material-icons text-white text-sm">hotel</span>
              </div>
              <h3 className="text-lg font-bold text-amber-800 dark:text-white">Recommended Hotels 🏨</h3>
            </div>
            <div className="bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 text-xs font-bold px-2 py-0.5 rounded-full">
              TOP RATED
            </div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg mb-2 text-xs">
            <p className="text-amber-800 dark:text-amber-100 font-medium">
              We've found these top-rated hotels matching your preferences for luxury and comfort:
            </p>
          </div>
        </div>

        {/* Hotel Cards - Compact version */}
        <div className="grid grid-cols-1 gap-2">
          {responses.map((response, index) => {
            if (index === 0 || response.type !== 'card') return null;
            
            return (
              <div 
                key={response.id} 
                className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg overflow-hidden border border-amber-200 dark:border-amber-700 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-lg transition-all"
              >
                <div className="flex">
                  {/* Left side with image and name */}
                  <div className="w-1/3 bg-amber-600 dark:bg-amber-800 relative overflow-hidden shadow-sm">
                    <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2080%2080%22%20width%3D%2280%22%20height%3D%2280%22%20fill%3D%22none%22%20stroke%3D%22%23ffffff%22%20stroke-width%3D%220.5%22%3E%3Cpath%20d%3D%22M0%2010h80M0%2030h80M0%2050h80M0%2070h80M10%200v80M30%200v80M50%200v80M70%200v80%22%20%2F%3E%3C%2Fsvg%3E')]"></div>
                    <div className="h-full flex items-center justify-center">
                      <span className="material-icons text-white text-3xl drop-shadow-md">
                        {index % 3 === 0 ? 'beach_access' : index % 3 === 1 ? 'spa' : 'local_cafe'}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2">
                      <div className="text-white font-bold text-sm">{response.content}</div>
                    </div>
                    {response.discount && (
                      <div className="absolute top-2 right-2 text-xs font-bold bg-red-500 text-white px-1.5 py-0.5 rounded shadow-sm">
                        {response.discount}
                      </div>
                    )}
                  </div>
                  
                  {/* Right side with info */}
                  <div className="w-2/3 p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center text-xs font-medium bg-amber-50 dark:bg-amber-900/30 px-1.5 py-0.5 rounded">
                          <span className="text-amber-600 dark:text-amber-300 font-bold">{response.rating} ⭐</span>
                          <span className="text-gray-700 dark:text-gray-100 ml-1 text-xs">({Math.floor(response.rating! * 100)})</span>
                        </div>
                        <div className="text-xs font-medium text-gray-800 dark:text-amber-100 flex items-center">
                          <span className="material-icons text-amber-600 dark:text-amber-300 text-xs mr-0.5">location_on</span>
                          {response.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-bold text-gray-900 dark:text-white bg-amber-100 dark:bg-amber-800/60 px-2 py-1 rounded">
                          {response.price}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 py-1 border-t border-b border-amber-200 dark:border-amber-700/50">
                      {response.features?.slice(0, 2).map((feature, i) => (
                        <div key={i} className="text-xs font-medium text-gray-800 dark:text-amber-100 flex items-center bg-amber-50 dark:bg-amber-900/40 px-1.5 py-0.5 rounded">
                          <span className="material-icons text-amber-600 dark:text-amber-300 text-xs mr-0.5">check_circle</span>
                          {feature.length > 15 ? feature.substring(0, 15) + '...' : feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-2 flex justify-end space-x-2">
                      <button className="bg-white dark:bg-gray-700 border border-amber-300 dark:border-amber-500 text-amber-700 dark:text-amber-300 py-1 px-2 rounded text-xs font-medium">
                        Details
                      </button>
                      <button className={`${template.buttonColor} text-white px-3 py-1 rounded text-xs font-medium shadow-sm flex items-center`}>
                        <span className="material-icons text-xs mr-1">calendar_today</span>
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HotelLayout;