/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react';
import { USER_API_END_POINT } from '../../utils/constant';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

//redux
import {useDispatch, useSelector} from "react-redux"
import { setUser , setLoading, setType} from "../../redux/authslice.js"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const {loading} = useSelector(store=> store.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add login logic here
    const input = {
      email : email,
      password: password
    }
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`,input , {
        headers :{
          "Content-Type" : "application/json"
        },
        withCredentials : true
      })

      if(res.data.success) {
        dispatch(setUser(res.data.user))
        dispatch(setType("user"));
        toast.success(res.data.message);
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false))
    }
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Login
          </button>
          <p className='text-sm font-thin my-3'>
            Didn&apos;t have the account? <Link className='text-blue-700' to={'/signup'}>Register</Link>
          </p>
        </form>
        <p
        className='my-10 font-semibold text-sm text-center'
        >
          Are u a lawyer? 
          <div className='flex justify-evenly my-3'>
          <Link className='text-blue-600' to={'/lawyer/signup'}>Register Here...</Link> 
           
          <Link className='text-blue-600' to={'/lawyer/login'}>Login Here...</Link>
          </div>
          
        </p>
      </div>
    </div>
  );
};

export default Login;
