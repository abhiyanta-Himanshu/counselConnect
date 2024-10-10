/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "../ui/popover"
// import { getUserAppointments } from '../../redux/appointmentSlice'; // Assuming the action exists
import axios from 'axios';
import { APPOINTMENT_API_END_POINT, REVIEW_API_END_POINT } from '../../utils/constant';
import { toast } from 'sonner';


const UserAppointment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [appointments, setAppointment] = useState([]);
    const user = useSelector((store) => store.auth.user); // To get user details
    console.log(user)

    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [id , setId] = useState("")



    const handleSubmit = async () => {
        console.log("creating Review.....")
        try {
            const res = await axios.post(`${REVIEW_API_END_POINT}/create/${id}`,{
                rating : rating,
                comment : reviewText 
            },{
                Headers : {
                    'Content-Type' : 'application/json'
                },
                withCredentials : true
            })
            if(res.data.success) {
                toast.success(res.data.message)
                setId('');
                setRating(0);
                setReviewText('')
                navigate('/appointment/user')
            }
            
        } catch(error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    };

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const res = await axios.get(`${APPOINTMENT_API_END_POINT}/all`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    toast.success(res.data.messageS)
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
                                Appointment with {appointment.lawyer.name}
                            </h2>
                            <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {appointment.time}</p>
                            <p><strong>Reason:</strong> {appointment.reason}</p>
                            <p><strong>Status:</strong> {appointment.status}</p> {/* Assuming status is available */}
                            {
                                appointment.status === 'completed' ?
                                    (
                                        <Popover>
                                            <PopoverTrigger>
                                                <span className='block text-center mt-4 p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300'>
                                                    <strong>
                                                        Give a review
                                                    </strong>
                                                </span>
                                            </PopoverTrigger>
                                            <PopoverContent className='p-4'>
                                                <h3 className="font-bold mb-2">Review Form</h3>

                                                {/* Star Rating */}
                                                <div className="flex mb-2">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <span
                                                            key={star}
                                                            onClick={() => setRating(star)}
                                                            className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'
                                                                }`}
                                                        >
                                                            ★
                                                        </span>
                                                    ))}
                                                </div>


                                                <textarea
                                                    placeholder="Write your review..."
                                                    rows="4"
                                                    cols="30"
                                                    value={reviewText}
                                                    onChange={(e) => setReviewText(e.target.value)}
                                                    className="w-full border rounded p-2"
                                                />
                                                <button
                                                    onClick={() => {
                                                        setId(appointment.lawyer._id);
                                                        handleSubmit();   
                                                    }}
                                                    className="mt-2 bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-600 transition duration-300"
                                                >
                                                    Submit
                                                </button>
                                            </PopoverContent>
                                        </Popover>
                                    )
                                    : null
                            }
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default UserAppointment;
