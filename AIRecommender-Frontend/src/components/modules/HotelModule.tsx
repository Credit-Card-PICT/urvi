import React from 'react';

const HotelModule: React.FC = () => {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-md border border-amber-100 p-6 mb-6 max-w-3xl mx-auto relative overflow-hidden">
      {/* Amber line accent on left */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400"></div>
      
      <div className="flex items-start">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4">
          <span className="material-icons text-amber-600">smart_toy</span>
        </div>
        <div className="w-full">
          <p className="text-gray-800 leading-relaxed mb-4">
            I've found some excellent hotel options based on your preferences. Here are my top picks:
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-5 flex items-center">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
              <span className="material-icons text-amber-600">hotel</span>
            </div>
            Recommended Hotels 🏨
          </h3>
          
          {/* Hotel Cards */}
          <div className="grid grid-cols-1 gap-4">
            {/* Hotel Card 1 */}
            <div className="bg-gradient-to-r from-white to-amber-50 rounded-lg overflow-hidden border border-amber-100 hover:border-amber-300 hover:shadow-md transition-all">
              <div className="h-48 bg-amber-100 relative">
                <div className="h-full flex items-center justify-center bg-amber-50 bg.opacity-100">
                  <span className="material-icons text-amber-300 text-5xl">beach_access</span>
                  <span className="material-icons text-amber-200 text-6xl absolute right-2 bottom-2 opacity-100">hotel</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="text-white font-medium">Lemon Tree, Goa</div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <span className="text-amber-500 font-medium">4.2 ⭐</span>
                      <span className="text-xs text-gray-500 ml-2">(420 reviews)</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-600">Beach view, Free WiFi, Pool</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">₹4,800<span className="text-sm font-normal">/night</span></div>
                    <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full inline-block mt-1">
                      Free breakfast
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                  <div className="text-sm text-gray-500">Available from 15 Aug</div>
                  <button className="bg-amber-500 text-white px-3 py-1 rounded text-sm hover:bg-amber-600 transition">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
            
            {/* Hotel Card 2 */}
            <div className="bg-gradient-to-r from-white to-amber-50 rounded-lg overflow-hidden border border-amber-100 hover:border-amber-300 hover:shadow-md transition-all">
              <div className="h-48 bg-amber-100 relative">
                <div className="h-full flex items-center justify-center bg-amber-50">
                  <span className="material-icons text-amber-300 text-5xl">spa</span>
                  <span className="material-icons text-amber-200 text-6xl absolute right-2 bottom-2 opacity-100">apartment</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="text-white font-medium">Taj Palace, Mumbai</div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <span className="text-amber-500 font-medium">4.9 ⭐</span>
                      <span className="text-xs text-gray-500 ml-2">(840 reviews)</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-600">Luxury, Spa, Sea view</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">₹12,000<span className="text-sm font-normal">/night</span></div>
                    <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full inline-block mt-1">
                      25% off with ICICI
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                  <div className="text-sm text-gray-500">Premium rooms available</div>
                  <button className="bg-amber-500 text-white px-3 py-1 rounded text-sm hover:bg-amber-600 transition">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
            
            {/* Hotel Card 3 */}
            <div className="bg-gradient-to-r from-white to-amber-50 rounded-lg overflow-hidden border border-amber-100 hover:border-amber-300 hover:shadow-md transition-all">
              <div className="h-48 bg-amber-100 relative">
                <div className="h-full flex items-center justify-center bg-amber-50">
                  <span className="material-icons text-amber-300 text-5xl">local_cafe</span>
                  <span className="material-icons text-amber-200 text-6xl absolute right-2 bottom-2 opacity-50">business</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="text-white font-medium">FabHotel Pune</div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <span className="text-amber-500 font-medium">3.8 ⭐</span>
                      <span className="text-xs text-gray-500 ml-2">(215 reviews)</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-600">Clean, WiFi, Business area</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">₹2,500<span className="text-sm font-normal">/night</span></div>
                    <div className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full inline-block mt-1">
                      Budget pick
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                  <div className="text-sm text-gray-500">Central location</div>
                  <button className="bg-amber-500 text-white px-3 py-1 rounded text-sm hover:bg-amber-600 transition">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-4">
            Would you like more details on any of these hotels or would you prefer different options?
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotelModule;
