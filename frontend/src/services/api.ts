import axios from 'axios';
import {
  Project,
  Client,
  Contact,
  Newsletter,
  ApiResponse,
  ContactFormData,
  NewsletterFormData,
  ProjectFormData,
  ClientFormData,
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Project API
export const projectApi = {
  getAll: async (): Promise<Project[]> => {
    const response = await api.get<ApiResponse<Project[]>>('/projects');
    return response.data.data || [];
  },

  create: async (data: ProjectFormData): Promise<Project> => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await api.post<ApiResponse<Project>>('/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data!;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },
};

// Client API
export const clientApi = {
  getAll: async (): Promise<Client[]> => {
    const response = await api.get<ApiResponse<Client[]>>('/clients');
    return response.data.data || [];
  },

  create: async (data: ClientFormData): Promise<Client> => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('designation', data.designation);
    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await api.post<ApiResponse<Client>>('/clients', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data!;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/clients/${id}`);
  },
};

// Contact API
export const contactApi = {
  getAll: async (): Promise<Contact[]> => {
    const response = await api.get<ApiResponse<Contact[]>>('/contacts');
    return response.data.data || [];
  },

  create: async (data: ContactFormData): Promise<Contact> => {
    const response = await api.post<ApiResponse<Contact>>('/contact', data);
    return response.data.data!;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/contacts/${id}`);
  },
};

// Newsletter API
export const newsletterApi = {
  getAll: async (): Promise<Newsletter[]> => {
    const response = await api.get<ApiResponse<Newsletter[]>>('/subscribers');
    return response.data.data || [];
  },

  subscribe: async (data: NewsletterFormData): Promise<Newsletter> => {
    const response = await api.post<ApiResponse<Newsletter>>('/subscribe', data);
    return response.data.data!;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/subscribers/${id}`);
  },
};

// Utility function to get image URL
export const getImageUrl = (imagePath: string): string => {
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  return `${API_BASE_URL.replace('/api', '')}/uploads/${imagePath}`;
};

export default api;