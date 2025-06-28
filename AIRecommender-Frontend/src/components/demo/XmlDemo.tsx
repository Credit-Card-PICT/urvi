import { useState } from 'react';
import { 
  HomeModuleXML, 
  TravelModuleXML, 
  HotelModuleXML, 
  ShoppingModuleXML 
} from '../../mockups/XMLMockups';

const XmlDemo: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string>('home');

  const getXmlContent = () => {
    switch(selectedModule) {
      case 'travel':
        return TravelModuleXML;
      case 'hotel':
        return HotelModuleXML;
      case 'shopping':
        return ShoppingModuleXML;
      default:
        return HomeModuleXML;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="h-16 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="material-icons text-primary">smart_toy</span>
            <h1 className="text-xl font-semibold text-gray-900">SmartRecommend XML Mockups</h1>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              className="bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700"
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
            >
              <option value="home">Home</option>
              <option value="travel">Travel</option>
              <option value="hotel">Hotel</option>
              <option value="shopping">Shopping</option>
            </select>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-6">
        <div className="container mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">
              {selectedModule.charAt(0).toUpperCase() + selectedModule.slice(1)} Module XML
            </h2>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
              {getXmlContent()}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
};

export default XmlDemo;