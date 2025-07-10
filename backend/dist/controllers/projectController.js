"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.getProject = exports.createProject = exports.getProjects = void 0;
const Project_1 = __importDefault(require("../models/Project"));
// Get all projects
const getProjects = async (req, res) => {
    try {
        const projects = await Project_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: projects,
            count: projects.length
        });
    }
    catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
exports.getProjects = getProjects;
// Create new project
const createProject = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        if (!name || !description || !image) {
            res.status(400).json({
                success: false,
                error: 'Please provide name, description, and image'
            });
            return;
        }
        const project = await Project_1.default.create({
            name,
            description,
            image
        });
        res.status(201).json({
            success: true,
            data: project
        });
    }
    catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
exports.createProject = createProject;
// Get single project
const getProject = async (req, res) => {
    try {
        const project = await Project_1.default.findById(req.params.id);
        if (!project) {
            res.status(404).json({
                success: false,
                error: 'Project not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: project
        });
    }
    catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
exports.getProject = getProject;
// Update project
const updateProject = async (req, res) => {
    try {
        const project = await Project_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!project) {
            res.status(404).json({
                success: false,
                error: 'Project not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: project
        });
    }
    catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
exports.updateProject = updateProject;
// Delete project
const deleteProject = async (req, res) => {
    try {
        const project = await Project_1.default.findByIdAndDelete(req.params.id);
        if (!project) {
            res.status(404).json({
                success: false,
                error: 'Project not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: {}
        });
    }
    catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
exports.deleteProject = deleteProject;
