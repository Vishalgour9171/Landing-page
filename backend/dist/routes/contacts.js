"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactController_1 = require("../controllers/contactController");
const router = express_1.default.Router();
// @route   GET /api/contacts
// @desc    Get all contact submissions
// @access  Admin (for now, public for demo)
router.get('/', contactController_1.getContacts);
// @route   POST /api/contact
// @desc    Create new contact submission
// @access  Public
router.post('/', contactController_1.createContact);
// @route   GET /api/contacts/:id
// @desc    Get single contact submission
// @access  Admin (for now, public for demo)
router.get('/:id', contactController_1.getContact);
// @route   DELETE /api/contacts/:id
// @desc    Delete contact submission
// @access  Admin (for now, public for demo)
router.delete('/:id', contactController_1.deleteContact);
exports.default = router;
