import express from 'express';
import TaskSession from '../models/TaskSession.ts';

const router = express.Router();

// Save a new session
router.post('/session', async (req, res) => {
  try {
    const session = new TaskSession(req.body);
    await session.save();
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all sessions
router.get('/sessions', async (_req, res) => {
  try {
    const sessions = await TaskSession.find();
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router; 