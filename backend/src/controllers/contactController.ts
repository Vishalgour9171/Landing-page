import { Request, Response } from 'express';
import Contact from '../models/Contact';

// Get all contacts
export const getContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: contacts,
      count: contacts.length
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Create new contact submission
export const createContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, mobileNumber, city } = req.body;

    if (!fullName || !email || !mobileNumber || !city) {
      res.status(400).json({
        success: false,
        error: 'Please provide all required fields: fullName, email, mobileNumber, city'
      });
      return;
    }

    const contact = await Contact.create({
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
  } catch (error: any) {
    console.error('Error creating contact:', error);
    if (error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        error: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// Get single contact
export const getContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.findById(req.params.id);

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
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Delete contact
export const deleteContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

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
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};