/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LAWYER_API_END_POINT } from '../../utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setAllLawyer } from '../../redux/lawyerslice';
import { FilterCard } from "../../index.js";
import { Navbar } from '../../index.js';

const FindLawyers = () => {
    const { allLawyer, filterQuery } = useSelector(store => store.lawyer);
    const dispatch = useDispatch();

    const [filterLawyer, setFilterLawyer] = useState([]);

    // Fetch all lawyers when the component mounts
    useEffect(() => {
        const fetchLawyers = async () => {
            try {
                const response = await axios.get(`${LAWYER_API_END_POINT}/all`);
                if (response.data.success) {
                    dispatch(setAllLawyer(response.data.lawyers));
                }
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }
        };

        fetchLawyers();
    }, [dispatch]);

    // Filter lawyers when allLawyer or filterQuery changes
    useEffect(() => {
        if (filterQuery) {
            console.log("allLawyer:", allLawyer);
            console.log("filter query ", filterQuery)
            const filteredLawyers = allLawyer.filter((lawyer) => {
                // Assuming location, specialization, and rating are strings
                return lawyer.location.city.toLowerCase().includes(filterQuery.toLowerCase()) ||
                    lawyer.specialization.toLowerCase().includes(filterQuery.toLowerCase()) ||
                    lawyer.rating.toLowerCase().includes(filterQuery.toLowerCase());
            });
            setFilterLawyer(filteredLawyers);
            console.log(filteredLawyers)
        } else {
            setFilterLawyer(allLawyer); // Show all lawyers if no filter is applied
            console.log(allLawyer)
        }
    }, [allLawyer, filterQuery]);

    return (
        <>
            <Navbar />
            <div className="flex gap-5">

                <section className="m-5">
                    <FilterCard />
                </section>

                <section className="container mx-auto p-8">
                    <h1 className="text-3xl font-bold mb-6 text-center">Find Lawyers</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filterLawyer.length > 0 ? (
                            filterLawyer.map((lawyer) => (
                                <div key={lawyer._id} className="bg-white shadow-lg rounded-lg p-4">
                                    <div className="flex flex-col items-center">
                                        {/* Profile Picture */}
                                        <img
                                            src={lawyer.profile_pic || 'https://github.com/shadcn.png'}
                                            alt={lawyer.name}
                                            className="w-24 h-24 rounded-full object-cover mb-4"
                                        />

                                        {/* Lawyer Details */}
                                        <h2 className="text-xl font-bold">{lawyer.name}</h2>
                                        <p className="text-gray-600">{lawyer.specialization}</p>
                                        <p className="text-gray-600">
                                            {lawyer?.location?.city}, {lawyer?.location?.state}
                                        </p>
                                        <p className="text-gray-600">Contact Number: {lawyer.contact_number}</p>
                                        <p className="text-gray-600">Email: {lawyer.email}</p>
                                        <p className="text-gray-600">Experience: {lawyer.experience}</p>
                                        <p className="text-gray-600">Biography: {lawyer.biography}</p>
                                        <p className="text-gray-600">Availability:</p>
                                        {lawyer.availability.map((slot, index) => (
                                            <div key={index} className="text-gray-600 flex gap-3">
                                                <p>Day: {slot.day}</p>
                                                <p>From: {slot.from}</p>
                                                <p>To: {slot.to}</p>
                                            </div>
                                        ))}

                                        {/* View Profile Button */}
                                        <Link
                                            to={`/lawyer/${lawyer._id}`}
                                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500"
                                        >
                                            View Profile
                                        </Link>
                                        <Link
                                            to={`/book/appointment/${lawyer._id}`}
                                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500"
                                        >
                                            Book Appointment
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No lawyers found for the selected criteria.</p>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
};

export default FindLawyers;
