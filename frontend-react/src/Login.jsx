import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8080/auth/login', formData);
    
    // Save to localStorage
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', response.data.role); 
    localStorage.setItem('username', response.data.username); // THIS IS CRITICAL

    alert("Login Successful!");
    
    // Redirect or Refresh to trigger App.jsx useEffect
    window.location.reload(); 
  } catch (error) {
    console.error(error);
    alert("Login Failed! Please check if Khushi is typed exactly as in DB.");
  }
};

  return (
    <div className="flex flex-col items-center p-10">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">EventZen Login</h2>
        <input 
          type="text" placeholder="Username" className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setFormData({...formData, username: e.target.value})} 
        />
        <input 
          type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;