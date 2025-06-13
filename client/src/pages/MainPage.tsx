import React, { useState, useEffect } from 'react';
import { ModuleType, Message } from '../types';
import { getDesignById } from '../designs';
import { templates } from '../config/templates';
import { detectModuleFromMessage } from '../utils/keywordTriggers';
import ResponseDisplay from '../components/ResponseDisplay';
import { useChatContext } from '@/context/ChatContext';

// Import all the responses data
import { travelResponses } from '../config/dummyData/travelData';
import { hotelResponses } from '../config/dummyData/hotelData';
import { shoppingResponses } from '../config/dummyData/shoppingData';
import { defaultResponses } from '../config/dummyData/defaultData';
import { forexResponses } from '../config/dummyData/forexData';

// Interface for the component props
interface MainPageProps {}

// Helper to map ModuleType to UI category string
const moduleToUICategory = (module: ModuleType): string => {
  switch (module) {
    case 'travel':
      return 'flights';
    case 'hotel':
      return 'hotel';
    case 'shopping':
      return 'shopping';
    default:
      return 'default';
  }
};

// Helper to map UI category string to ModuleType
const uiCategoryToModule = (category: string): ModuleType => {
  switch (category) {
    case 'flights':
      return 'travel';
    case 'hotel':
      return 'hotel';
    case 'shopping':
      return 'shopping';
    case 'forex':
      return 'forex';
    default:
      return 'home';
  }
};

