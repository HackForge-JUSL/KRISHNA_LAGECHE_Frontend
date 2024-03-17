import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from "../config.js";
import { toast } from "react-toastify";
import {HashLoader} from "react-spinners"
import { AuthContext } from "../context/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'patient'
  });
  const [passwordError, setPasswordError] = useState('');
  const { user, dispatch } = useContext(AuthContext);
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
      let url = `${BASE_URL}/user/login`;
      if (formData.role === 'doctor') {
        url = `${BASE_URL}/doctor/login`;
      }

      const response = await axios.post(url, formData);
      const { accessToken, data, msg } = response.data; 
      const role = formData?.role;
      console.log(accessToken);
      console.log(data);
      console.log(msg);
      const user = data;
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user,
          token:accessToken,
          role
        },
      });
      toast.success(msg);
      if (formData.role === 'doctor') {
        navigate('/doctor');
      }
      else {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.msg);
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
