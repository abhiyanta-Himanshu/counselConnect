/* eslint-disable no-unused-vars */
import axios from 'axios';
import React from 'react'

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { LAWYER_API_END_POINT, USER_API_END_POINT } from '../../utils/constant';
import { setUser } from '../../redux/authslice';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const initialFormState = {
        name: user?.name || '',
        email: user?.email || '',
        specialization: user?.specialization || '',
        experience: user?.experience || '',
        location: {
            city: user?.location?.city || '',
            state: user?.location?.state || '',
        },
        contact_number: user?.contact_number || '',
        biography: user?.biography || '',
        file: null,
        availability: user?.availability || [{ day: '', from: '', to: '' }],
    };
    const [form, setForm] = useState(initialFormState);

    // Local state for availability
    const [availability, setAvailability] = useState(form.availability);


    // Handle availability change
    const handleAvailabilityChange = (index, e) => {
        const { name, value } = e.target;
        const updatedAvailability = [...form.availability];
        updatedAvailability[index][name] = value;
        setForm({ ...form, availability: updatedAvailability });
    };

    // Add new availability entry
    const addAvailability = () => {
        setAvailability([...availability, { day: '', from: '', to: '' }]);
    };

    // Remove availability entry
    const removeAvailability = (index) => {
        const updatedAvailability = availability.filter((_, i) => i !== index);
        setAvailability(updatedAvailability);
    };

    //handle input change
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') {
            setForm({ ...form, file: files[0] });
        } else if (name === 'city' || name === 'state') {
            setForm({
                ...form,
                location: {
                    ...form.location,
                    [name]: value // Update only city or state
                }
            });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        // Append each form field to FormData
        formData.append('name', form.name);
        formData.append('email', form.email);
        formData.append('specialization', form.specialization);
        formData.append('experience', form.experience);
        formData.append('contact_number', form.contact_number);
        formData.append('biography', form.biography);

        // Append the location fields separately
        formData.append('city', form.location.city);
        formData.append('state', form.location.state);

        // Append the availability as a JSON string or individual entries
        form.availability.forEach((item, index) => {
            formData.append(`availability[${index}][day]`, item.day);
            formData.append(`availability[${index}][from]`, item.from);
            formData.append(`availability[${index}][to]`, item.to);
        });

        // Append the file if it's selected
        if (form.file) {
            formData.append('file', form.file);
        }
        // Object.keys(form).forEach((key) => {
        //     if (key === 'availability') {
        //         form.availability.forEach((item, index) => {
        //             formData.append(`availability[${index}][day]`, item.day);
        //             formData.append(`availability[${index}][from]`, item.from);
        //             formData.append(`availability[${index}][to]`, item.to);
        //         });
        //     } else if (key === 'location') {
        //         // Append city and state separately
        //         formData.append('city', form.location.city);
        //         formData.append('state', form.location.state);
        //     } else if (key === 'file') {
        //         // Append the file directly
        //         formData.append('file', formData.file);
        //     } else {
        //         formData.append(key, formData[key]);
        //     }
        // });

        const res = await axios.put(`${LAWYER_API_END_POINT}/profile/update`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        })
        console.log(res.data)

    }

    return (
        <section className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">Edit Your Profile</h1>

            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-4">
                <div>
                    <label className="block text-lg font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name='name'
                        value={form.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name='email'
                        value={form.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700">Specialization</label>
                    <input
                        type="text"
                        name='specialization'
                        value={form.specialization}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700">Experience</label>
                    <input
                        type="number"
                        name='experience'
                        value={form.experience}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700">Contact Number</label>
                    <input
                        type="text"
                        name='contact_number'
                        value={form.contact_number}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                <div>
                    {/* <label className="block text-lg font-medium text-gray-700">Location</label> */}
                    <label className="block text-lg font-medium text-gray-700">City</label>
                    <input
                        type="text"
                        name='city'
                        value={form.location.city}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <label className="block text-lg font-medium text-gray-700">State</label>
                    <input
                        type="text"
                        name='state'
                        value={form.location.state}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />

                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700">Biography</label>
                    <input
                        type="text"
                        name='biography'
                        value={form.biography}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                {/* Availability section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Availability</h3>
                    {availability.map((slot, index) => (
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


                <div>
                    <label className="block text-lg font-medium text-gray-700">Profile Picture</label>
                    <input
                        type="file"
                        name='file'
                        onChange={handleChange}
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
