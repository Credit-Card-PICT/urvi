import React from 'react';

const HotelBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden opacity-20 dark:opacity-10 pointer-events-none">
      {/* Hotel building pattern */}
      <div className="absolute inset-x-10 top-10 h-3/4 flex justify-around">
        {/* Building 1 */}
        <div className="w-16 bg-amber-200 dark:bg-amber-700 rounded-t-lg relative">
          <div className="absolute inset-x-0 top-0 bottom-0 flex flex-col justify-evenly px-1.5">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="w-2 h-2 bg-amber-50 dark:bg-amber-400"></div>
                <div className="w-2 h-2 bg-amber-50 dark:bg-amber-400"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Building 2 - taller */}
        <div className="w-20 bg-amber-300 dark:bg-amber-800 rounded-t-lg relative -mt-20">
          <div className="absolute inset-x-0 top-0 bottom-0 flex flex-col justify-evenly px-2">
            {[...Array(14)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="w-2 h-2 bg-amber-100 dark:bg-amber-500"></div>
                <div className="w-2 h-2 bg-amber-100 dark:bg-amber-500"></div>
                <div className="w-2 h-2 bg-amber-100 dark:bg-amber-500"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Building 3 */}
        <div className="w-28 bg-amber-400 dark:bg-amber-900 rounded-t-lg relative -mt-10">
          <div className="absolute inset-x-0 top-0 bottom-0 flex flex-col justify-evenly px-2.5">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="w-3 h-3 bg-amber-200 dark:bg-amber-600"></div>
                <div className="w-3 h-3 bg-amber-200 dark:bg-amber-600"></div>
                <div className="w-3 h-3 bg-amber-200 dark:bg-amber-600"></div>
                <div className="w-3 h-3 bg-amber-200 dark:bg-amber-600"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Hotel icons */}
      <div className="absolute top-1/4 left-1/4">
        <span className="material-icons text-amber-500 dark:text-amber-400 text-5xl">hotel</span>
      </div>
      <div className="absolute bottom-1/4 right-1/4">
        <span className="material-icons text-amber-500 dark:text-amber-400 text-5xl">room_service</span>
      </div>
      <div className="absolute top-3/4 left-1/3">
        <span className="material-icons text-amber-500 dark:text-amber-400 text-5xl">local_cafe</span>
      </div>
      <div className="absolute top-1/3 right-1/3">
        <span className="material-icons text-amber-500 dark:text-amber-400 text-5xl">pool</span>
      </div>
      
      {/* Palm tree decoration */}
      <div className="absolute bottom-10 left-20">
        <div className="w-4 h-20 bg-amber-700 dark:bg-amber-900"></div>
        <div className="absolute -top-16 left-2 transform -rotate-45">
          <div className="w-20 h-6 bg-green-600 dark:bg-green-800 rounded-full"></div>
        </div>
        <div className="absolute -top-16 -left-14 transform rotate-45">
          <div className="w-20 h-6 bg-green-600 dark:bg-green-800 rounded-full"></div>
        </div>
        <div className="absolute -top-10 -left-6 transform">
          <div className="w-20 h-6 bg-green-600 dark:bg-green-800 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default HotelBackground;