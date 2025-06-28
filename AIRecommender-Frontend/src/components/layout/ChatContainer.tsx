import React, { useRef, useEffect } from 'react';
import HomeModule from '../modules/HomeModule';
import TravelModule from '../modules/TravelModule';
import HotelModule from '../modules/HotelModule';
import ShoppingModule from '../modules/ShoppingModule';
import TypingIndicator from '../shared/TypingIndicator';
import UserMessage from '../shared/UserMessage';
import { useChatContext } from '@/context/ChatContext';

const ChatContainer: React.FC = () => {
  const { messages, activeModule, isTyping } = useChatContext();
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Get background class based on active module
  const getBackgroundClass = () => {
    switch (activeModule) {
      case 'travel':
        return 'travel-theme';
      case 'hotel':
        return 'hotel-theme';
      case 'shopping':
        return 'shopping-theme';
      default:
        return 'home-theme';
    }
  };

  return (
    <main className={`flex-1 overflow-hidden relative ${getBackgroundClass()}`}>
      <div className="container mx-auto h-full flex flex-col relative z-10">
        <div className="chat-container overflow-y-auto py-6 px-4 md:px-0">
          <div className="max-w-3xl mx-auto">
            {/* Render messages and modules */}
            {messages.map((message, index) => {
              if (message.role === 'user') {
                return <UserMessage key={index} content={message.content} />;
              } else if (message.role === 'assistant' && message.moduleType) {
                switch (message.moduleType) {
                  case 'home':
                    return <HomeModule key={index} />;
                  case 'travel':
                    return <TravelModule key={index} />;
                  case 'hotel':
                    return <HotelModule key={index} />;
                  case 'shopping':
                    return <ShoppingModule key={index} />;
                  default:
                    return null;
                }
              }
              return null;
            })}

            {/* If there are no messages, show the default module */}
            {messages.length === 0 && <HomeModule />}

            {/* Show typing indicator if typing */}
            {isTyping && <TypingIndicator />}

            {/* Invisible element for auto-scroll */}
            <div ref={chatEndRef} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChatContainer;
