"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.getClient = exports.createClient = exports.getClients = void 0;
const Client_1 = __importDefault(require("../models/Client"));
// Get all clients
const getClients = async (req, res) => {
    try {
        const clients = await Client_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: clients,
            count: clients.length
        });
    }
    catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
exports.getClients = getClients;
// Create new client
const createClient = async (req, res) => {
    try {
        const { name, description, designation, image } = req.body;
        if (!name || !description || !designation || !image) {
            res.status(400).json({
                success: false,
                error: 'Please provide name, description, designation, and image'
            });
            return;
        }
        const client = await Client_1.default.create({
            name,
            description,
            designation,
            image
        });
        res.status(201).json({
            success: true,
            data: client
        });
    }
    catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
exports.createClient = createClient;
// Get single client
const getClient = async (req, res) => {
    try {
        const client = await Client_1.default.findById(req.params.id);
        if (!client) {
            res.status(404).json({
                success: false,
                error: 'Client not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: client
        });
    }
    catch (error) {
        console.error('Error fetching client:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
exports.getClient = getClient;
// Update client
const updateClient = async (req, res) => {
    try {
        const client = await Client_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!client) {
            res.status(404).json({
                success: false,
                error: 'Client not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: client
        });
    }
    catch (error) {
        console.error('Error updating client:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
exports.updateClient = updateClient;
// Delete client
const deleteClient = async (req, res) => {
    try {
        const client = await Client_1.default.findByIdAndDelete(req.params.id);
        if (!client) {
            res.status(404).json({
                success: false,
                error: 'Client not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: {}
        });
    }
    catch (error) {
        console.error('Error deleting client:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
exports.deleteClient = deleteClient;
