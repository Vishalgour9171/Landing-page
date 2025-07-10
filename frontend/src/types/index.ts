export interface Project {
  _id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  _id: string;
  name: string;
  description: string;
  designation: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  _id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  city: string;
  createdAt: string;
  updatedAt: string;
}

export interface Newsletter {
  _id: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
  error?: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  mobileNumber: string;
  city: string;
}

export interface NewsletterFormData {
  email: string;
}

export interface ProjectFormData {
  name: string;
  description: string;
  image: File | null;
}

export interface ClientFormData {
  name: string;
  description: string;
  designation: string;
  image: File | null;
}