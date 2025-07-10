"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.getContact = exports.createContact = exports.getContacts = void 0;
const Contact_1 = __importDefault(require("../models/Contact"));
// Get all contacts
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: contacts,
            count: contacts.length
        });
    }
    catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
exports.getContacts = getContacts;
// Create new contact submission
const createContact = async (req, res) => {
    try {
        const { fullName, email, mobileNumber, city } = req.body;
        if (!fullName || !email || !mobileNumber || !city) {
            res.status(400).json({
                success: false,
                error: 'Please provide all required fields: fullName, email, mobileNumber, city'
            });
            return;
        }
        const contact = await Contact_1.default.create({
            fullName,
            email,
            mobileNumber,
            city
        });
        res.status(201).json({
            success: true,
            data: contact,
            message: 'Contact form submitted successfully'
        });
    }
    catch (error) {
        console.error('Error creating contact:', error);
        if (error.name === 'ValidationError') {
            res.status(400).json({
                success: false,
                error: error.message
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
exports.createContact = createContact;
// Get single contact
const getContact = async (req, res) => {
    try {
        const contact = await Contact_1.default.findById(req.params.id);
        if (!contact) {
            res.status(404).json({
                success: false,
                error: 'Contact not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: contact
        });
    }
    catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
exports.getContact = getContact;
// Delete contact
const deleteContact = async (req, res) => {
    try {
        const contact = await Contact_1.default.findByIdAndDelete(req.params.id);
        if (!contact) {
            res.status(404).json({
                success: false,
                error: 'Contact not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: {}
        });
    }
    catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
exports.deleteContact = deleteContact;
