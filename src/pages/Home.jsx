import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import heroImage from '../assets/images/heroImage.png';
import DoctorList from "../components/DoctorList.jsx";

const Home = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleBookAppointment = () => {
    navigate('/doctors');
  };

  return (
    <>
      <div className=" bg-[#d7f3fb;] flex flex-col md:flex-row justify-center items-center bg-afdf60">
        <div className="md:w-1/2">
          <img src={heroImage} alt="Doctor" className="w-full" />
        </div>
        <div className="md:w-1/2 p-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Health Care</h1>
          <p className="text-lg mb-4">
            Book an appointment with our experienced doctors to address your health concerns and embark on a journey
            towards better health.
          </p>
          <button
            onClick={handleBookAppointment}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Book Appointment
          </button>
        </div>
      </div>
      <section>
        <div className="container">
          <div className='xl:w-[470px] mx-auto'>
            <h2 className='heading text-center'>Our great doctors</h2>
            <p className='text_para text-center'>World-class care for everyone. Our health System offers unmatched, expert health care.</p>
          </div>
          <DoctorList />
        </div>
      </section>
    </>
  );
};

export default Home;
