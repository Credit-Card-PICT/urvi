import { ResponseItem } from './types';

export const hotelResponses: ResponseItem[] = [
  { 
    id: 1, 
    type: 'text', 
    content: 'I\'ve found these top-rated hotels matching your preferences for luxury and location:'
  },
  { 
    id: 2, 
    type: 'card', 
    content: 'Lemon Tree Resort, Goa',
    price: '₹4,800/night',
    rating: 4.2,
    location: 'North Goa Beach area',
    discount: 'Free breakfast + Airport transfer',
    features: ['Beachfront view', 'Free WiFi', 'Rooftop infinity pool', 'Spa services'] 
  },
  { 
    id: 3, 
    type: 'card', 
    content: 'Taj Palace, Mumbai',
    price: '₹12,000/night',
    rating: 4.9,
    location: 'Marine Drive, Mumbai',
    discount: '25% off with ICICI credit cards',
    features: ['5-star luxury', 'Award-winning spa', 'Sea view rooms', 'Fine dining'] 
  },
  { 
    id: 4, 
    type: 'card', 
    content: 'FabHotel Executive, Pune',
    price: '₹2,500/night',
    rating: 3.8,
    location: 'Central Pune, near IT hub',
    discount: 'Budget-friendly option',
    features: ['Clean modern rooms', 'High-speed WiFi', 'Business center', '24/7 room service'] 
  },
];