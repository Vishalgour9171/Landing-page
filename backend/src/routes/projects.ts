import express from 'express';
import {
  getProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject
} from '../controllers/projectController';
import { upload, processImage } from '../middleware/upload';

const router = express.Router();

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', getProjects);

// @route   POST /api/projects
// @desc    Create new project
// @access  Admin (for now, public for demo)
router.post('/', upload.single('image'), processImage, createProject);

// @route   GET /api/projects/:id
// @desc    Get single project
// @access  Public
router.get('/:id', getProject);

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Admin (for now, public for demo)
router.put('/:id', upload.single('image'), processImage, updateProject);

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Admin (for now, public for demo)
router.delete('/:id', deleteProject);

export default router;