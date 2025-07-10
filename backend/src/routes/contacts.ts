import express from 'express';
import {
  getContacts,
  createContact,
  getContact,
  deleteContact
} from '../controllers/contactController';

const router = express.Router();

// @route   GET /api/contacts
// @desc    Get all contact submissions
// @access  Admin (for now, public for demo)
router.get('/', getContacts);

// @route   POST /api/contact
// @desc    Create new contact submission
// @access  Public
router.post('/', createContact);

// @route   GET /api/contacts/:id
// @desc    Get single contact submission
// @access  Admin (for now, public for demo)
router.get('/:id', getContact);

// @route   DELETE /api/contacts/:id
// @desc    Delete contact submission
// @access  Admin (for now, public for demo)
router.delete('/:id', deleteContact);

export default router;