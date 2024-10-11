/* eslint-disable no-unused-vars */
// CreateLegalResources

import React, { useState } from 'react';
import axios from 'axios';
import { LEGAL_RESOURCES_API_END_POINT } from '../../utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const CreateLegalResources = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    type: 'court_order', // Default selection
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${LEGAL_RESOURCES_API_END_POINT}/create`, formData, {
        withCredentials: true,
      });
      if (res.data) {
        toast.success('Legal Resource added successfully');
        navigate('/legal-resources'); // Redirect to legal resources page after successful creation
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add resource');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Add Legal Resource</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Enter the title"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full"
            rows="4"
            placeholder="Enter the description"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Link</label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Enter the resource link"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="court_order">Court Order</option>
            <option value="article">Article</option>
            <option value="law">Law</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Resource'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLegalResources;
