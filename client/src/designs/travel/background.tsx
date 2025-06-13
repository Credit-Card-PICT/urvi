import React from 'react';

const TravelBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden opacity-20 dark:opacity-10 pointer-events-none">
      {/* Cloud elements */}
      <div className="absolute top-10 left-10 w-24 h-12 bg-white dark:bg-blue-200 rounded-full" />
      <div className="absolute top-14 left-14 w-36 h-12 bg-white dark:bg-blue-200 rounded-full" />
      <div className="absolute top-8 left-24 w-24 h-14 bg-white dark:bg-blue-200 rounded-full" />
      
      <div className="absolute top-40 right-20 w-32 h-14 bg-white dark:bg-blue-200 rounded-full" />
      <div className="absolute top-36 right-30 w-24 h-12 bg-white dark:bg-blue-200 rounded-full" />
      <div className="absolute top-44 right-40 w-36 h-16 bg-white dark:bg-blue-200 rounded-full" />
      
      {/* Airplane paths */}
      <div className="absolute top-1/4 left-0 w-full border-t-2 border-dashed border-blue-300 dark:border-blue-500" />
      <div className="absolute top-2/3 left-0 w-full border-t-2 border-dashed border-blue-300 dark:border-blue-500" />
      
      {/* Airplane icons */}
      <div className="absolute top-[23%] left-1/4 transform -rotate-12">
        <span className="material-icons text-blue-500 dark:text-blue-400 text-5xl">flight</span>
      </div>
      <div className="absolute top-[62%] right-1/3 transform rotate-12">
        <span className="material-icons text-blue-500 dark:text-blue-400 text-5xl">flight</span>
      </div>
      
      {/* Destination markers */}
      <div className="absolute bottom-20 left-20">
        <span className="material-icons text-red-500 text-4xl">place</span>
      </div>
      <div className="absolute top-40 right-40">
        <span className="material-icons text-red-500 text-4xl">place</span>
      </div>
    </div>
  );
};

export default TravelBackground;