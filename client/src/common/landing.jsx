import React from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/HeroSection'
import Timeline from '@/components/Timeline'
import ContactForm from '@/components/ContactSection'
import Footer from '@/components/Footer'
import Testimonials from '@/components/Testimonials'
import AboutSection from '@/components/AboutSection'


const landing = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutSection />
      <Timeline/>
      <Testimonials/>
      <ContactForm/>
      <Footer/>
    </>
  )
}

export default landing


