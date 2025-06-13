import { ResponseItem } from './types';

export const shoppingResponses: ResponseItem[] = [
  { 
    id: 1, 
    type: 'text', 
    content: 'Based on your browsing history and preferences, here are some exclusive tech deals you might be interested in:'
  },
  { 
    id: 2, 
    type: 'product', 
    content: 'Noise ColorFit Pro 5 Smartwatch',
    price: '₹1,999',
    discount: '5% cashback on SBI cards + Exchange offer',
    features: ['Always-on AMOLED display', 'Health & fitness tracking', '7-day battery life', 'Available on Amazon'] 
  },
  { 
    id: 3, 
    type: 'product', 
    content: 'JBL Tune 230NC TWS Earbuds',
    price: '₹2,699',
    discount: '₹1,300 off with HDFC Bank',
    features: ['Active noise cancellation', '40h total battery life', 'IPX4 water resistance', 'Available on Flipkart'] 
  },
  { 
    id: 4, 
    type: 'product', 
    content: 'Tech Essentials Combo Pack',
    price: '₹899',
    discount: 'Deal of the Day - 45% off',
    features: ['65W GaN charger', 'Braided USB-C cable', 'Phone stand', 'Available on Amazon'] 
  },
];