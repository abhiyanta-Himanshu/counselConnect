/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { toast } from "sonner"
import axios from "axios"
import { REVIEW_API_END_POINT } from '../../utils/constant';

const Testimonials = () => {

  const [testimonials , setTestimonials] = useState([]);

  useEffect(() => {
    const fetch = async (req , res) => {
      try {
        const res = await axios.get(`${REVIEW_API_END_POINT}/all`);
        if(res.data.success) {
          setTestimonials(res.data.reviews.slice(0,6));
          // console.log(res.data.reviews)
          // toast.success(res.data.message)
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
      }
    }

    fetch();
  },[])

  // const testimonials = [
  //   {
  //     name: "Rajesh Kumar",
  //     title: "Entrepreneur",
  //     feedback:
  //       "Counsel Connect helped me find the right lawyer for my business issues. The process was seamless and quick!",
  //     image: "https://via.placeholder.com/150", // Replace with real images
  //   },
  //   {
  //     name: "Sneha Sharma",
  //     title: "Freelancer",
  //     feedback:
  //       "The ability to book appointments online has made it so much easier to consult with lawyers. Highly recommended!",
  //     image: "https://via.placeholder.com/150",
  //   },
  //   {
  //     name: "Amit Verma",
  //     title: "Engineer",
  //     feedback:
  //       "Access to legal resources has been a huge help in understanding the legal process. Counsel Connect is a great platform!",
  //     image: "https://via.placeholder.com/150",
  //   },
  // ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <img
                src={testimonial.user.profile_pic}
                alt={testimonial.user.name}
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{testimonial.user.name}</h3>
              <p className="text-gray-500 mb-2"> Got services from : {testimonial.lawyer.name}</p>
              <p className="text-gray-700">{testimonial.comment}</p>
              <p className="text-gray-700">Rating : {testimonial.rating}</p>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
