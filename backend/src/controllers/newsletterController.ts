import { Request, Response } from 'express';
import Newsletter from '../models/Newsletter';

// Get all newsletter subscribers
export const getSubscribers = async (req: Request, res: Response): Promise<void> => {
  try {
    const subscribers = await Newsletter.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: subscribers,
      count: subscribers.length
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Subscribe to newsletter
export const subscribe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        error: 'Please provide email address'
      });
      return;
    }

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });
    
    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        res.status(400).json({
          success: false,
          error: 'Email is already subscribed to newsletter'
        });
        return;
      } else {
        // Reactivate subscription
        existingSubscriber.isActive = true;
        await existingSubscriber.save();
        
        res.status(200).json({
          success: true,
          data: existingSubscriber,
          message: 'Newsletter subscription reactivated successfully'
        });
        return;
      }
    }

    const subscriber = await Newsletter.create({ email });

    res.status(201).json({
      success: true,
      data: subscriber,
      message: 'Successfully subscribed to newsletter'
    });
  } catch (error: any) {
    console.error('Error subscribing to newsletter:', error);
    if (error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        error: error.message
      });
    } else if (error.code === 11000) {
      res.status(400).json({
        success: false,
        error: 'Email is already subscribed to newsletter'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// Unsubscribe from newsletter
export const unsubscribe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        error: 'Please provide email address'
      });
      return;
    }

    const subscriber = await Newsletter.findOne({ email });

    if (!subscriber) {
      res.status(404).json({
        success: false,
        error: 'Email not found in newsletter subscriptions'
      });
      return;
    }

    subscriber.isActive = false;
    await subscriber.save();

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Delete subscriber (admin only)
export const deleteSubscriber = async (req: Request, res: Response): Promise<void> => {
  try {
    const subscriber = await Newsletter.findByIdAndDelete(req.params.id);

    if (!subscriber) {
      res.status(404).json({
        success: false,
        error: 'Subscriber not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};