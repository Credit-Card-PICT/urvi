import React from 'react';
import SuggestionChip from '../shared/SuggestionChip';
import { useChatContext } from '@/context/ChatContext';

const HomeModule: React.FC = () => {
  const { addMessage, setTyping } = useChatContext();
  
  // Handle suggestion chip click
  const handleSuggestion = (suggestion: string) => {
    // Add user message
    addMessage({ role: 'user', content: suggestion });
    
    // Show typing indicator
    setTyping(true);
    
    // Simulate response delay
    setTimeout(() => {
      setTyping(false);
      
      if (suggestion.toLowerCase().includes('travel') || suggestion.toLowerCase().includes('flight')) {
        addMessage({ 
          role: 'assistant', 
          content: 'Here are some travel recommendations for you:',
          moduleType: 'travel' 
        });
      } else if (suggestion.toLowerCase().includes('hotel')) {
        addMessage({ 
          role: 'assistant', 
          content: 'Check out these hotel options I found for you:',
          moduleType: 'hotel' 
        });
      } else if (suggestion.toLowerCase().includes('electronics')) {
        addMessage({ 
          role: 'assistant', 
          content: 'I found these shopping deals you might like:',
          moduleType: 'shopping' 
        });
      } else {
        addMessage({ 
          role: 'assistant', 
          content: 'I can help you with that. What specific information are you looking for?',
          moduleType: 'home' 
        });
      }
    }, 1500);
  };
  
  return (
    <div className="module-transition">
      {/* Welcome Card */}
      <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-md border border-primary-100 p-6 mb-6 max-w-3xl mx-auto relative overflow-hidden">
        {/* Blue line accent on left */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
        
        <div className="flex items-start">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-1">
            <span className="material-icons text-primary">smart_toy</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Welcome to SmartRecommend</h3>
            <p className="text-gray-800 leading-relaxed">
              Hi there! 👋 I'm your Smart Lifestyle Assistant. I can help you find the perfect credit card, book flights, discover hotels, or find shopping deals. What would you like help with today?
            </p>
            
            {/* Category Icons */}
            <div className="flex space-x-5 mt-6 mb-3">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                  <span className="material-icons text-blue-500">flight</span>
                </div>
                <span className="text-xs text-gray-600">Travel</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-1">
                  <span className="material-icons text-amber-500">hotel</span>
                </div>
                <span className="text-xs text-gray-600">Hotels</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-1">
                  <span className="material-icons text-green-500">shopping_bag</span>
                </div>
                <span className="text-xs text-gray-600">Shopping</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-1">
                  <span className="material-icons text-purple-500">credit_card</span>
                </div>
                <span className="text-xs text-gray-600">Credit Cards</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mt-3">
              Try asking about specific categories or click one of the suggestion chips below.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeModule;
