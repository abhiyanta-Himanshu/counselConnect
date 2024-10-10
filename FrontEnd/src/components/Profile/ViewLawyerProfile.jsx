/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ViewProfile = () => {
    const user = useSelector((state) => state.auth.user);
    console.log(user)

    useEffect(() => {
        if (!user) {
            // Dispatch an action to load user data if not already available

        }
    }, [user]);

    if (!user) {
        return (
            <>
                <p className='font-bold text-l text-center my-[30%]'>Pls
                    <Link to={'/lawyer/login'}
                        className='text-blue-600'
                    > Login</Link> to view user Porfile
                    or return to the
                    <Link
                        className='text-blue-600'
                        to={'/'}> Home</Link>
                </p>
            </>
        )
    }

    return (
        <section className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-6">
                {/* Profile Picture */}
                <div className="w-24 h-24 rounded-full overflow-hidden">
                    <img src={user.profile_pic || "https://github.com/shadcn.png"} alt="Profile" className="w-full h-full object-cover" />
                </div>

                {/* Profile Details */}
                <div>
                    <h2 className="text-xl font-bold mb-2">Profile Details</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Contact Number:</strong> {user.contact_number}</p>
                    <p><strong>Specialization</strong> {user.specialization}</p>
                    <p><strong>Experience Years:</strong> {user.experience}</p>
                    <p><strong>Location</strong></p>
                    <p>
                    <span><strong>City:</strong>{user.location.city}</span> <span><strong>State:</strong>{user.location.state}</span>
                    </p>

                    <p><strong>biography:</strong> {user.biography}</p>
                    <p><strong>Availability:</strong></p>
                       {/* Availability Section */}
                       {user.availability && user.availability.length > 0 ? (
                        user.availability.map((item, index) => (
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
                    to="/lawyer/edit-profile"
                    className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500"
                >
                    Edit Profile
                </Link>
            </div>
        </section>
    );
};

export default ViewProfile;
