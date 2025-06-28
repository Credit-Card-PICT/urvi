import React from 'react';

const DefaultBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden opacity-15 dark:opacity-10 pointer-events-none">
      {/* Abstract circular shapes */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-purple-200 dark:bg-purple-900/50 blur-xl"></div>
      <div className="absolute top-1/4 -right-10 w-60 h-60 rounded-full bg-blue-200 dark:bg-blue-900/50 blur-xl"></div>
      <div className="absolute bottom-10 left-1/3 w-40 h-40 rounded-full bg-indigo-200 dark:bg-indigo-900/50 blur-xl"></div>
      
      {/* Dot grid pattern */}
      <div className="absolute inset-0 grid grid-cols-12 gap-8">
        {[...Array(144)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        ))}
      </div>
      
      {/* Floating icons representing different modules */}
      <div className="absolute top-1/4 left-1/4 transform -rotate-12">
        <span className="material-icons text-purple-500 dark:text-purple-400 text-4xl">travel_explore</span>
      </div>
      <div className="absolute top-1/3 right-1/3 transform rotate-12">
        <span className="material-icons text-blue-500 dark:text-blue-400 text-4xl">flight</span>
      </div>
      <div className="absolute bottom-1/3 left-1/3 transform -rotate-6">
        <span className="material-icons text-amber-500 dark:text-amber-400 text-4xl">hotel</span>
      </div>
      <div className="absolute bottom-1/4 right-1/4 transform rotate-6">
        <span className="material-icons text-green-500 dark:text-green-400 text-4xl">shopping_bag</span>
      </div>
      
      {/* Decorative lines */}
      <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent"></div>
      <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent"></div>
      <div className="absolute left-1/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-400 dark:via-gray-600 to-transparent"></div>
      <div className="absolute left-2/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-400 dark:via-gray-600 to-transparent"></div>
    </div>
  );
};

export default DefaultBackground;