import React from 'react';

const ShoppingModule: React.FC = () => {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-md border border-green-100 p-6 mb-6 max-w-3xl mx-auto relative overflow-hidden">
      {/* Green line accent on left */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400"></div>
      
      <div className="flex items-start">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
          <span className="material-icons text-green-600">smart_toy</span>
        </div>
        <div className="w-full">
          <p className="text-gray-800 leading-relaxed mb-4">
            I've found some great shopping deals for you. Check out these options:
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-5 flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
              <span className="material-icons text-green-600">shopping_bag</span>
            </div>
            Top Deals for You 🛍️
          </h3>
          
          {/* Shopping Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Shopping Card 1 */}
            <div className="bg-gradient-to-r from-white to-green-50 rounded-lg overflow-hidden border border-green-100 hover:border-green-300 hover:shadow-md transition-all">
              <div className="h-40 bg-green-100 relative">
                <div className="h-full flex items-center justify-center bg-green-50">
                  <span className="material-icons text-green-300 text-5xl">watch</span>
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-medium text-gray-900">Noise Smartwatch</h4>
                <div className="flex justify-between items-center mt-1">
                  <div className="text-lg font-semibold text-gray-900">₹1,999</div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="material-icons text-amber-500 text-xs mr-1">shopping_cart</span>
                    Amazon
                  </div>
                </div>
                <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full inline-block mt-1">
                  5% cashback on SBI
                </div>
                <button className="w-full bg-green-500 text-white py-1.5 rounded text-sm mt-3 hover:bg-green-600 transition">
                  View Deal
                </button>
              </div>
            </div>
            
            {/* Shopping Card 2 */}
            <div className="bg-gradient-to-r from-white to-green-50 rounded-lg overflow-hidden border border-green-100 hover:border-green-300 hover:shadow-md transition-all">
              <div className="h-40 bg-green-100 relative">
                <div className="h-full flex items-center justify-center bg-green-50">
                  <span className="material-icons text-green-300 text-5xl">headphones</span>
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-medium text-gray-900">JBL Earbuds</h4>
                <div className="flex justify-between items-center mt-1">
                  <div className="text-lg font-semibold text-gray-900">₹2,699</div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="material-icons text-amber-500 text-xs mr-1">shopping_cart</span>
                    Flipkart
                  </div>
                </div>
                <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full inline-block mt-1">
                  10% off with Kotak
                </div>
                <button className="w-full bg-green-500 text-white py-1.5 rounded text-sm mt-3 hover:bg-green-600 transition">
                  View Deal
                </button>
              </div>
            </div>
            
            {/* Shopping Card 3 */}
            <div className="bg-gradient-to-r from-white to-green-50 rounded-lg overflow-hidden border border-green-100 hover:border-green-300 hover:shadow-md transition-all">
              <div className="h-40 bg-green-100 relative">
                <div className="h-full flex items-center justify-center bg-green-50">
                  <span className="material-icons text-green-300 text-5xl">devices</span>
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-medium text-gray-900">Basic Electronics Combo</h4>
                <div className="flex justify-between items-center mt-1">
                  <div className="text-lg font-semibold text-gray-900">₹899</div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="material-icons text-amber-500 text-xs mr-1">shopping_cart</span>
                    Amazon
                  </div>
                </div>
                <div className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full inline-block mt-1">
                  Deal of the Day
                </div>
                <button className="w-full bg-green-500 text-white py-1.5 rounded text-sm mt-3 hover:bg-green-600 transition">
                  View Deal
                </button>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-4">
            I can help you find more deals or compare prices. What are you looking for?
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShoppingModule;
