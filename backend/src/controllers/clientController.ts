import { Request, Response } from 'express';
import Client from '../models/Client';

// Get all clients
export const getClients = async (req: Request, res: Response): Promise<void> => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: clients,
      count: clients.length
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Create new client
export const createClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, designation, image } = req.body;

    if (!name || !description || !designation || !image) {
      res.status(400).json({
        success: false,
        error: 'Please provide name, description, designation, and image'
      });
      return;
    }

    const client = await Client.create({
      name,
      description,
      designation,
      image
    });

    res.status(201).json({
      success: true,
      data: client
    });
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get single client
export const getClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const client = await Client.findById(req.params.id);

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
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Update client
export const updateClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

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
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Delete client
export const deleteClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

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
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};