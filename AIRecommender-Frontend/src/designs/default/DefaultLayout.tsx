import React from 'react';
import { ResponseItem } from '../../config/dummyData/types';
import { TemplateConfig } from '../../config/templates';

interface DefaultLayoutProps {
  responses: ResponseItem[];
  template: TemplateConfig;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ responses, template }) => {
  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {responses.map((response) => (
        <div 
          key={response.id} 
          className={`${response.id === 1 ? 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm' : template.cardBackground} rounded-lg shadow-md border border-purple-300 dark:border-purple-700 p-4 transition-all duration-300 hover:shadow-lg ${response.id === 1 ? 'relative' : ''}`}
        >
          {/* Add AI Badge only to the first response */}
          {response.id === 1 && (
            <div className="absolute top-0 right-0 bg-purple-600 dark:bg-purple-500 text-white text-xs font-bold px-2 py-0.5 rounded-bl-lg">
              AI
            </div>
          )}

          {/* Text Response */}
          {response.type === 'text' && (
            <div className="flex items-start">
              {/* Avatar for first response is special */}
              {response.id === 1 ? (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-800 flex items-center justify-center mr-3 shadow-md border border-white dark:border-gray-700">
                  <span className="material-icons text-white text-lg">smart_toy</span>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-purple-500 dark:bg-purple-600 flex items-center justify-center mr-3 shadow-md">
                  <span className="material-icons text-white text-lg">smart_toy</span>
                </div>
              )}
              
              <div className="flex-1">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border-l-3 border-purple-500">
                  <p className="text-gray-900 dark:text-white font-medium text-base leading-relaxed">
                    {response.content}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Image Response */}
          {response.type === 'image' && response.src && (
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-purple-500 dark:bg-purple-600 flex items-center justify-center mr-3 shadow-md">
                <span className="material-icons text-white text-lg">image</span>
              </div>
              <div className="flex-1">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-purple-300 dark:border-purple-700">
                  <img 
                    src={response.src} 
                    alt={response.alt || "Image"} 
                    className="rounded-lg max-w-full h-auto border border-purple-200 dark:border-purple-600 shadow-md"
                  />
                  {response.content && (
                    <div className="mt-3 p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg shadow-sm">
                      <p className="text-gray-900 dark:text-white text-sm font-medium">
                        {response.content}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DefaultLayout;