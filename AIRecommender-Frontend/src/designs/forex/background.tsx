import React from 'react';

const ForexBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden opacity-20 dark:opacity-10 pointer-events-none">
      {/* Currency symbols */}
      <div className="absolute top-16 left-16 text-5xl font-bold text-cyan-600 dark:text-cyan-400">$</div>
      <div className="absolute top-48 right-24 text-5xl font-bold text-cyan-600 dark:text-cyan-400">€</div>
      <div className="absolute bottom-32 left-36 text-5xl font-bold text-cyan-600 dark:text-cyan-400">£</div>
      <div className="absolute top-64 left-64 text-5xl font-bold text-cyan-600 dark:text-cyan-400">¥</div>
      <div className="absolute bottom-48 right-48 text-5xl font-bold text-cyan-600 dark:text-cyan-400">₣</div>
      <div className="absolute top-24 right-60 text-5xl font-bold text-cyan-600 dark:text-cyan-400">₽</div>
      
      {/* Stock chart patterns */}
      <div className="absolute top-1/4 left-0 right-0 h-px bg-cyan-400 dark:bg-cyan-600"></div>
      <svg className="absolute top-1/4 left-0 right-0 h-24 w-full" viewBox="0 0 100 25" preserveAspectRatio="none">
        <path 
          d="M0,5 L5,7 L10,4 L15,9 L20,6 L25,8 L30,5 L35,12 L40,9 L45,15 L50,11 L55,17 L60,14 L65,19 L70,15 L75,20 L80,16 L85,22 L90,18 L95,24 L100,20" 
          fill="none" 
          stroke="rgba(45, 212, 191, 0.5)" 
          strokeWidth="0.5"
        />
      </svg>
      
      <div className="absolute top-2/4 left-0 right-0 h-px bg-cyan-400 dark:bg-cyan-600"></div>
      <svg className="absolute top-2/4 left-0 right-0 h-24 w-full" viewBox="0 0 100 25" preserveAspectRatio="none">
        <path 
          d="M0,20 L5,18 L10,22 L15,16 L20,19 L25,14 L30,17 L35,12 L40,16 L45,10 L50,13 L55,8 L60,11 L65,6 L70,10 L75,5 L80,9 L85,4 L90,7 L95,2 L100,5" 
          fill="none" 
          stroke="rgba(45, 212, 191, 0.5)" 
          strokeWidth="0.5"
        />
      </svg>
      
      {/* Candlestick patterns */}
      <div className="absolute top-3/4 left-1/4 flex space-x-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-0.5 h-4 bg-cyan-600"></div>
            <div className={`w-3 h-8 ${i % 2 === 0 ? 'bg-red-500' : 'bg-green-500'}`}></div>
            <div className="w-0.5 h-4 bg-cyan-600"></div>
          </div>
        ))}
      </div>
      
      <div className="absolute top-1/3 right-1/4 flex space-x-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-0.5 h-4 bg-cyan-600"></div>
            <div className={`w-3 h-8 ${i % 2 === 1 ? 'bg-red-500' : 'bg-green-500'}`}></div>
            <div className="w-0.5 h-4 bg-cyan-600"></div>
          </div>
        ))}
      </div>
      
      {/* Currency exchange symbols */}
      <div className="absolute top-1/3 left-1/5">
        <div className="text-cyan-600 dark:text-cyan-400 font-mono text-sm">
          <div>EUR/USD: 1.0921</div>
          <div>GBP/USD: 1.2534</div>
          <div>USD/JPY: 113.84</div>
          <div>USD/CHF: 0.9213</div>
        </div>
      </div>
      
      <div className="absolute bottom-1/4 right-1/5">
        <div className="text-cyan-600 dark:text-cyan-400 font-mono text-sm">
          <div>AUD/USD: 0.7132</div>
          <div>USD/CAD: 1.2843</div>
          <div>NZD/USD: 0.6721</div>
          <div>EUR/GBP: 0.8432</div>
        </div>
      </div>
    </div>
  );
};

export default ForexBackground;