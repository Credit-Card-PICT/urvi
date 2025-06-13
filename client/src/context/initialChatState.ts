import { Message, ModuleType } from '../types';

// Create a system message for initial greeting
const welcomeMessage: Message = {
  role: 'assistant',
  content: 'Hi there! 👋 I\'m your Smart Lifestyle Assistant. I can help you find the perfect credit card, book flights, discover hotels, or find shopping deals. What would you like help with today?',
  moduleType: 'home'
};

// Initial state without hooks
export const initialMessages: Message[] = [welcomeMessage];
export const initialActiveModule: ModuleType = 'home';
export const initialIsTyping: boolean = false;