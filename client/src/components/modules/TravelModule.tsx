import React from 'react';

const TravelModule: React.FC = () => {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-md border border-blue-100 p-6 mb-6 max-w-3xl mx-auto relative overflow-hidden">
      {/* Blue line accent on left */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400"></div>
      
      <div className="flex items-start">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
          <span className="material-icons text-blue-500">smart_toy</span>
        </div>
        <div className="w-full">
          <p className="text-gray-800 leading-relaxed mb-4">
            I've found some great flight deals for you. Here are my top recommendations:
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-5 flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <span className="material-icons text-blue-500">flight</span>
            </div>
            Top Flight Deals ✈️
          </h3>
          
          {/* Flight Cards */}
          <div className="space-y-4">
            {/* Flight Card 1 */}
            <div className="bg-gradient-to-r from-white to-blue-50 rounded-lg p-4 border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">Mumbai to Delhi</h4>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <span className="material-icons text-xs mr-1">calendar_today</span>
                    Available tomorrow
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">₹3,500</div>
                  <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full inline-block mt-1">
                    10% off on Axis Card
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="material-icons text-xs mr-1">access_time</span>
                  2h 10m
                </div>
                <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition">
                  View Details
                </button>
              </div>
            </div>
            
            {/* Flight Card 2 */}
            <div className="bg-gradient-to-r from-white to-blue-50 rounded-lg p-4 border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">Mumbai to Goa</h4>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <span className="material-icons text-xs mr-1">calendar_today</span>
                    Weekend special
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">₹4,200</div>
                  <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full inline-block mt-1">
                    Flat ₹500 off with HDFC
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="material-icons text-xs mr-1">access_time</span>
                  1h 30m
                </div>
                <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition">
                  View Details
                </button>
              </div>
            </div>
            
            {/* Flight Card 3 */}
            <div className="bg-gradient-to-r from-white to-blue-50 rounded-lg p-4 border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">Business class to Bangalore</h4>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <span className="material-icons text-yellow-500 text-xs mr-1">stars</span>
                    Premium experience
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">₹9,800</div>
                  <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full inline-block mt-1">
                    20% off on Amex
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="material-icons text-xs mr-1">access_time</span>
                  1h 45m
                </div>
                <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition">
                  View Details
                </button>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-4">
            Would you like me to filter these results or search for specific dates?
          </p>
        </div>
      </div>
    </div>
  );
};

export default TravelModule;
