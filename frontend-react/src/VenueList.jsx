import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VenueList = () => {
  const [venues, setVenues] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // MODAL & FORM STATES
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [attendees, setAttendees] = useState(['']); 
  
  const [newVenue, setNewVenue] = useState({ name: '', location: '', capacity: '', pricePerDay: '' });
  const [editVenue, setEditVenue] = useState(null);
  const [paymentData, setPaymentData] = useState({ cardName: '', cardNo: '', expiry: '', cvv: '' });

  const username = localStorage.getItem('username') || "Guest";
  const rawRole = localStorage.getItem('role') || "CUSTOMER";
  const isAdmin = rawRole === 'ADMIN' || rawRole === 'ROLE_ADMIN';

  // --- FIXED FETCH LOGIC ---
  const fetchData = async () => {
    try {
      // 1. Fetching Venues (Matches Nginx /api/venue)
      const res = await axios.get('/api/venue');
      
      // 2. Fetching Bookings (Matches Nginx /api/booking)
      const bookingRes = await axios.get('/api/booking');
      
      // FIXED: Used 'res.data' instead of 'venueRes.data'
      setVenues(res.data);
      setAllBookings(bookingRes.data);
    } catch (err) { 
      console.error("Backend unreachable", err); 
    }
  };

  useEffect(() => { fetchData(); }, []);

  // --- ATTENDEE LOGIC ---
  const handleTicketChange = (val) => {
    const count = Math.max(1, Math.min(10, val)); 
    setTicketCount(count);
    setAttendees(Array(count).fill(''));
  };

  const handleAttendeeName = (index, name) => {
    const updated = [...attendees];
    updated[index] = name;
    setAttendees(updated);
  };

  // --- PAYMENT FORMATTERS ---
  const handleCardNo = (e) => {
    let v = e.target.value.replace(/\D/g, '').substring(0, 16);
    let parts = v.match(/.{1,4}/g) || [];
    setPaymentData({ ...paymentData, cardNo: parts.join(' ') });
  };

  const handleExpiry = (e) => {
    let v = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (v.length > 2) v = v.substring(0, 2) + '/' + v.substring(2);
    setPaymentData({ ...paymentData, expiry: v });
  };

  // --- ACTIONS ---
  const handleAddVenue = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...newVenue, capacity: Number(newVenue.capacity), pricePerDay: Number(newVenue.pricePerDay), status: "Available" };
      await axios.post('/api/venue', payload);
      alert("✅ Venue Added!"); 
      setShowAddModal(false); 
      fetchData();
    } catch (err) { alert("❌ Add failed."); }
  };

  const handleUpdateVenue = async (e) => {
    e.preventDefault();
    try {
      const cleanId = parseInt(editVenue.id, 10);
      const payload = { ...editVenue, id: cleanId, capacity: Number(editVenue.capacity), pricePerDay: Number(editVenue.pricePerDay) };
      // FIXED: Added backticks for template literal
      await axios.put(`/api/venue/${cleanId}`, payload);
      alert("✅ Updated!"); 
      setShowEditModal(false); 
      fetchData();
    } catch (err) { alert("❌ Update failed."); }
  };

  const handleStatusChange = async (venue, newStatus) => {
    try {
      const payload = { ...venue, status: newStatus, capacity: Number(venue.capacity), pricePerDay: Number(venue.pricePerDay) };
      // FIXED: Added backticks for template literal
      await axios.put(`/api/venue/${venue.id}`, payload);
      alert(`Status: ${newStatus}`); 
      fetchData();
    } catch (err) { alert("❌ Status update failed."); }
  };

  const handleBooking = async () => {
    if (attendees.some(name => name.trim() === "")) return alert("Please enter all guest names.");
    try {
      await axios.post('/api/booking', {
        username, 
        venueName: selectedVenue.name,
        ticketCount,
        attendees,
        totalAmount: selectedVenue.pricePerDay * ticketCount,
        status: "Confirmed" 
      });
      alert(`✅ Success! Booked ${ticketCount} tickets.`);
      setShowPayment(false); 
      setSelectedVenue(null); 
      fetchData();
    } catch (err) { alert("❌ Booking Failed."); }
  };

  const getOccupancy = (venueName) => allBookings.filter(b => b.venueName === venueName && b.status !== "Cancelled").length;

  const getVenueImage = (name) => {
    if (!name) return "";
    if (name.includes("Hall")) return "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800";
    if (name.includes("Gallery")) return "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800";
    return "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800";
  };

  return (
    <div className={darkMode ? "bg-gray-950 text-white min-h-screen p-4 md:p-8" : "bg-gray-50 text-gray-900 min-h-screen p-4 md:p-8"}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 bg-white dark:bg-gray-900 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border dark:border-gray-800 gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-black text-blue-600 italic uppercase">EventZen Console</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Operator: {username} | Mode: {rawRole}</p>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="px-6 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 font-bold text-xs uppercase border dark:border-gray-700">
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* MANAGEMENT CONSOLE */}
        {isAdmin && (
          <div className="bg-gray-900 rounded-[2rem] shadow-xl overflow-hidden mb-12 border border-gray-800">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-800/50">
              <h2 className="font-black uppercase text-white text-sm">Venue Infrastructure</h2>
              <button onClick={() => setShowAddModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg shadow-blue-500/20">Add Venue</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead className="text-[10px] text-gray-500 uppercase tracking-widest border-b border-gray-800">
                  <tr><th className="p-6">Details</th><th className="p-6">Status</th><th className="p-6">Capacity</th><th className="p-6">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-white">
                  {venues.map(v => (
                    <tr key={v.id} className="hover:bg-blue-900/10">
                      <td className="p-6"><p className="font-black text-sm uppercase">{v.name}</p><p className="text-xs text-gray-500 italic">📍 {v.location}</p></td>
                      <td className="p-6">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${v.status === 'Postponed' ? 'bg-amber-500/20 text-amber-400' : v.status === 'Cancelled' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                          {v.status || 'Available'}
                        </span>
                      </td>
                      <td className="p-6 font-bold">{getOccupancy(v.name)} / {v.capacity}</td>
                      <td className="p-6 space-x-3">
                        <button onClick={() => { setEditVenue(v); setShowEditModal(true); }} className="text-blue-400 font-black text-[10px] uppercase hover:underline">Edit</button>
                        <button onClick={() => handleStatusChange(v, v.status === "Postponed" ? "Available" : "Postponed")} className="text-amber-500 font-black text-[10px] uppercase hover:underline">
                           {v.status === "Postponed" ? "Resume" : "Postpone"}
                        </button>
                        <button onClick={() => handleStatusChange(v, "Cancelled")} className="text-red-500 font-black text-[10px] uppercase hover:underline">Cancel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* LIVE EXPLORER */}
        <h2 className="text-xl md:text-2xl font-black uppercase italic mb-8 border-l-4 border-blue-600 pl-4">Live Explorer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((v) => (
            <div key={v.id} className={`rounded-[2.5rem] overflow-hidden shadow-2xl transition-all ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'} border-4 hover:border-blue-500`}>
              <img src={getVenueImage(v.name)} className="h-52 w-full object-cover" alt="venue"/>
              <div className="p-8">
                <h3 className={`text-xl font-black mb-1 leading-none ${darkMode ? 'text-white' : 'text-gray-900'}`}>{v.name}</h3>
                <p className="text-gray-400 font-bold text-[10px] uppercase">📍 {v.location}</p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t dark:border-gray-800">
                  <span className="text-xl font-black text-blue-600 italic">₹{v.pricePerDay}</span>
                  <button 
                    disabled={v.status !== 'Available'} 
                    onClick={() => {setSelectedVenue(v); setAttendees(['']); setTicketCount(1);}} 
                    className={`px-6 py-2 rounded-2xl font-black text-[10px] uppercase ${v.status === 'Available' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                  >
                    DETAILS
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODALS --- */}
      {showEditModal && editVenue && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] max-w-sm w-full border border-gray-800">
            <h2 className="text-lg font-black uppercase mb-4 text-blue-600">Edit Asset</h2>
            <form onSubmit={handleUpdateVenue} className="space-y-4">
              <input type="text" value={editVenue.name} className="w-full p-4 border rounded-xl bg-gray-50 text-gray-900 font-bold text-xs uppercase" onChange={(e)=>setEditVenue({...editVenue, name: e.target.value})} />
              <input type="number" value={editVenue.pricePerDay} className="w-full p-4 border rounded-xl bg-gray-50 text-gray-900 font-bold text-xs" onChange={(e)=>setEditVenue({...editVenue, pricePerDay: e.target.value})} />
              <div className="flex gap-2">
                <button type="button" onClick={()=>setShowEditModal(false)} className="flex-1 p-4 border rounded-xl font-bold text-gray-400 text-xs">CANCEL</button>
                <button type="submit" className="flex-1 p-4 bg-blue-600 text-white rounded-xl font-bold text-xs shadow-lg">UPDATE</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] max-w-sm w-full border border-gray-800">
            <h2 className="text-lg font-black uppercase mb-4 text-blue-600">Register Asset</h2>
            <form onSubmit={handleAddVenue} className="space-y-4">
              <input type="text" placeholder="NAME" className="w-full p-4 border rounded-xl bg-gray-50 text-gray-900 font-bold text-xs uppercase" onChange={(e)=>setNewVenue({...newVenue, name: e.target.value})} required/>
              <input type="text" placeholder="LOCATION" className="w-full p-4 border rounded-xl bg-gray-50 text-gray-900 font-bold text-xs uppercase" onChange={(e)=>setNewVenue({...newVenue, location: e.target.value})} required/>
              <input type="number" placeholder="CAPACITY" className="w-full p-4 border rounded-xl bg-gray-50 text-gray-900 font-bold text-xs" onChange={(e)=>setNewVenue({...newVenue, capacity: e.target.value})} required/>
              <input type="number" placeholder="PRICE" className="w-full p-4 border rounded-xl bg-gray-50 text-gray-900 font-bold text-xs" onChange={(e)=>setNewVenue({...newVenue, pricePerDay: e.target.value})} required/>
              <div className="flex gap-2">
                <button type="button" onClick={()=>setShowAddModal(false)} className="flex-1 p-4 border rounded-xl font-bold text-gray-400 text-xs">CANCEL</button>
                <button type="submit" className="flex-1 p-4 bg-blue-600 text-white rounded-xl font-bold text-xs shadow-lg">SAVE</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PAYMENT MODAL */}
      {selectedVenue && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-[100]">
          <div className="max-w-lg w-full p-8 md:p-10 rounded-[3rem] shadow-2xl bg-white text-gray-900">
            {!showPayment ? (
              <div className="space-y-6">
                <h2 className="text-3xl font-black uppercase italic leading-tight text-blue-900">{selectedVenue.name}</h2>
                <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex justify-between items-center">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Select Ticket Qty</span>
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleTicketChange(ticketCount - 1)} className="w-8 h-8 bg-white rounded-full shadow-sm font-bold border">-</button>
                    <span className="text-xl font-black">{ticketCount}</span>
                    <button onClick={() => handleTicketChange(ticketCount + 1)} className="w-8 h-8 bg-white rounded-full shadow-sm font-bold border">+</button>
                  </div>
                </div>
                <div className="max-h-48 overflow-y-auto space-y-3 pr-2">
                  {attendees.map((_, i) => (
                    <input key={i} type="text" placeholder={`GUEST #${i+1} NAME`} className="w-full p-4 bg-gray-50 border rounded-2xl font-bold text-[10px] uppercase focus:border-blue-500 outline-none" onChange={(e) => handleAttendeeName(i, e.target.value)} required />
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-gray-400 font-bold uppercase text-[10px]">Total Bill</span>
                  <span className="text-2xl font-black text-blue-600">₹{selectedVenue.pricePerDay * ticketCount}</span>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setSelectedVenue(null)} className="flex-1 py-4 font-bold border-2 rounded-2xl text-[10px] uppercase">Back</button>
                  <button onClick={() => setShowPayment(true)} className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-blue-500/20">Checkout</button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="text-center">
                  <h2 className="text-2xl font-black italic">SECURE GATEWAY</h2>
                  <p className="text-[9px] font-black text-blue-500 tracking-widest uppercase">Verified by Deloitte Finance</p>
                </div>
                <div className="bg-gray-900 p-5 rounded-3xl flex justify-between items-center text-white">
                  <span className="font-bold uppercase text-[10px]">Grand Total</span>
                  <span className="text-xl font-black font-mono text-blue-400">₹{selectedVenue.pricePerDay * ticketCount}</span>
                </div>
                <div className="space-y-3">
                  <input type="text" placeholder="NAME ON CARD" className="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold text-gray-900 text-xs uppercase" />
                  <input type="text" placeholder="CARD NUMBER" value={paymentData.cardNo} onChange={handleCardNo} className="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold text-gray-900 text-xs" />
                  <div className="flex gap-3">
                    <input type="text" placeholder="MM/YY" maxLength="5" value={paymentData.expiry} onChange={handleExpiry} className="w-1/2 p-4 bg-gray-50 border-2 rounded-2xl font-bold text-gray-900 text-xs" />
                    <input type="password" placeholder="CVV" maxLength="3" className="w-1/2 p-4 bg-gray-50 border-2 rounded-2xl font-bold text-gray-900 text-xs" />
                  </div>
                </div>
                <button onClick={handleBooking} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black shadow-2xl hover:bg-blue-700 transition uppercase text-xs">Confirm Payment</button>
                <button onClick={() => setShowPayment(false)} className="w-full text-gray-400 font-bold uppercase text-[9px] text-center block mt-2 hover:text-red-500">Back</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueList;