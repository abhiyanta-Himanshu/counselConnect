/* eslint-disable no-unused-vars */
import React from 'react'
import {createBrowserRouter , RouterProvider } from 'react-router-dom'

import {AppointmentBooking, FindLawyers, Home, LawyerAppointment, UserAppointment, ViewLawyerProfileId} from "./index.js"
import {Login , Signup} from "./index.js"
import {ViewProfile , EditProfile} from "./index.js"
import { LawyerSignup, LawyerLogin, ViewLawyerProfile, EditLawyerProfile} from './index.js'

const appRouter = createBrowserRouter([
  {
    path : '/',
    element :<Home/>
  },
  {
    path : '/login',
    element :<Login/>
  },
  {
    path : '/signup',
    element :<Signup/>
  },
  {
    path :'/profile',
    element: <ViewProfile/>
  },
  {
    path :'/edit-profile',
    element: <EditProfile/>
  },
  {
    path :'/find-lawyers',
    element: <FindLawyers/>
  },
  //lawyer
  {
    path :'/lawyer/signup',
    element: <LawyerSignup/>
  },
  {
    path :'/lawyer/login',
    element: <LawyerLogin/>
  },
  {
    path :'/lawyer/profile',
    element: <ViewLawyerProfile/>
  },
  {
    path :'/lawyer/edit-profile',
    element: <EditLawyerProfile/>
  },
  //appointments
  {
    path :'/lawyer/:id',
    element: <ViewLawyerProfileId/>
  },
  {
    path :'/appointment/user',
    element: <UserAppointment/>
  },
  {
    path :'/appointment/lawyer',
    element: <LawyerAppointment/>
  },
  {
    path :'/book/appointment/:id',
    element: <AppointmentBooking/>
  },
  {
    // path :'/appointment/update',
    // element: <UpdateAppointment/>
  },
  
])


function App() {

  return (
    <>
    <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
