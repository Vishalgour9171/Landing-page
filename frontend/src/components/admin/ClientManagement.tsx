import React, { useState, useEffect } from 'react';
import { Client, ClientFormData } from '../../types';
import { clientApi, getImageUrl } from '../../services/api';

const ClientManagement: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    description: '',
    designation: '',
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const data = await clientApi.getAll();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setMessage({ type: 'error', text: 'Failed to fetch clients' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.designation || !formData.image) {
      setMessage({ type: 'error', text: 'Please fill in all fields and select an image.' });
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage(null);
      
      await clientApi.create(formData);
      
      setMessage({ type: 'success', text: 'Client added successfully!' });
      setFormData({
        name: '',
        description: '',
        designation: '',
        image: null,
      });
      
      // Reset file input
      const fileInput = document.getElementById('clientImage') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      // Refresh clients list
      fetchClients();
    } catch (error) {
      console.error('Error creating client:', error);
      setMessage({ type: 'error', text: 'Failed to add client. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this client?')) {
      return;
    }

    try {
      await clientApi.delete(id);
      setClients(clients.filter(client => client._id !== id));
      setMessage({ type: 'success', text: 'Client deleted successfully!' });
    } catch (error) {
      console.error('Error deleting client:', error);
      setMessage({ type: 'error', text: 'Failed to delete client.' });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Client Management</h2>
        
        {/* Add Client Form */}
        <div className="card mb-8">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Client</h3>
            
            {message && (
              <div
                className={`p-4 rounded-md mb-4 ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter client name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-2">
                    Designation *
                  </label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter client designation"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Testimonial/Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Enter client testimonial or description"
                  required
                />
              </div>

              <div>
                <label htmlFor="clientImage" className="block text-sm font-medium text-gray-700 mb-2">
                  Client Image *
                </label>
                <input
                  type="file"
                  id="clientImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Adding...' : 'Add Client'}
              </button>
            </form>
          </div>
        </div>

        {/* Clients List */}
        <div className="card">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Existing Clients</h3>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading clients...</p>
              </div>
            ) : clients.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No clients found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map((client) => (
                  <div key={client._id} className="border rounded-lg overflow-hidden">
                    <div className="p-4 text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                        <img
                          src={getImageUrl(client.image)}
                          alt={client.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://via.placeholder.com/80x80/e5e7eb/6b7280?text=${encodeURIComponent(client.name.charAt(0))}`;
                          }}
                        />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{client.name}</h4>
                      <p className="text-primary-600 font-medium text-sm mb-2">{client.designation}</p>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">"{client.description}"</p>
                      <button
                        onClick={() => handleDelete(client._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientManagement;