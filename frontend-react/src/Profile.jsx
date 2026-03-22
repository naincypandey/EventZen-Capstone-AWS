import React, { useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    name: localStorage.getItem('username'),
    email: localStorage.getItem('username') + "@deloitte.com", // Dummy email for professional look
    role: localStorage.getItem('role')
  });
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="p-10 max-w-xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-2xl border-t-8 border-blue-600">
        <div className="flex justify-between items-start mb-8">
          <h2 className="text-3xl font-black text-gray-800 dark:text-white">My Profile</h2>
          <button onClick={() => setIsEditing(!isEditing)} className="text-blue-600 font-bold uppercase text-xs">
            {isEditing ? "Save" : "Edit Profile"}
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center text-3xl">👤</div>
            <div>
              <p className="font-black text-xl dark:text-white uppercase tracking-tighter">{user.name}</p>
              <p className="text-gray-400 text-sm font-bold uppercase">{user.role}</p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Contact Email</label>
              {isEditing ? (
                <input type="text" defaultValue={user.email} className="w-full p-2 border-b dark:bg-gray-900" />
              ) : (
                <p className="font-bold dark:text-white">{user.email}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Account Status</label>
              <p className="text-green-500 font-bold">● Active Employee</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => { localStorage.clear(); window.location.reload(); }}
          className="w-full mt-10 bg-red-50 text-red-600 p-4 rounded-xl font-bold hover:bg-red-600 hover:text-white transition"
        >
          Secure Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;