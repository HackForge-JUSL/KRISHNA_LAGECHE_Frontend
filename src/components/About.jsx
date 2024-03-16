import React from 'react'

const About = () => {
  return (
    <section>
      <div className="flex flex-col md:flex-row justify-center items-center">
      <div className="md:w-1/2 p-8 text-center">
        <h1 className="text-6xl font-bold mb-4">About Us</h1>
        <p className="text-2xl mb-4 ">
          We provide comprehensive healthcare services to our patients. Our dedicated team of healthcare professionals
          ensures that you receive the best possible care tailored to your needs. From routine check-ups to specialized
          treatments, we are committed to promoting your well-being.
        </p>
        <p className="text-2xl mb-4">
          Additionally, take control of your nutrition with our nutrition tracking feature. Monitor your dietary intake,
          set goals, and stay on track towards a healthier lifestyle.
        </p>
      </div>
    </div>
    </section>
  )
}

export default About
