import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '', role: 'CUSTOMER' });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // We log the data to the browser console so you can see it
      console.log("Sending data:", formData);
      
      const response = await axios.post('/api/auth/register', formData);
      
      console.log("Response from Java:", response.data);
      alert("Registration Successful! Now click Login at the top.");
    } catch (error) {
      console.error("Full Error Object:", error);
      // This alert will show you more details 
      alert("Registration Failed! Details: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="flex flex-col items-center p-10">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Create Account</h2>
        
        <label className="block text-sm font-bold mb-1">Username</label>
        <input 
          type="text" placeholder="Enter username" className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setFormData({...formData, username: e.target.value})} 
          required 
        />

        <label className="block text-sm font-bold mb-1">Password</label>
        <input 
          type="password" placeholder="Enter password" className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          required 
        />

        <label className="block text-sm font-bold mb-1">Select Role</label>
        <select 
          className="w-full p-2 mb-6 border rounded bg-gray-50"
          onChange={(e) => setFormData({...formData, role: e.target.value})}
        >
          <option value="CUSTOMER">Customer</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700 transition">
          Complete Registration
        </button>
      </form>
    </div>
  );
};

export default Register;