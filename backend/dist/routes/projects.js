"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const upload_1 = require("../middleware/upload");
const router = express_1.default.Router();
// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', projectController_1.getProjects);
// @route   POST /api/projects
// @desc    Create new project
// @access  Admin (for now, public for demo)
router.post('/', upload_1.upload.single('image'), upload_1.processImage, projectController_1.createProject);
// @route   GET /api/projects/:id
// @desc    Get single project
// @access  Public
router.get('/:id', projectController_1.getProject);
// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Admin (for now, public for demo)
router.put('/:id', upload_1.upload.single('image'), upload_1.processImage, projectController_1.updateProject);
// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Admin (for now, public for demo)
router.delete('/:id', projectController_1.deleteProject);
exports.default = router;
