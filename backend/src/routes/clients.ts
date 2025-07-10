import express from 'express';
import {
  getClients,
  createClient,
  getClient,
  updateClient,
  deleteClient
} from '../controllers/clientController';
import { upload, processImage } from '../middleware/upload';

const router = express.Router();

// @route   GET /api/clients
// @desc    Get all clients
// @access  Public
router.get('/', getClients);

// @route   POST /api/clients
// @desc    Create new client
// @access  Admin (for now, public for demo)
router.post('/', upload.single('image'), processImage, createClient);

// @route   GET /api/clients/:id
// @desc    Get single client
// @access  Public
router.get('/:id', getClient);

// @route   PUT /api/clients/:id
// @desc    Update client
// @access  Admin (for now, public for demo)
router.put('/:id', upload.single('image'), processImage, updateClient);

// @route   DELETE /api/clients/:id
// @desc    Delete client
// @access  Admin (for now, public for demo)
router.delete('/:id', deleteClient);

export default router;