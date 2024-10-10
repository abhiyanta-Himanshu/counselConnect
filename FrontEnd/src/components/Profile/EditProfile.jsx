/* eslint-disable no-unused-vars */
import axios from 'axios';
import React from 'react'

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '../../utils/constant';
import { setUser } from '../../redux/authslice';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // Local state to handle form inputs
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [contactNumber, setContactNumber] = useState(user?.contact_number || '');
  const [profile_pic, setProfile_pic] = useState(null); // For file upload

//   useEffect(() => {
//     if (user) {
//       setName(user.name);
//       setEmail(user.email);
//       setContactNumber(user.contact_number);
//     }
//   }, [user]);

  const handleFileChange = (e) => {
    setProfile_pic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('contact_number', contactNumber);
    if (profile_pic) {
      formData.append('file', profile_pic);
    }

    // Dispatch action to update profile
    try {
        const res = await axios.put(`${USER_API_END_POINT}/profile/update`,formData,{
            headers : {
                'Content-Type' : 'multipart/form-data'
            },
            withCredentials : true
        })
        if(res.data.success) {
            dispatch(setUser(res.data.user))
            toast.success(res.data.message)
            navigate('/profile')
        }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }    
  };

  return (
    <section className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Edit Your Profile</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Contact Number</label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Profile Picture</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500"
        >
          Save Changes
        </button>
      </form>
    </section>
  );
};

export default EditProfile;
