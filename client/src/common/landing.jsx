import React from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/HeroSection'
import Timeline from '@/components/Timeline'
import ContactForm from '@/components/ContactSection'
import Footer from '@/components/Footer'
import Testimonials from '@/components/Testimonials'

const landing = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Timeline/>
      <Testimonials/>
      <ContactForm/>
      <Footer/>
    </>
  )
}

export default landing