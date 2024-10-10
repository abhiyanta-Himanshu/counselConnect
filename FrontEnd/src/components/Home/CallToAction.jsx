/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="bg-blue-600 text-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">
          Are You a Lawyer? Join Counsel Connect Today!
        </h2>
        <p className="mb-8 text-lg">
          Register on Counsel Connect to expand your reach and help clients find the legal assistance they need.
        </p>
        <Link
          to="/lawyer/signup"
          className="bg-white text-blue-600 px-6 py-3 rounded-full text-lg font-bold hover:bg-gray-100"
        >
          Register Now
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
