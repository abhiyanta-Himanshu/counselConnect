/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';

//shadcn
import {toast} from "sonner"

import axios from "axios";
import {USER_API_END_POINT} from "../../utils/constant.js"

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact_number , setContact_number] = useState('')


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add signup logic here
    const formData = new FormData();
    formData.append("name" , name)
    formData.append("email" , email)
    formData.append("password" , password)
    formData.append("contact_number" , contact_number)
    console.log("Name:", name, "Email:", email, "Password:", password, "Contact_number:", contact_number);

    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    try {
      toast("please wait we are registering u")
      const res = await axios.post(`${USER_API_END_POINT}/register`,formData, {
        headers : {
          "Content-Type" : "multipart/form-data"
          // "Content-Type" : "application/json"
        },
        withCredentials : true
      })
      if(res.data.success) {
        navigate('/login')
        toast.success(res.data.message)
      }
      // console.log(res)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contact Number
            </label>
            <input
              type="number"
              id="contact_number"
              className="w-full px-3 py-2 border rounded"
              value={contact_number}
              onChange={(e) => setContact_number(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Signup
          </button>

          <span
              className="text-sm"
            >Already have an account ? <Link to={'/login'} className="text-red-500">Login</Link></span>
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

export default Signup;
