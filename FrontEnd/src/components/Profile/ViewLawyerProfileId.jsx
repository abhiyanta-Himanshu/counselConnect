/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { LAWYER_API_END_POINT } from '../../utils/constant';
import { toast } from 'sonner';

const ViewProfile = () => {

    const [lawyer, setLawyer] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`${LAWYER_API_END_POINT}/${id}`);
                if(res.data.success) {
                    setLawyer(res.data.lawyer)
                    toast.success(res.data.message)
                }
            } catch (error) {
            
                console.log(error)
                toast.error(error.response.data.message)
                return (<>
                <p>Soory Not Available right Now</p>
                </>)
            }
        }
        fetch();
        console.log(lawyer)
    }, [id]);


    return (
        <section className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">{lawyer.name} Profile</h1>
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-6">
                {/* Profile Picture */}
                <div className="w-24 h-24 rounded-full overflow-hidden">
                    <img src={lawyer.profile_pic || "https://github.com/shadcn.png"} alt="Profile" className="w-full h-full object-cover" />
                </div>

                {/* Profile Details */}
                <div>
                    <h2 className="text-xl font-bold mb-2">Profile Details</h2>
                    <p><strong>Name:</strong> {lawyer.name}</p>
                    <p><strong>Email:</strong> {lawyer.email}</p>
                    <p><strong>Contact Number:</strong> {lawyer.contact_number}</p>
                    <p><strong>Specialization</strong> {lawyer.specialization}</p>
                    <p><strong>Experience Years:</strong> {lawyer.experience}</p>
                    <p><strong>Location</strong></p>
                    <p>
                        <span><strong>City:</strong>{lawyer?.location?.city}</span> <span><strong>State:</strong>{lawyer?.location?.state}</span>
                    </p>

                    <p><strong>biography:</strong> {lawyer.biography}</p>
                    <p><strong>Availability:</strong></p>
                    {/* Availability Section */}
                    { lawyer.availability && lawyer.availability.length > 0 ? (
                        lawyer.availability.map((item, index) => (
                            <div key={index} className='flex gap-3'>
                                <p><strong>Day:</strong> {item.day}</p>
                                <p><strong>From:</strong> {item.from}</p>
                                <p><strong>To:</strong> {item.to}</p>
                            </div>
                        ))
                    ) : (
                        <p>No availability information provided.</p>
                    )}

                </div>
            </div>

            {/* Edit Profile Button */}
            <div className="mt-6">
                <Link
                    to={`appointment/book/${lawyer._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500"
                >
                    Book Appointment
                </Link>
            </div>
        </section>
    );
};

export default ViewProfile;
