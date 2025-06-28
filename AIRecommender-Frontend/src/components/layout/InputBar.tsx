import React, { useState } from 'react';
import { useChatContext } from '@/context/ChatContext';

const InputBar: React.FC = () => {
  const [message, setMessage] = useState('');
  const { addMessage, setTyping } = useChatContext();

  // Function to handle both form submission and suggestion clicks
  const handleMessage = (userMessage: string) => {
    if (userMessage.trim() === '') return;

    // Add user message to chat
    addMessage({ role: 'user', content: userMessage });
    
    // Clear input if it was from the form
    setMessage('');
    
    // Show typing indicator
    setTyping(true);
    
    // Simulate response delay
    setTimeout(() => {
      setTyping(false);
      
      // Handle special UI demonstration commands
      if (userMessage.toLowerCase().includes('show me') || userMessage.toLowerCase().includes('switch to')) {
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('travel')) {
          addMessage({ 
            role: 'assistant', 
            content: 'Switching to Travel UI. Here are some travel recommendations for you:',
            moduleType: 'travel' 
          });
          return;
        } else if (lowerMessage.includes('hotel')) {
          addMessage({ 
            role: 'assistant', 
            content: 'Switching to Hotel UI. Here are some hotel options I found for you:',
            moduleType: 'hotel' 
          });
          return;
        } else if (lowerMessage.includes('shopping')) {
          addMessage({ 
            role: 'assistant', 
            content: 'Switching to Shopping UI. Here are some shopping deals you might like:',
            moduleType: 'shopping' 
          });
          return;
        } else if (lowerMessage.includes('home')) {
          addMessage({ 
            role: 'assistant', 
            content: 'Switching to Home UI. How can I assist you today?',
            moduleType: 'home' 
          });
          return;
        }
      }
      
      // Normal message handling
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('travel') || lowerMessage.includes('flight')) {
        addMessage({ 
          role: 'assistant', 
          content: 'Here are some travel recommendations for you:',
          moduleType: 'travel' 
        });
      } else if (lowerMessage.includes('hotel')) {
        addMessage({ 
          role: 'assistant', 
          content: 'Check out these hotel options I found for you:',
          moduleType: 'hotel' 
        });
      } else if (lowerMessage.includes('shopping') || lowerMessage.includes('electronics')) {
        addMessage({ 
          role: 'assistant', 
          content: 'I found these shopping deals you might like:',
          moduleType: 'shopping' 
        });
      } else {
        addMessage({ 
          role: 'assistant', 
          content: 'I can help you with travel, hotels, and shopping recommendations. What would you like to know?',
          moduleType: 'home' 
        });
      }
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleMessage(message);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleMessage(suggestion);
  };

  return (
    <footer className="bg-white border-t border-gray-200 pt-4 pb-6 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Suggestion chips */}
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          <button 
            className="suggestion-chip px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm"
            onClick={() => handleSuggestionClick("Credit card for travel")}
          >
            <span className="material-icons text-primary text-sm mr-1">credit_card</span>
            Credit card for travel
          </button>
          <button 
            className="suggestion-chip px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm"
            onClick={() => handleSuggestionClick("Budget flights Mumbai-Delhi")}
          >
            <span className="material-icons text-primary text-sm mr-1">flight</span>
            Budget flights Mumbai-Delhi
          </button>
          <button 
            className="suggestion-chip px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm"
            onClick={() => handleSuggestionClick("Hotels in Goa under ₹5000")}
          >
            <span className="material-icons text-primary text-sm mr-1">hotel</span>
            Hotels in Goa under ₹5000
          </button>
          <button 
            className="suggestion-chip px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm"
            onClick={() => handleSuggestionClick("Electronics under ₹1000")}
          >
            <span className="material-icons text-primary text-sm mr-1">shopping_bag</span>
            Electronics under ₹1000
          </button>
        </div>

        <form className="relative" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Ask me about credit cards, flights, hotels, or shopping deals..." 
            className="w-full border border-gray-300 rounded-lg py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoFocus
          />
          <button 
            type="submit" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-primary rounded-md p-1.5 hover:bg-primary/90"
          >
            <span className="material-icons">send</span>
          </button>
        </form>
      </div>
    </footer>
  );
};

export default InputBar;
