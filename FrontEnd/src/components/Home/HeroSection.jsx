/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

//redux
import {useSelector} from "react-redux"

const HeroSection = () => {

  const { user} = useSelector(store=>store.auth)

  return (
    <section className="bg-white bg-hero bg-cover text-white min-h-[70vh] flex justify-center border border-gray-300">
      <div className="text-center my-40">
        <span className='text-black'>Get Specialize Lawyer Recommendation and Legal Assistance</span>
        <h1 className="text-4xl font-bold text-black my-10">Welcome to Counsel Connect</h1>
        <p className="mt-4 text-xl text-black">Find the right legal support for your needs with the right lawyers specialize in your case.</p>
        {/* <p className='mt-4 text-xl text-black'>Have u got any confusion related to any topics </p> */}
        <div className="mt-8">
          {
            user ? (
              <>
              <Link
            to="/find-lawyers"
            className="hover:bg-transparent bg-black text-white hover:text-black px-6 py-3 rounded-md font-bold hover:bg-gray-100"
          >
            Search For Lawyers
          </Link>
              </>
            ) : (
              <>
              <Link
            to="/signup"
            className="hover:bg-transparent bg-black text-white hover:text-black px-6 py-3 rounded-md font-bold hover:bg-gray-100"
          >
            Get Started
          </Link>
              </>
            )
          }
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
