import express from 'express';
import {
  getSubscribers,
  subscribe,
  unsubscribe,
  deleteSubscriber
} from '../controllers/newsletterController';

const router = express.Router();

// @route   GET /api/subscribers
// @desc    Get all newsletter subscribers
// @access  Admin (for now, public for demo)
router.get('/', getSubscribers);

// @route   POST /api/subscribe
// @desc    Subscribe to newsletter
// @access  Public
router.post('/', subscribe);

// @route   POST /api/unsubscribe
// @desc    Unsubscribe from newsletter
// @access  Public
router.post('/unsubscribe', unsubscribe);

// @route   DELETE /api/subscribers/:id
// @desc    Delete newsletter subscriber
// @access  Admin (for now, public for demo)
router.delete('/:id', deleteSubscriber);

export default router;