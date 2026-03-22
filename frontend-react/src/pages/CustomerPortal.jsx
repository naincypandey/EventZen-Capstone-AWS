import React from 'react';

const CustomerPortal = ({ venues, bookings, user }) => {
  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black italic">Hello, {user.name}</h1>
          <p className="opacity-50 font-medium uppercase tracking-widest text-xs">Customer Portal</p>
        </div>
        <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black shadow-lg shadow-blue-500/30">
          Manage Profile
        </div>
      </header>

      {/* Hero Stats */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl">
          <h4 className="opacity-50 text-xs font-bold uppercase mb-2">Active Tickets</h4>
          <p className="text-5xl font-black">{bookings.length}</p>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h4 className="opacity-50 text-xs font-bold uppercase mb-2">Available Venues</h4>
          <p className="text-5xl font-black">{venues.length}</p>
        </div>
      </div>

      <section>
        <h3 className="text-2xl font-black mb-6">Explore Premium Venues</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {venues.map(v => (
            <div key={v.id} className="group relative h-64 rounded-[2.5rem] overflow-hidden shadow-lg">
              <img src={v.image || "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg"} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end text-white">
                <h4 className="text-2xl font-black">{v.name}</h4>
                <p className="text-sm opacity-70 mb-4">{v.location}</p>
                <button className="bg-white text-black py-3 px-8 rounded-2xl font-black text-sm w-fit active:scale-95 transition-all">Book Venue</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CustomerPortal;