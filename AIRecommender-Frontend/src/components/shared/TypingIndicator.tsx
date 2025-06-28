import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start mb-4">
      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2">
        <span className="material-icons text-gray-500 dark:text-gray-400 text-sm">smart_toy</span>
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg py-2 px-4 max-w-[80%]">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse delay-150"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse delay-300"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;