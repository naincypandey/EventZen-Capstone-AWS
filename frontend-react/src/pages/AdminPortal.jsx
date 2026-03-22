import React from 'react';

const AdminPortal = ({ venues, bookings, vendors, users }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header>
        <h1 className="text-4xl font-black">Admin Management Console</h1>
        <p className="opacity-50">Microservices: Spring Boot, .NET, Node.js active</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pillar 1: Venue & Event Management */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">📍 Venue & Events (.NET)</h3>
          <div className="space-y-4">
            {venues.map(v => (
              <div key={v.id} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <span>{v.name}</span>
                <button className="text-blue-600 font-bold text-xs uppercase">Edit</button>
              </div>
            ))}
            <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold">+ Add New Venue</button>
          </div>
        </section>

        {/* Pillar 2: Attendee Management */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">🎟️ Attendee Control (Node.js)</h3>
          <div className="max-h-60 overflow-y-auto space-y-3">
            {bookings.map((b, i) => (
              <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl flex justify-between">
                <div><p className="font-bold text-sm">{b.name}</p><p className="text-[10px] opacity-50">{b.eventId}</p></div>
                <span className="text-green-500 font-black">CONFIRMED</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pillar 3: Vendor Management */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">🤝 Vendor Management (MySQL)</h3>
          <div className="grid grid-cols-2 gap-4">
            {vendors.map((vend, i) => (
              <div key={i} className="p-4 border border-slate-100 dark:border-slate-800 rounded-2xl text-center">
                <p className="font-black text-sm">{vend.company}</p>
                <p className="text-xs opacity-50">{vend.service}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPortal;