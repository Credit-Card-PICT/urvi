import React from 'react';
import { ResponseItem } from '../../config/dummyData/types';
import { TemplateConfig } from '../../config/templates';

interface ProductGridLayoutProps {
  responses: ResponseItem[];
  template: TemplateConfig;
}

const ProductGridLayout: React.FC<ProductGridLayoutProps> = ({ responses, template }) => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* AI Response Card - With improved background contrast */}
      {responses.length > 0 && responses[0].type === 'text' && (
        <div 
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-md border border-green-300 dark:border-green-500 p-3 mb-4 relative overflow-hidden"
        >
          {/* AI Badge */}
          <div className="absolute top-0 right-0 bg-green-600 dark:bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-bl-lg">
            AI
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-600 dark:from-green-600 dark:to-teal-800 flex items-center justify-center mr-3 shadow-md border border-white dark:border-gray-700">
              <span className="material-icons text-white text-lg">smart_toy</span>
            </div>
            <div className="w-full">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border-l-3 border-green-500">
                <p className="text-gray-900 dark:text-white font-medium text-base leading-relaxed">
                  {responses[0].content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* UI-Generated Content Section - With improved background contrast */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-3 mb-4">
        <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded-lg shadow-sm mb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <div className="w-7 h-7 rounded-full bg-green-500 dark:bg-green-700 flex items-center justify-center mr-2 shadow-sm">
              <span className="material-icons text-white text-xs">shopping_bag</span>
            </div>
            Top Deals for You 🛍️
          </h3>
        </div>

        {/* Product Grid - Compact version */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {responses.map((response, index) => {
            if (index === 0 || response.type !== 'product') return null;
            
            // Product images based on the index
            const productImages = [
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 24 24' fill='none' stroke='%23aed0ae' stroke-width='1'%3E%3Ccircle cx='12' cy='12' r='9'%3E%3C/circle%3E%3Cpath d='M12 8v4l2.5 2.5'%3E%3C/path%3E%3Cpath d='M12 6.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1'%3E%3C/path%3E%3Cpath d='M12 18.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1'%3E%3C/path%3E%3Cpath d='M18.5 12a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0'%3E%3C/path%3E%3Cpath d='M6.5 12a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0'%3E%3C/path%3E%3C/svg%3E\")",
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 24 24' fill='none' stroke='%23aed0ae' stroke-width='1'%3E%3Cpath d='M3 18v-6a9 9 0 0 1 18 0v6'%3E%3C/path%3E%3Cpath d='M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5z'%3E%3C/path%3E%3Cpath d='M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z'%3E%3C/path%3E%3C/svg%3E\")",
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 24 24' fill='none' stroke='%23aed0ae' stroke-width='1'%3E%3Crect x='2' y='4' width='20' height='16' rx='2'%3E%3C/rect%3E%3Cpath d='M6 8h4'%3E%3C/path%3E%3Cpath d='M14 8h4'%3E%3C/path%3E%3Cpath d='M6 12h4'%3E%3C/path%3E%3Cpath d='M14 12h4'%3E%3C/path%3E%3Cpath d='M6 16h4'%3E%3C/path%3E%3Cpath d='M14 16h4'%3E%3C/path%3E%3C/svg%3E\")"
            ];
            
            const imageIndex = index % 3;
            const productImage = productImages[imageIndex];
            const iconNames = ['watch', 'headphones', 'devices'];
            
            return (
              <div 
                key={response.id} 
                className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-md rounded-lg overflow-hidden border border-green-200 dark:border-green-700 hover:border-green-400 dark:hover:border-green-500 hover:shadow-lg transition-all"
              >
                {/* Product image */}
                <div className="h-28 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 relative">
                  <div 
                    className="h-full flex items-center justify-center bg-cover bg-center"
                    style={{ backgroundImage: productImage }}
                  >
                    <span className="material-icons text-green-500 dark:text-green-400 text-3xl absolute bottom-2 right-2 drop-shadow-md">
                      {iconNames[imageIndex]}
                    </span>
                  </div>
                  {response.discount && (
                    <div className="absolute top-1 left-1 text-xs font-bold bg-green-500 text-white px-1.5 py-0.5 rounded-sm shadow-sm">
                      {response.discount}
                    </div>
                  )}
                </div>

                {/* Product details */}
                <div className="p-2">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{response.content}</h4>
                  </div>
                  
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-base font-bold text-gray-900 dark:text-white">{response.price}</div>
                    <div className="text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 px-1.5 py-0.5 rounded-sm">
                      {response.discount ? 'Deal' : 'Cashback'}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-700 dark:text-gray-300 bg-amber-50 dark:bg-amber-900/30 rounded-sm px-1.5 py-0.5 mb-1 flex items-center">
                    <span className="material-icons text-amber-600 dark:text-amber-300 text-xs mr-0.5">shopping_cart</span>
                    {response.features?.[2]?.replace('Available on ', '') || 'Online'}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 py-1 border-t border-b border-gray-200 dark:border-gray-700 mb-1.5">
                    {response.features?.slice(0, 1).map((feature, i) => (
                      <div key={i} className="text-xs text-gray-800 dark:text-gray-100 flex items-center bg-green-50 dark:bg-green-900/30 px-1 py-0.5 rounded-sm">
                        <span className="material-icons text-green-600 dark:text-green-300 text-xs mr-0.5">check_circle</span>
                        {feature.length > 18 ? feature.substring(0, 18) + '...' : feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-1">
                    <button className={`flex-1 ${template.buttonColor} text-white py-1 rounded-sm text-xs font-medium shadow-sm flex items-center justify-center`}>
                      <span className="material-icons text-xs mr-0.5">shopping_cart</span>
                      Buy
                    </button>
                    <button className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-1 rounded-sm text-xs font-medium flex items-center justify-center">
                      <span className="material-icons text-xs mr-0.5">info</span>
                      Details
                    </button>
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

export default ProductGridLayout;