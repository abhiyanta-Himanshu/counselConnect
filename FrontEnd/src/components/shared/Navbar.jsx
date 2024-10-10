/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { toast } from "sonner"
import { USER_API_END_POINT } from "../../utils/constant.js"

//redux
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../redux/authslice.js"

//shadcn ui
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover.jsx"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.jsx"



const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  }

  const { user } = useSelector(store => store.auth)
  const { type } = useSelector(store => store.auth)

  // console.log(user)


  return (
    <nav className="bg-white p-4 h-20 flex items-center border border-gray-300">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left-aligned Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-black text-2xl font-bold">
            <Link to="/">Counsel Connect</Link>
          </h1>
        </div>

        {/* Center-aligned links (Home, Legal Resource, Lawyer) */}
        <div className="hidden md:flex flex-grow justify-center space-x-6">
          <Link to="/" className="text-black font-semibold hover:text-gray-600">Home</Link>
          <Link to="/legal-resources" className="text-black font-semibold hover:text-gray-600">Legal Resource</Link>
          <Link to="/find-lawyers" className="text-black font-semibold hover:text-gray-600">Lawyer</Link>
        </div>

        {/* Right-aligned links (Login, Signup) */}
        <div className="flex space-x-6">
          {
            user ? (
              <>
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar>
                      <AvatarImage src={user.profile_pic || "https://github.com/shadcn.png"} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                  </PopoverTrigger>
                  <PopoverContent>
                    <div className='flex flex-col'>
                      <div className='flex gap-8 items-center'>
                        <Avatar>
                          <AvatarImage src={user.profile_pic || "https://github.com/shadcn.png"} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h4 className='font-medium'>{user.name || 'User Name'}</h4>
                      </div>
                      <button
                        className="text-black font-bold hover:text-gray-600 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-200 hover:border-gray-400 mt-4"
                      >
                        {
                          type && type==='user' ? 
                          <Link to={'/profile'}>View Profile</Link>
                          : 
                          <Link to={'/lawyer/profile'}>View Profile</Link>
                        }</button>

                      <button onClick={logoutHandler}
                        className="text-black font-bold hover:text-gray-600 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-200 hover:border-gray-400 mt-4"
                      >Logout</button>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            )
              :
              <>
                <Link to="/login"
                  className="text-black font-bold hover:text-gray-600 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-200 hover:border-gray-400"
                >Login</Link>
                <Link to="/signup"
                  className="text-black font-bold hover:text-gray-600 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-200 hover:border-gray-400"
                >Signup</Link>
              </>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
