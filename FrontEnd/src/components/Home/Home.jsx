/* eslint-disable no-unused-vars */
import React from 'react'
import {Navbar , HeroSection, Features, Testimonials, CallToAction, Footer} from "../../index.js"

function Home() {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <Features/>
        <Testimonials/>
        <CallToAction/>
        <Footer/>
    </div>
  )
}

export default Home