import { ResponseItem } from './types';

export const travelResponses: ResponseItem[] = [
  { 
    id: 1, 
    type: 'text', 
    content: 'Based on your search criteria, I\'ve found these flight options from Mumbai:' 
  },
  { 
    id: 2, 
    type: 'card', 
    content: 'Mumbai to Delhi',
    price: '₹3,500',
    discount: '10% off on Axis Card',
    features: ['2h 10m', 'Available tomorrow', 'Direct Flight']
  },
  { 
    id: 3, 
    type: 'card', 
    content: 'Mumbai to Goa',
    price: '₹4,200',
    discount: 'Flat ₹500 off with HDFC',
    features: ['1h 30m', 'Weekend special', 'Morning departure'] 
  },
  { 
    id: 4, 
    type: 'card', 
    content: 'Business class to Bangalore',
    price: '₹9,800',
    discount: '20% off on Amex',
    features: ['1h 45m', 'Premium experience', 'Lounge access'] 
  },
];