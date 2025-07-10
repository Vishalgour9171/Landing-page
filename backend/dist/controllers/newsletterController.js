"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubscriber = exports.unsubscribe = exports.subscribe = exports.getSubscribers = void 0;
const Newsletter_1 = __importDefault(require("../models/Newsletter"));
// Get all newsletter subscribers
const getSubscribers = async (req, res) => {
    try {
        const subscribers = await Newsletter_1.default.find({ isActive: true }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: subscribers,
            count: subscribers.length
        });
    }
    catch (error) {
        console.error('Error fetching subscribers:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
exports.getSubscribers = getSubscribers;
// Subscribe to newsletter
const subscribe = async (req, res) => {
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
        const existingSubscriber = await Newsletter_1.default.findOne({ email });
        if (existingSubscriber) {
            if (existingSubscriber.isActive) {
                res.status(400).json({
                    success: false,
                    error: 'Email is already subscribed to newsletter'
                });
                return;
            }
            else {
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
        const subscriber = await Newsletter_1.default.create({ email });
        res.status(201).json({
            success: true,
            data: subscriber,
            message: 'Successfully subscribed to newsletter'
        });
    }
    catch (error) {
        console.error('Error subscribing to newsletter:', error);
        if (error.name === 'ValidationError') {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
        else if (error.code === 11000) {
            res.status(400).json({
                success: false,
                error: 'Email is already subscribed to newsletter'
            });
        }
        else {
            res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
};
exports.subscribe = subscribe;
// Unsubscribe from newsletter
const unsubscribe = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({
                success: false,
                error: 'Please provide email address'
            });
            return;
        }
        const subscriber = await Newsletter_1.default.findOne({ email });
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
    }
    catch (error) {
        console.error('Error unsubscribing from newsletter:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
exports.unsubscribe = unsubscribe;
// Delete subscriber (admin only)
const deleteSubscriber = async (req, res) => {
    try {
        const subscriber = await Newsletter_1.default.findByIdAndDelete(req.params.id);
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
    }
    catch (error) {
        console.error('Error deleting subscriber:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
exports.deleteSubscriber = deleteSubscriber;
