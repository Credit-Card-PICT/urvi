import { ResponseItem } from './types';

export const defaultResponses: ResponseItem[] = [
  { 
    id: 1, 
    type: 'text', 
    content: 'Welcome to SmartRecommend! 👋 I\'m your intelligent lifestyle assistant.'
  },
  { 
    id: 2, 
    type: 'text', 
    content: 'I can help you find the perfect recommendations tailored to your needs. Just ask me about:'
  },
  { 
    id: 3, 
    type: 'text', 
    content: '• Flights and travel itineraries\n• Premium hotel bookings\n• Exclusive shopping deals\n• Credit card recommendations' 
  },
  {
    id: 4,
    type: 'text',
    content: 'What would you like assistance with today?'
  }
];