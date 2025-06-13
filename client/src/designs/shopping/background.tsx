import React from 'react';

const ShoppingBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden opacity-20 dark:opacity-10 pointer-events-none">
      {/* Shopping bag patterns */}
      <div className="absolute top-10 left-10">
        <span className="material-icons text-green-500 dark:text-green-400 text-6xl">shopping_bag</span>
      </div>
      <div className="absolute top-40 right-20">
        <span className="material-icons text-green-500 dark:text-green-400 text-6xl">shopping_cart</span>
      </div>
      <div className="absolute bottom-40 left-30">
        <span className="material-icons text-green-500 dark:text-green-400 text-6xl">local_mall</span>
      </div>
      <div className="absolute bottom-30 right-40">
        <span className="material-icons text-green-500 dark:text-green-400 text-6xl">store</span>
      </div>
      
      {/* Price tags */}
      <div className="absolute top-1/4 left-1/3 transform -rotate-12">
        <div className="w-16 h-12 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center relative">
          <span className="text-green-800 dark:text-green-100 font-bold">$99</span>
          <div className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">%</span>
          </div>
        </div>
      </div>
      
      <div className="absolute top-2/3 right-1/4 transform rotate-12">
        <div className="w-16 h-12 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center relative">
          <span className="text-green-800 dark:text-green-100 font-bold">$49</span>
          <div className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">%</span>
          </div>
        </div>
      </div>
      
      {/* Product grid pattern */}
      <div className="absolute inset-y-1/4 right-10 w-1/3 grid grid-cols-3 gap-3">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="aspect-square bg-green-200 dark:bg-green-700 rounded-md flex items-center justify-center">
            <span className="material-icons text-green-600 dark:text-green-200 text-lg">
              {['devices', 'headphones', 'watch', 'smartphone', 'computer', 'tv'][i % 6]}
            </span>
          </div>
        ))}
      </div>
      
      {/* Shopping receipt */}
      <div className="absolute left-20 top-1/3 w-40 h-80 bg-white dark:bg-gray-700 p-2 flex flex-col items-center">
        <div className="w-full h-3 bg-green-300 dark:bg-green-600 mb-2"></div>
        {[...Array(10)].map((_, i) => (
          <div key={i} className="w-full h-2 bg-gray-200 dark:bg-gray-600 mb-1"></div>
        ))}
        <div className="w-full h-px bg-gray-300 dark:bg-gray-500 my-2"></div>
        <div className="w-3/4 h-2 bg-gray-300 dark:bg-gray-500 mb-1"></div>
        <div className="w-1/2 h-2 bg-gray-300 dark:bg-gray-500 mb-1"></div>
      </div>
    </div>
  );
};

export default ShoppingBackground;