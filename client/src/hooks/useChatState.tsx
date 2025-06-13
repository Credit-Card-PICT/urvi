import { useState } from 'react';
import { Message, ModuleType } from '../types';

export const useChatState = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeModule, setActiveModule] = useState<ModuleType>('home');
  const [isTyping, setTyping] = useState(false);

  const addMessage = (message: Message) => {
    setMessages(prevMessages => [...prevMessages, message]);
    
    // Update the active module if the message specifies a module type
    if (message.moduleType) {
      setActiveModule(message.moduleType);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    activeModule,
    isTyping,
    addMessage,
    setActiveModule,
    setTyping,
    clearMessages
  };
};
