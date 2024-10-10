/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { LAWYER_API_END_POINT } from '../../utils/constant';

import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const LawyerSignup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        specialization: '',
        experience: '',
        location: {
            city: '',
            state: '',
        },
        contact_number: '',
        biography: '',
        file: null,
        availability: [{ day: '', from: '', to: '' }],
    });

    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') {
            setFormData({ ...formData, file: files[0] });
        } else if (name === 'city' || name === 'state') {
            setFormData({
                ...formData,
                location: {
                    ...formData.location,
                    [name]: value // Update only city or state
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Handle availability change
    const handleAvailabilityChange = (index, e) => {
        const { name, value } = e.target;
        const updatedAvailability = [...formData.availability];
        updatedAvailability[index][name] = value;
        setFormData({ ...formData, availability: updatedAvailability });
    };

    // Add new availability entry
    const addAvailability = () => {
        setFormData({
            ...formData,
            availability: [...formData.availability, { day: '', from: '', to: '' }],
        });
    };

    // Remove availability entry
    const removeAvailability = (index) => {
        const updatedAvailability = formData.availability.filter((_, i) => i !== index);
        setFormData({ ...formData, availability: updatedAvailability });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const signupFormData = new FormData();
            Object.keys(formData).forEach((key) => {
                if (key === 'availability') {
                    // signupFormData.append(key, JSON.stringify(formData[key]));
                    formData.availability.forEach((item, index) => {
                        signupFormData.append(`availability[${index}][day]`, item.day);
                        signupFormData.append(`availability[${index}][from]`, item.from);
                        signupFormData.append(`availability[${index}][to]`, item.to);
                    });
                } else if (key === 'location') {
                    // Append city and state separately
                    signupFormData.append('city', formData.location.city);
                    signupFormData.append('state', formData.location.state);
                } else if (key === 'file') {
                    // Append the file directly
                    signupFormData.append('file', formData.file);
                } else {
                    signupFormData.append(key, formData[key]);
                }
            });
            //console.log(signupFormData)
            // for (let [key, value] of signupFormData.entries()) {
            //     console.log(`${key}: ${value}`);
            // }

            const res = await axios.post(`${LAWYER_API_END_POINT}/register`, signupFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            console.log(res.data);
            if (res.data.success) {
                navigate('/lawyer/login')
                toast.success(res.data.message)
            }
        } catch (error) {
            console.error(error.response?.data || error.message);
            toast.error(error.response.data.message || "An error occured")
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-6">Lawyer Signup</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border"
                    required
                />
                <input
                    type="text"
                    name="specialization"
                    placeholder="Specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full p-2 border"
                    required
                />
                <input
                    type="number"
                    name="experience"
                    placeholder="Years of Experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full p-2 border"
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.location.city}
                    onChange={handleChange}
                    className="w-full p-2 border"
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.location.state}
                    onChange={handleChange}
                    className="w-full p-2 border"
                />
                <input
                    type="text"
                    name="contact_number"
                    placeholder="Contact Number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    className="w-full p-2 border"
                />
                <textarea
                    name="biography"
                    placeholder="Biography"
                    value={formData.biography}
                    onChange={handleChange}
                    className="w-full p-2 border"
                />

                {/* Availability section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Availability</h3>
                    {formData.availability.map((slot, index) => (
                        <div key={index} className="flex space-x-4">
                            <input
                                type="text"
                                name="day"
                                placeholder="Day"
                                value={slot.day}
                                onChange={(e) => handleAvailabilityChange(index, e)}
                                className="w-full p-2 border"
                            />
                            <input
                                type="time"
                                name="from"
                                placeholder="From"
                                value={slot.from}
                                onChange={(e) => handleAvailabilityChange(index, e)}
                                className="w-full p-2 border"
                            />
                            <input
                                type="time"
                                name="to"
                                placeholder="To"
                                value={slot.to}
                                onChange={(e) => handleAvailabilityChange(index, e)}
                                className="w-full p-2 border"
                            />
                            <button
                                type="button"
                                onClick={() => removeAvailability(index)}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addAvailability}
                        className="bg-blue-600 text-white p-2 rounded"
                    >
                        Add Availability
                    </button>
                </div>

                <input
                    type="file"
                    name="file"
                    onChange={handleChange}
                    className="w-full p-2 border"
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                    Signup
                </button>
            </form>
            <p
                className='text-sm font-semibold my-2'
            >
                Have an account... <Link
                    className='text-blue-600'
                    to={'/lawyer/login'}>LOGIN here</Link>
            </p>
        </div>
    );
};

export default LawyerSignup;
