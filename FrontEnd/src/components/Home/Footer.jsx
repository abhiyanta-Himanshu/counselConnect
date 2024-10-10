/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

//redux
import {useSelector} from "react-redux"

const Footer = () => {

  const { user } = useSelector(store => store.auth)


  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto grid md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">Counsel Connect</h3>
          <p>Connecting you with trusted legal professionals.</p>
        </div>

        {/* Important Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Important Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-gray-400">Home</Link>
            </li>
            <li>
              <Link to="/legal-resources" className="hover:text-gray-400">Legal Resources</Link>
            </li>
            <li>
              <Link to="/lawyers" className="hover:text-gray-400">Find a Lawyer</Link>
            </li>
            <li>
              <Link to="/aboutus" className="hover:text-gray-400">About Us</Link>
            </li>
            {
              <li>
              {user === null ? (
                <Link to="/signup" className="hover:text-gray-400">Signup</Link>
              ) : null}
            </li>
            }
            
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p>Email: support@counselconnect.com</p>
          <p>Phone: +91 12345 67890</p>
          <div className="mt-4 space-x-4">
            {/* Add social media icons here */}
            <Link to="#" className="hover:text-gray-400">Facebook</Link>
            <Link to="#" className="hover:text-gray-400">Twitter</Link>
            <Link to="#" className="hover:text-gray-400">LinkedIn</Link>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 text-gray-400">
        <p>&copy; {new Date().getFullYear()} Counsel Connect. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
