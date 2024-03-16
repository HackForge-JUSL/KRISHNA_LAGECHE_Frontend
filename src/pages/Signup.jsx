import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios';

let apiUrl="http://localhost:8000/api";

const Signup = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'patient',
    password: ''
  });
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password.length < 8) {
      setPasswordError('Password should be at least 8 characters long.');
      return;
    } else {
      setPasswordError(''); // Clear the error message when password is valid
    }
    
    try {
      let url = `${apiUrl}/user/signup`; // Default API URL for patient role
      if (formData.role === 'doctor') {
        url = `${apiUrl}/doctor/signup`;
      }
  
      const response = await axios.post(url, formData);
  
      console.log('Signup successful!', response.data);
      
      // Navigate to the login page after successful signup
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
      <div className="max-w-md mx-auto my-6 bg-gray-200 p-10 rounded-lg">
        <h2 className="font-bold text-3xl text-center text-black">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1">Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
  );
};

export default Signup;
