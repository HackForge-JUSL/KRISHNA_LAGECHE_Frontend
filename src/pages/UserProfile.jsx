import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../config.js";

const UserProfile = () => {
  const { user, token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: 'male',
    mobile: '',
    address: '',
  });

  useEffect(() => {
    if (user) {
      setFormData(prevState => ({
        ...prevState,
        name: user.name || '',
        email: user.email || '',
        age: user.age || '',
        gender: user.gender || 'male',
        mobile: user.mobile || '',
        address: user.address || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/user/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Profile updated successfully.');
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-6 bg-gray-200 p-10 rounded-lg">
      <h2 className="font-bold text-3xl text-center text-black">Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name:</label>
          <input type="text" value={formData.name} readOnly={true} className="w-full border rounded-md px-3 py-2 bg-gray-100" />
        </div>
        <div>
          <label className="block mb-1">Email:</label>
          <input type="email" value={formData.email} readOnly={true} className="w-full border rounded-md px-3 py-2 bg-gray-100" />
        </div>
        <div>
          <label className="block mb-1">Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border rounded-md px-3 py-2" >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Mobile:</label>
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="w-full bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700" > Update Profile </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
