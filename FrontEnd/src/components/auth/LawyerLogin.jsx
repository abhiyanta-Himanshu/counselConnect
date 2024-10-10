/* eslint-disable no-unused-vars */
import React from 'react'

import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LAWYER_API_END_POINT } from '../../utils/constant';
import { setType, setUser } from '../../redux/authslice';
import { toast } from 'sonner';

const LawyerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${LAWYER_API_END_POINT}/login`, {
        email : email,
        password : password,
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.lawyer));
        dispatch(setType("lawyer"));
        toast.success(res.data.message);
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred');
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Lawyer Login</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Login
        </button>
        <p className='text-sm font-semibold'>
          Didn&apos;t have an account? <Link to={'/lawyer/signup'} className='text-blue-700'> Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LawyerLogin;
