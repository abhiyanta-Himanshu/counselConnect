/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { getUserAppointments } from '../../redux/appointmentSlice'; // Assuming the action exists
import axios from 'axios';
import { APPOINTMENT_API_END_POINT } from '../../utils/constant';
import { toast } from 'sonner';

const LawyerAppointment = () => {
    const dispatch = useDispatch();
    const [appointments, setAppointment] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});
    const user = useSelector((store) => store.auth.user); // To get user details
    console.log(user)

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const res = await axios.get(`${APPOINTMENT_API_END_POINT}/lawyer/all`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    toast.success(res.data.message)
                    setAppointment(res.data.appointments)
                }
            } catch (error) {
                toast.error(error.response.data.message || "Error Occured")
                console.log(error || "An error occured")
            }
        }
        if (user) {
            fetchAppointment();
        }
    }, [dispatch, user]);

    const handleStatusChange = (appointmentId, status) => {
        setSelectedStatus((prevState) => ({
            ...prevState,
            [appointmentId]: status,
        }));
    };

    const handleUpdateStatus = async (appointmentId) => {
        console.log(selectedStatus[appointmentId] , appointmentId)
        try {
            const res = await axios.put(
                `${APPOINTMENT_API_END_POINT}/status/update/${appointmentId}`,
                { status: selectedStatus[appointmentId] },
                { withCredentials: true }
            );

            console.log(res)
             
            if (res.data.success) {
                toast.success("Status updated successfully");
                setAppointment((prev) =>
                    prev.map((appointment) =>
                        appointment._id === appointmentId
                            ? { ...appointment, status: selectedStatus[appointmentId] }
                            : appointment
                    )
                );
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error Occurred");
        }
    };

    if (!user) {
        return <div className='flex flex-col justify-between items-center w-[40%] my-[30%] mx-auto bg-white shadow-lg '>
            <p className='text-lg font-bold text-center'>Please
                <Link to={'/login'} className='text-blue-600'> log in
                </Link> to view your appointments.</p>
        </div>

    }

    return (
        <section className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Your Appointments</h1>
            {appointments.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <div className="space-y-4">
                    {appointments.map((appointment) => (
                        <div key={appointment._id} className="p-4 bg-white shadow rounded-lg">
                            <h2 className="text-lg font-bold mb-2">
                                Appointment from {appointment.user.name}
                            </h2>
                            <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {appointment.time}</p>
                            <p><strong>Reason:</strong> {appointment.notes}</p>
                            <p
                                className='mb-5'
                            ><strong>Status:</strong> {appointment.status}</p> {/* Assuming status is available */}

                            <Popover>
                                <PopoverTrigger
                                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500"
                                >Update Status</PopoverTrigger>
                                <PopoverContent>
                                    <div className="p-4">
                                        <label htmlFor="status" 
                                        className="block mb-2 font-bold">
                                            Update Status:
                                        </label>
                                        <select
                                            id="status"
                                            value={selectedStatus[appointment._id] || appointment.status}
                                            onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                                            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                                        >
                                            {/* 'pending', 'confirmed', 'completed', 'canceled' */}
                                            <option value="confirm">Confirm</option>
                                            <option value="completed">Completed</option>
                                            <option value="canceled">Canceled</option>
                                        </select>
                                        <button
                                            onClick={() => handleUpdateStatus(appointment._id)}
                                            // className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-500"
                                            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>


                            {/* <Link
                                to={`/appointment/update/:id`}
                                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500"
                            >
                                Update Status
                            </Link> */}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default LawyerAppointment;
