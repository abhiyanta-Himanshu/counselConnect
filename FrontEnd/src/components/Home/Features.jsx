/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Features = () => {

   const { type } = useSelector(store => store.auth);


  const features = [
    {
      title: "Find Lawyers",
      description: "Search and connect with verified lawyers across various specializations.",
      icon: "👨‍⚖️", // You can replace with an actual icon
      link: '/find-lawyers'
    },
    {
      title: type === 'lawyer' ? "View Appointment" :"Book Appointments",
      description: "Easily schedule appointments with lawyers at your convenience.",
      icon: "📅",
      link: type === 'lawyer'? '/appointment/lawyer' :'/appointment/user'
    },
    {
      title: "Access Legal Resources",
      description: "Browse the latest court orders and other legal resources.",
      icon: "📚",
      link: '/'
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-2">
                <Link to={feature?.link}>
                {feature.title}
                </Link>
                </h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
