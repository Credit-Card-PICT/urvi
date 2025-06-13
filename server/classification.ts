import { Request, Response, NextFunction } from 'express';

// Define valid categories
const VALID_CATEGORIES = ['flights', 'hotels', 'shopping', 'default'];

export interface ClassificationResponse {
  suggested_ui: string;
}

// Simple keyword-based classification
export const classifyQuery = async (query: string): Promise<ClassificationResponse> => {
  const lowerQuery = query.toLowerCase();
  
  // Flight/Travel keywords
  const flightKeywords = ['flight', 'flights', 'fly', 'air', 'airline', 'travel', 
    'trip', 'journey', 'plane', 'booking', 'airport', 'departure', 'arrival'];
  
  // Hotel keywords
  const hotelKeywords = ['hotel', 'stay', 'room', 'accommodation', 'resort', 'motel', 
    'inn', 'lodge', 'booking', 'reservation', 'hostel', 'apartment'];
  
  // Shopping keywords
  const shoppingKeywords = ['buy', 'purchase', 'shop', 'shopping', 'product', 'item', 
    'clothes', 'electronics', 'order', 'cart', 'checkout', 'store', 'price', 'cost'];
  
  // Check for earliest match
  let earliestMatch = { ui: 'default', position: Infinity };
  
  for (const keyword of flightKeywords) {
    const position = lowerQuery.indexOf(keyword);
    if (position !== -1 && position < earliestMatch.position) {
      earliestMatch = { ui: 'flights', position };
    }
  }
  
  for (const keyword of hotelKeywords) {
    const position = lowerQuery.indexOf(keyword);
    if (position !== -1 && position < earliestMatch.position) {
      earliestMatch = { ui: 'hotel', position };
    }
  }
  
  for (const keyword of shoppingKeywords) {
    const position = lowerQuery.indexOf(keyword);
    if (position !== -1 && position < earliestMatch.position) {
      earliestMatch = { ui: 'shopping', position };
    }
  }
  
  return { suggested_ui: earliestMatch.ui };
};

// Express middleware
export async function classificationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const query = req.query.q as string;
    
    if (!query) {
      return next();
    }

    const classification = await classifyQuery(query);
    
    // Add classification to request object for use in routes
    (req as any).classification = classification;
    
    // If this is an API request, send the classification response
    if (req.path.startsWith('/api')) {
      return res.json(classification);
    }
    
    next();
  } catch (error) {
    console.error('Middleware error:', error);
    next();
  }
} 