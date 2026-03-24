import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);
  const username = localStorage.getItem('username');
  const userRole = localStorage.getItem('role');

  const fetchData = async () => {
    try {
      const venueRes = await axios.get('/api/venue');
const bookingRes = await axios.get('/api/booking');
      setVenues(venueRes.data);
      
      // Admin sees ALL bookings. Customers see ONLY THEIRS.
      const data = (userRole === 'ADMIN' || userRole === 'ROLE_ADMIN')
        ? bookingRes.data 
        : bookingRes.data.filter(b => b.username === username);
      setBookings(data);
    } catch (err) { console.error("Sync Error:", err); }
  };

  useEffect(() => { fetchData(); }, []);

  // USER/ADMIN: Request Cancellation
  const handleUserCancel = async (bookingId) => {
    if (window.confirm("🚨 Cancel this booking and initiate refund process?")) {
      try {
        const cleanId = String(bookingId).split(':')[0]; 
        await axios.patch(`/api/booking/${cleanId}`, { status: "Cancelled" });
        alert("✅ Booking Status: CANCELLED");
        fetchData();
      } catch (err) { alert("❌ Cancellation failed."); }
    }
  };

  // ADMIN ONLY: Purge settled records
  const handleClearRecord = async (bookingId) => {
    if (window.confirm("⚠️ PERMANENT ACTION: Has the refund been processed? This removes the entry from the Ledger.")) {
      try {
        await axios.delete(`/api/booking/${bookingId}`);
        alert("✅ Record purged from system.");
        fetchData();
      } catch (err) { alert("❌ Failed to clear record."); }
    }
  };

  const getVenueLiveStatus = (name) => venues.find(v => v.name === name)?.status || "Available";

  return (
    <div className="p-4 md:p-10 max-w-6xl mx-auto min-h-screen bg-gray-50">
      <h2 className="text-3xl font-black uppercase italic mb-8 border-l-8 border-blue-600 pl-4 text-blue-900">
        {userRole === 'ADMIN' || userRole === 'ROLE_ADMIN' ? 'System Transaction Ledger' : 'My Booking Portfolio'}
      </h2>

      <div className="grid gap-6 pb-12">
        {bookings.map((b) => {
          const venueStatus = getVenueLiveStatus(b.venueName);
          const isCancelled = b.status === "Cancelled" || venueStatus === "Cancelled";
          const isAdmin = userRole === 'ADMIN' || userRole === 'ROLE_ADMIN';

          return (
            <div key={b._id} className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col md:flex-row justify-between items-center relative overflow-hidden transition-all hover:shadow-2xl">
              {/* Status Bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-3 ${isCancelled ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
              
              <div className="space-y-3 flex-1">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Receipt Hash: {b._id.toUpperCase()}</p>
                <h3 className="text-2xl font-black text-blue-950 uppercase italic leading-none">{b.venueName}</h3>
                
                <div className="flex gap-6">
                  <p className="text-xs font-bold text-blue-600 uppercase">👤 Paid By: {b.username} {b.username === username && <span className="text-[8px] bg-blue-100 px-2 rounded-full">(You)</span>}</p>
                  <p className="text-xs font-bold text-gray-500 uppercase">🎟️ Count: {b.ticketCount || 1}</p>
                </div>

                {/* Show Guest Names if they exist */}
                {b.attendees && b.attendees.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {b.attendees.map((name, idx) => (
                      <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-[9px] font-black text-gray-500 uppercase"> Guest: {name} </span>
                    ))}
                  </div>
                )}

                {isCancelled && (
                  <div className="mt-4 p-4 bg-red-50 rounded-2xl border border-red-100 inline-block">
                    <p className="text-red-600 font-black text-[10px] uppercase tracking-widest">🚨 Refund State: Processed</p>
                    <p className="text-gray-500 text-[10px] mt-1 font-mono uppercase">Ref Hash: #ZEN-{b._id.slice(-6)}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end gap-3 mt-6 md:mt-0 min-w-[150px]">
                <p className="text-2xl font-black text-blue-600 italic">₹{b.totalAmount || "0"}</p>
                
                <div className="flex gap-2">
                  {/* ADMIN CONTROL: Can Clear ANY cancelled record */}
                  {isAdmin && isCancelled && (
                    <button onClick={() => handleClearRecord(b._id)} className="bg-black text-white px-5 py-2 rounded-xl font-black text-[10px] uppercase hover:bg-red-600 transition shadow-lg">
                      Clear Record
                    </button>
                  )}

                  {/* CANCELLATION: Admin can cancel anything. User can only cancel active bookings. */}
                  {!isCancelled && (
                    <button onClick={() => handleUserCancel(b._id)} className="bg-red-50 text-red-600 px-5 py-2 rounded-xl font-bold text-[10px] uppercase hover:bg-red-600 hover:text-white transition">
                      Cancel Booking
                    </button>
                  )}
                  
                  <button className="bg-blue-50 text-blue-600 px-5 py-2 rounded-xl font-bold text-[10px] uppercase hover:bg-blue-600 hover:text-white transition">
                    Receipt
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingList;