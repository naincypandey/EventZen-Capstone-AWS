import React, { useState, useEffect } from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import VenueList from "./VenueList.jsx";
import BookingList from "./BookingList.jsx";
import Profile from "./Profile.jsx";

function App() {
  const [view, setView] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  const checkSession = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
      // Logic fix: only switch away from login/reg if we just logged in
    } else {
      setIsLoggedIn(false);
      setUserRole("");
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserRole("");
    setView("login");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans transition-all pb-10">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center px-4 md:px-10 border-b-4 border-blue-600 sticky top-0 z-50">
        <h1 className="text-xl md:text-2xl font-black text-blue-900 tracking-tighter cursor-pointer uppercase italic" onClick={() => setView("venues")}>
          EventZen <span className="text-[10px] font-normal text-gray-400 not-italic">v2.0</span>
        </h1>
        
        <div className="flex items-center space-x-1 md:space-x-2">
          {!isLoggedIn ? (
            <>
              <button onClick={() => setView("login")} className={`px-3 md:px-5 py-2 rounded-xl font-bold text-xs md:text-sm uppercase ${view === 'login' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>Login</button>
              <button onClick={() => setView("register")} className={`px-3 md:px-5 py-2 rounded-xl font-bold text-xs md:text-sm uppercase ${view === 'register' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>Register</button>
            </>
          ) : (
            <>
              <button onClick={() => setView("venues")} className={`px-3 py-2 font-black rounded-xl text-[10px] uppercase ${view === 'venues' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}>Venues</button>
              <button onClick={() => setView("bookings")} className={`px-3 py-2 font-black rounded-xl text-[10px] uppercase ${view === 'bookings' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}>
                {userRole === 'ADMIN' ? 'Ledger' : 'Bookings'}
              </button>
              <button onClick={() => setView("profile")} className={`px-3 py-2 font-black rounded-xl text-[10px] uppercase ${view === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}>Profile</button>
              <button onClick={logout} className="ml-4 px-3 py-2 bg-red-50 text-red-600 rounded-xl font-black text-[10px] uppercase hover:bg-red-600 hover:text-white transition">Logout</button>
            </>
          )}
        </div>
      </nav>

      <main className="container mx-auto px-4">
        {!isLoggedIn ? (
          <div className="flex justify-center items-center py-10 md:py-20">
             {view === "login" ? <Login /> : <Register setView={setView} />}
          </div>
        ) : (
          <div className="pt-6">
            {view === "venues" && <VenueList />}
            {view === "bookings" && <BookingList />}
            {view === "profile" && <Profile />}
          </div>
        )}
      </main>
      
      {isLoggedIn && (
        <footer className="fixed bottom-0 w-full bg-white border-t p-2 flex justify-between items-center text-[8px] md:text-[10px] font-black text-gray-400 uppercase z-40 px-4 md:px-10 tracking-widest">
          <div>Status: Online</div>
          <div className="truncate max-w-[150px]">Node: {localStorage.getItem('username')}</div>
          <div>Deloitte EventZen 2026</div>
        </footer>
      )}
    </div>
  );
}
export default App;