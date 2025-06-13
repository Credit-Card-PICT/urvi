import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from 'express';
import { classifyQuery } from './classification';

export async function registerRoutes(app: express.Application): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Intent classification API endpoint
  app.post('/api/classify-intent', (req, res) => {
    try {
      const { query } = req.body;
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ 
          error: 'Invalid request. Please provide a query string.' 
        });
      }
      
      // Simple keyword-based classification
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
      
      return res.json({ suggested_ui: earliestMatch.ui });
    } catch (error) {
      console.error('Error classifying intent:', error);
      return res.status(500).json({ 
        error: 'Internal server error occurred while classifying intent.' 
      });
    }
  });

  // API route for classification
  app.get('/api/classify', async (req, res) => {
    const query = req.query.q as string;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }
    
    const classification = await classifyQuery(query);
    res.json(classification);
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
