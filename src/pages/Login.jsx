import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = "http://localhost:8000/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'patient' // Default role set to patient
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
      setPasswordError(''); 
    }

    try {
      let url = `${apiUrl}/user/login`; // Default API URL for patient role
      if (formData.role === 'doctor') {
        url = `${apiUrl}/doctor/login`;
      }

      const response = await axios.post(url, formData);

      console.log('Login successful!', response.data);

      // Redirect to dashboard or appropriate page after successful login
      if (formData.role === 'doctor') {
        navigate('/doctor');
      }
      else
      {
        navigate('/user');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-6 bg-gray-200 p-10 rounded-lg">
      <h2 className="font-bold text-3xl text-center text-black">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
