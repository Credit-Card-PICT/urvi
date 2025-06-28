import React from 'react';
import { ResponseItem } from '../../config/dummyData/types';
import { TemplateConfig } from '../../config/templates';

interface VerticalLayoutProps {
  responses: ResponseItem[];
  template: TemplateConfig;
}

const VerticalLayout: React.FC<VerticalLayoutProps> = ({ responses, template }) => {
  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {responses.map((response) => (
        <div 
          key={response.id} 
          className={`${template.cardBackground} rounded-lg shadow-lg border-2 ${template.accentColor} p-6 transition-all duration-300 hover:shadow-xl ${response.id === 1 ? 'bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-900/30 relative' : ''}`}
        >
          {/* Add AI Badge only to the first response */}
          {response.id === 1 && (
            <div className="absolute top-0 right-0 bg-purple-600 dark:bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              AI RESPONSE
            </div>
          )}

          {/* Text Response */}
          {response.type === 'text' && (
            <div className="flex items-start">
              {/* Avatar for first response is special */}
              {response.id === 1 ? (
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-800 flex items-center justify-center mr-4 shadow-lg border-2 border-white dark:border-gray-700">
                  <span className="material-icons text-white text-2xl">smart_toy</span>
                </div>
              ) : (
                <div className="w-14 h-14 rounded-full bg-purple-500 dark:bg-purple-600 flex items-center justify-center mr-4 shadow-lg">
                  <span className="material-icons text-white text-2xl">smart_toy</span>
                </div>
              )}
              
              <div className="flex-1">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-purple-500">
                  <p className="text-gray-900 dark:text-white font-semibold text-lg leading-relaxed">
                    {response.content}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Image Response */}
          {response.type === 'image' && response.src && (
            <div className="flex items-start">
              <div className="w-14 h-14 rounded-full bg-purple-500 dark:bg-purple-600 flex items-center justify-center mr-4 shadow-lg">
                <span className="material-icons text-white text-2xl">image</span>
              </div>
              <div className="flex-1">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-2 border-purple-300 dark:border-purple-700">
                  <img 
                    src={response.src} 
                    alt={response.alt || "Image"} 
                    className="rounded-lg max-w-full h-auto border-3 border-purple-200 dark:border-purple-600 shadow-lg"
                  />
                  {response.content && (
                    <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg shadow-sm">
                      <p className="text-gray-900 dark:text-white text-md font-medium">
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

export default VerticalLayout;