"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newsletterController_1 = require("../controllers/newsletterController");
const router = express_1.default.Router();
// @route   GET /api/subscribers
// @desc    Get all newsletter subscribers
// @access  Admin (for now, public for demo)
router.get('/', newsletterController_1.getSubscribers);
// @route   POST /api/subscribe
// @desc    Subscribe to newsletter
// @access  Public
router.post('/', newsletterController_1.subscribe);
// @route   POST /api/unsubscribe
// @desc    Unsubscribe from newsletter
// @access  Public
router.post('/unsubscribe', newsletterController_1.unsubscribe);
// @route   DELETE /api/subscribers/:id
// @desc    Delete newsletter subscriber
// @access  Admin (for now, public for demo)
router.delete('/:id', newsletterController_1.deleteSubscriber);
exports.default = router;