const MainPage: React.FC<MainPageProps> = () => {
  const { main, addMessage, setTyping, setActiveModule } = useChatContext();
  const { messages, activeModule, isTyping } = main;

  // State for the data displayed in the module's layout (e.g., list of hotels, flights)
  const [moduleData, setModuleData] = useState<any[]>(defaultResponses);
  const [currentInput, setCurrentInput] = useState('');

  // Effect to update moduleData when activeModule changes
  useEffect(() => {
    setModuleData(getDummyResponsesForTopic(activeModule));
  }, [activeModule]); // Depend on activeModule

  // Function to get responses based on topic
  const getDummyResponsesForTopic = (topic: ModuleType): any[] => {
    switch (topic) {
      case 'travel':
        return travelResponses;
      case 'hotel':
        return hotelResponses;
      case 'shopping':
        return shoppingResponses;
      case 'forex':
        return forexResponses;
      default:
        return defaultResponses;
    }
  };

  // Handle user input - MODIFIED
  const handleUserInput = async () => {
    if (!currentInput.trim()) return;

    // Add the user message to the chat messages immediately
    const userMessageObject: Message = {
      role: 'user',
      content: `You: ${currentInput}`
    };

    addMessage(userMessageObject, 'main');
    setTyping(true, 'main');
    setCurrentInput(''); // Clear the input field

    try {
      // 1. Perform Keyword-based classification
      const detectedModule = detectModuleFromMessage(currentInput);
      const keywordsSuggestedUI = moduleToUICategory(detectedModule);

      // 2. Determine Actual Suggested UI (based on keywords)
      const actualSuggestedUI = keywordsSuggestedUI;

      // Add the classification results as messages to the chat feed
      const classificationMessages: Message[] = [
        {
          role: 'assistant',
          content: `{"keywords_suggested_ui": "${keywordsSuggestedUI}"}`
        },
        {
          role: 'assistant',
          content: `{"actual_suggested_ui": "${actualSuggestedUI}"}`
        }
      ];

      addMessage(classificationMessages[0], 'main');
      addMessage(classificationMessages[1], 'main');
      setTyping(false, 'main'); // Set typing to false after assistant response

      // Handle module switching based on actual suggested UI (keyword result)
      const targetModule = uiCategoryToModule(actualSuggestedUI);

      if (targetModule !== activeModule) {
        setActiveModule(targetModule, 'main'); // Use context's setActiveModule
      }

    } catch (error) {
      console.error('Error handling user input:', error);
      addMessage({
        role: 'system',
        content: 'An error occurred while processing your request. Please try again later.'
      }, 'main');
      setTyping(false, 'main'); // Ensure typing is off on error
    }
  };

  // Get the current design and template based on active module
  const designKey = activeModule === 'home' ? 'default' : activeModule;
  const currentDesign = getDesignById(designKey);
  const currentTemplate = templates[designKey];
  const LayoutComponent = currentDesign.LayoutComponent;
  
  // Get the background component for the current design
  const BackgroundComponent = currentDesign.BackgroundComponent;
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Content area - scrollable, with dynamic background */}
      <div className={`flex-1 overflow-auto p-4 ${currentDesign.background} relative`}>
        {/* Dynamic background elements */}
        <BackgroundComponent />
        
        {/* Chat messages display area */}
        <div className="mb-4 space-y-4 z-10 relative">
          {messages.map((message, index) => (
            <div key={index} className={`p-3 rounded-lg max-w-xs ${message.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100 mr-auto'}`}>
              <p className="text-sm">{message.content}</p>
            </div>
          ))}
        </div>
        
        {/* Dynamic Layout Component for Topic-Specific UI */}
        <ResponseDisplay
          responses={moduleData}
          template={templates[activeModule] || templates['default']}
        />
      </div>
      
      {/* Input area - fixed at bottom */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky bottom-0 z-10 shadow-md">
        <div className="max-w-3xl mx-auto flex">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleUserInput();
              }
            }}
            placeholder={isTyping ? 'LLM is typing...' : `Ask about ${activeModule === 'home' ? 'travel, hotels, or shopping' : activeModule}...`}
            className={`flex-1 p-2 ${currentDesign.inputStyles.border} rounded-l-md focus:outline-none focus:ring-2 ${currentDesign.inputStyles.focus} dark:bg-gray-700 dark:text-white`}
            disabled={isTyping}
          />
          <button
            onClick={handleUserInput}
            className={`${currentDesign.inputStyles.button} text-white px-4 rounded-r-md transition-colors duration-300`}
            disabled={isTyping}
          >
            Send
          </button>
        </div>
        
        {/* Module selector buttons */}
        <div className="max-w-3xl mx-auto mt-2">
          <div className="grid grid-cols-5 gap-2"> {/* Removed Task Manager button */}
            <button
              onClick={() => setActiveModule('home', 'main')}
              className={`${activeModule === 'home' ? 'border-2 border-blue-500' : ''} bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-xs font-medium p-2 rounded-md transition-colors duration-300 flex items-center justify-center`}
            >
              <span className="material-icons mr-1 text-xs">home</span>
              Home
            </button>
            <button
              onClick={() => setActiveModule('travel', 'main')}
              className={`${activeModule === 'travel' ? 'border-2 border-blue-500' : ''} bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-blue-800 dark:text-blue-300 text-xs font-medium p-2 rounded-md transition-colors duration-300 flex items-center justify-center`}
            >
              <span className="material-icons mr-1 text-xs">flight</span>
              Travel
            </button>
            <button
              onClick={() => setActiveModule('hotel', 'main')}
              className={`${activeModule === 'hotel' ? 'border-2 border-amber-500' : ''} bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-800/50 text-amber-800 dark:text-amber-300 text-xs font-medium p-2 rounded-md transition-colors duration-300 flex items-center justify-center`}
            >
              <span className="material-icons mr-1 text-xs">hotel</span>
              Hotel
            </button>
            <button
              onClick={() => setActiveModule('shopping', 'main')}
              className={`${activeModule === 'shopping' ? 'border-2 border-green-500' : ''} bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-800/50 text-green-800 dark:text-green-300 text-xs font-medium p-2 rounded-md transition-colors duration-300 flex items-center justify-center`}
            >
              <span className="material-icons mr-1 text-xs">shopping_bag</span>
              Shopping
            </button>
            <button
              onClick={() => setActiveModule('forex', 'main')}
              className={`${activeModule === 'forex' ? 'border-2 border-purple-500' : ''} bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-800/50 text-purple-800 dark:text-purple-300 text-xs font-medium p-2 rounded-md transition-colors duration-300 flex items-center justify-center`}
            >
              <span className="material-icons mr-1 text-xs">currency_exchange</span>
              Forex
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;