import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCard from '../../components/DoctorCard.jsx';
import { BASE_URL } from '../../config.js';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/doctor/all`);
      setDoctors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {doctors.map((doctor, index) => (
        <DoctorCard key={index} doctor={doctor} />
      ))}
    </>
  );
};

export default Doctors;
