import { ResponseItem } from './types';

export const forexResponses: ResponseItem[] = [
  {
    id: 1,
    type: 'text',
    content: 'Based on your preferences for low-risk investments, here are some recommended forex exchange strategies and pairs:'
  },
  {
    id: 2,
    type: 'card',
    content: 'EUR/USD Pair Analysis',
    features: [
      'Current exchange rate: 1.0921',
      'Trend: Upward momentum with strong support at 1.0850',
      'Volatility: Low to moderate',
      'Recommended position: Long with stop-loss at 1.0800'
    ]
  },
  {
    id: 3,
    type: 'card',
    content: 'GBP/USD Pair Analysis',
    features: [
      'Current exchange rate: 1.2534',
      'Trend: Consolidation phase after recent pullback',
      'Volatility: Moderate',
      'Recommended position: Wait for breakout above 1.2600'
    ]
  },
  {
    id: 4,
    type: 'product',
    content: 'Managed Forex Account - Conservative Strategy',
    price: '$5,000 min. investment',
    discount: '1.5% management fee',
    features: [
      'Professional management of your forex portfolio',
      'Focus on major currency pairs',
      'Risk-adjusted position sizing',
      'Regular performance reports'
    ]
  },
  {
    id: 5,
    type: 'product',
    content: 'Forex Signals Subscription - Premium Plan',
    price: '$99/month',
    discount: '20% OFF annual plan',
    features: [
      'Daily trading signals for major and minor pairs',
      'Real-time alerts via email and mobile app',
      'Detailed analysis with entry, target and stop levels',
      'Weekly market outlook'
    ]
  },
  {
    id: 6,
    type: 'card',
    content: 'USD/JPY Pair Analysis',
    features: [
      'Current exchange rate: 113.84',
      'Trend: Strong uptrend with resistance at 114.50',
      'Volatility: Moderate to high',
      'Recommended position: Consider profit-taking near resistance'
    ]
  },
  {
    id: 7,
    type: 'text',
    content: 'For beginners in forex trading, I recommend focusing on major currency pairs like EUR/USD, GBP/USD, and USD/JPY as they typically have tighter spreads and more predictable behavior.'
  },
  {
    id: 8,
    type: 'card',
    content: 'Risk Management Tips',
    features: [
      'Limit exposure to 1-2% of trading capital per position',
      'Always use stop-loss orders to protect your investment',
      'Consider scaling in and out of positions rather than all-in entries',
      'Keep a trading journal to track performance and improve strategy'
    ]
  }
];