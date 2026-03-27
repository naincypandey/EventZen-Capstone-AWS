import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ setView }) => {
  const [formData, setFormData] = useState({ username: '', password: '', role: 'CUSTOMER' });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending data to Java:", formData);
      const response = await axios.post('/api/auth/register', formData);
      console.log("Success:", response.data);
      alert("Registration Successful! Please login now.");
      if(setView) setView("login"); // Move user to login automatically
    } catch (error) {
      console.error("Full Error:", error);
      alert("Registration Failed! Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex flex-col items-center p-10">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-[2rem] shadow-2xl w-96 border-t-8 border-blue-600">
        <h2 className="text-2xl font-black mb-6 text-center text-blue-800 italic uppercase">Create Account</h2>
        
        <label className="block text-[10px] font-black mb-1 uppercase text-gray-400">Username</label>
        <input 
          type="text" placeholder="Enter username" className="w-full p-3 mb-4 border rounded-xl bg-gray-50"
          onChange={(e) => setFormData({...formData, username: e.target.value})} 
          required 
        />

        <label className="block text-[10px] font-black mb-1 uppercase text-gray-400">Password</label>
        <input 
          type="password" placeholder="Enter password" className="w-full p-3 mb-4 border rounded-xl bg-gray-50"
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          required 
        />

        <label className="block text-[10px] font-black mb-1 uppercase text-gray-400">Role Assignment</label>
        <select 
          className="w-full p-3 mb-6 border rounded-xl bg-gray-50 font-bold text-gray-700"
          onChange={(e) => setFormData({...formData, role: e.target.value})}
        >
          <option value="CUSTOMER">CUSTOMER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button className="w-full bg-blue-600 text-white p-4 rounded-xl font-black hover:bg-blue-700 transition shadow-lg uppercase text-xs">
          Complete Registration
        </button>
      </form>
    </div>
  );
};

export default Register;