import React from 'react';

const Dashboard = ({ venues, bookingsCount, currentUser, events, onBook, isDark }) => {
  const popularEvents = events.slice(0, 2);

  return (
    <div className="p-10 space-y-10">
      <header>
        <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
          Welcome back, {currentUser} <span className="animate-wave text-2xl">👋</span>
        </h2>
        <p className="opacity-50 font-medium tracking-tight">Your event summary for Kolkata.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} p-8 rounded-[2.5rem] border shadow-sm`}>
          <p className="opacity-50 font-black text-[10px] uppercase tracking-widest">My Active Tickets</p>
          <h3 className="text-5xl font-black mt-2">{bookingsCount}</h3>
        </div>
        <div className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} p-8 rounded-[2.5rem] border shadow-sm`}>
          <p className="opacity-50 font-black text-[10px] uppercase tracking-widest">Available Venues</p>
          <h3 className="text-5xl font-black mt-2">{venues.length}</h3>
        </div>
      </div>

      <div>
        <h4 className="font-black uppercase text-xs tracking-widest mb-6 ml-2 opacity-50">🔥 Popular This Week</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {popularEvents.map(event => (
            <div key={event.id} className="relative group overflow-hidden rounded-[2.5rem] h-52 shadow-lg cursor-pointer">
              <img src={event.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={event.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent"></div>
              <div className="absolute bottom-6 left-8 text-white">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{event.price}</p>
                <h5 className="text-2xl font-black">{event.name}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} rounded-[2.5rem] border overflow-hidden shadow-sm`}>
        <div className={`p-6 border-b ${isDark ? 'border-slate-800 bg-slate-800/50' : 'border-slate-50 bg-slate-50/50'}`}>
           <h4 className="font-black uppercase text-xs tracking-widest opacity-50">Quick Venue Booking</h4>
        </div>
        <table className="w-full text-left">
          <tbody className="divide-y divide-slate-800/20">
            {venues.map((v, i) => (
              <tr key={i} className="hover:bg-blue-600/5 transition-colors group">
                <td className="p-6 font-bold opacity-80">📍 {v}</td>
                <td className="p-6 text-right">
                  <button onClick={() => onBook({name: v, price: '₹999'})} className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold opacity-0 group-hover:opacity-100 shadow-lg active:scale-95 transition-all">Quick Book</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;