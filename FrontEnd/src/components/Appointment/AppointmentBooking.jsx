/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { APPOINTMENT_API_END_POINT } from '../../utils/constant';
// import { getLawyerAvailability, bookAppointment } from '../../redux/appointmentSlice'; // Assuming these actions exist

const AppointmentBooking = ({ lawyerId }) => {
  const dispatch = useDispatch();
  const {id} = useParams();
  // const lawyer = useSelector((state) => state.lawyers.lawyerList.find(l => l._id === lawyerId));
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (lawyerId) {
      // dispatch(getLawyerAvailability(lawyerId));
    }
  }, [lawyerId, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      lawyer:id,
      date: selectedDate,
      time: selectedTime,
      notes:reason,
    };

    try {
      const res = await axios.post(`${APPOINTMENT_API_END_POINT}/create`,appointmentData,{
        headers : {
          'Content-Type' : 'application/json',
        },
        withCredentials : true
      })
      if(res.data.success) {
        toast.success("Appointment Scheduled Succssfully")
      }
      
    } catch (error) {
      console.log(error || "some error occured");
      toast.error(error.response.data.message);
  
    }
  };

  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold mb-4">Book an Appointment</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Select Date:</label>
          <input
            type="date"
            className="mt-2 p-2 border border-gray-300 rounded"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Select Time:</label>
          <input
            type="time"
            className="mt-2 p-2 border border-gray-300 rounded"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Reason for Appointment:</label>
          <textarea
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for the appointment"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Confirm Appointment
        </button>
      </form>
    </section>
  );
};

export default AppointmentBooking;
