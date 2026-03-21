import React, { useState } from 'react';
import { FaBell, FaSignOutAlt, FaChevronDown, FaCamera, FaRunning, FaUtensils, FaMoon, FaStar, FaCalendarAlt } from 'react-icons/fa';

const LogActivityPage = () => {
  const [activeType, setActiveType] = useState('Activity');

  const activityTypes = [
    { id: 'Activity', label: 'Activity', icon: <FaRunning /> },
    { id: 'Meal', label: 'Meal', icon: <FaUtensils /> },
    { id: 'Nap', label: 'Nap', icon: <FaMoon /> },
    { id: 'Milestone', label: 'Milestone', icon: <FaStar /> },
    { id: 'Schedule', label: 'Schedule', icon: <FaCalendarAlt /> },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-[#2D3436]">
      {/* Navbar */}
      <nav className="bg-white px-8 py-4 flex items-center justify-between shadow-sm border-b border-gray-100">
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-[#ff6d34] to-[#ff8e5e] rounded-xl flex items-center justify-center shadow-lg shadow-orange-100">
            <div className="w-5 h-5 bg-white/20 rounded-md rotate-45"></div>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-[#2D3436]">Little Dreamers</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-[#ff6d34] -mt-1 opacity-80">Staff Portal</p>
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-8">
          <button className="relative p-2.5 bg-gray-50 text-gray-400 hover:text-[#ff6d34] hover:bg-orange-50 rounded-xl transition-all border border-transparent hover:border-orange-100">
            <FaBell />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#ff6d34] rounded-full border-2 border-white"></span>
          </button>

          <div className="flex items-center gap-4 pl-8 border-l border-gray-100">
            <div className="text-right hidden md:block">
              <h3 className="text-sm font-black text-[#2D3436]">Ms. Jenny</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rainbow Room Teacher</p>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-white shadow-md overflow-hidden bg-gray-100 ring-2 ring-gray-50">
              <img src="https://ui-avatars.com/api/?name=Jenny+Staff&background=ff6d34&color=fff" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button className="ml-2 px-4 py-2 bg-gray-100 text-gray-500 font-bold rounded-xl text-xs hover:bg-gray-200 transition-all flex items-center gap-2">
              <FaSignOutAlt className="text-[10px]" /> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 p-12 border border-white overflow-hidden relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 -mr-16 -mt-16 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50 -ml-16 -mb-16 rounded-full blur-3xl opacity-50"></div>

          <h2 className="text-3xl font-black text-[#2D3436] mb-10 tracking-tight flex items-center gap-4">
             Log New Information
          </h2>

          <div className="space-y-10 relative z-10">
            {/* Section: Activity Type */}
            <section>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1">Activity Type</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {activityTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveType(type.id)}
                    className={`flex flex-col items-center justify-center p-6 rounded-[24px] border-2 transition-all duration-300 group ${
                      activeType === type.id
                        ? 'bg-blue-50 border-blue-400 text-[#3498DB] shadow-lg shadow-blue-100'
                        : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`text-2xl mb-3 transition-transform duration-500 group-hover:scale-110 ${activeType === type.id ? 'animate-pulse' : ''}`}>
                      {type.icon}
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest">{type.label}</span>
                  </button>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Section: Select Child */}
              <section>
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1">Select Child</label>
                <div className="relative group">
                  <select className="w-full h-[64px] bg-gray-50 border-0 rounded-full px-8 font-bold text-[#2D3436] focus:ring-4 focus:ring-blue-100 outline-none transition-all appearance-none cursor-pointer">
                    <option value="">Choose a student...</option>
                    <option value="1">Aarav Sharma</option>
                    <option value="2">Vivaan Gupta</option>
                    <option value="3">Isha Patel</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300 group-hover:text-blue-400 transition-colors">
                    <FaChevronDown />
                  </div>
                </div>
              </section>

              {/* Section: Activity Title */}
              <section>
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1">Activity Title</label>
                <input 
                  type="text" 
                  placeholder="e.g., Painting Session" 
                  className="w-full h-[64px] bg-gray-50 border-0 rounded-2xl px-8 font-bold text-[#2D3436] focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-300"
                />
              </section>
            </div>

            {/* Section: Description */}
            <section>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1">Description</label>
              <textarea 
                rows="4" 
                placeholder="Describe the activity, meals, or observations..." 
                className="w-full bg-gray-50 border-0 rounded-[32px] p-8 font-bold text-[#2D3436] focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none placeholder:text-gray-300"
              />
            </section>

            {/* Section: Add Photo */}
            <section>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1">Add Photo (Optional)</label>
              <div className="w-full h-[200px] border-4 border-dashed border-gray-100 rounded-[40px] flex flex-col items-center justify-center gap-4 hover:border-blue-200 hover:bg-blue-50 transition-all cursor-pointer group group">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center text-gray-300 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-500">
                  <FaCamera className="text-2xl" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 group-hover:text-blue-400 transition-colors">Click to upload photo</span>
              </div>
            </section>

            {/* Submit Button */}
            <div className="pt-6">
              <button className="w-full h-[72px] bg-gradient-to-r from-[#3498DB] to-[#2980B9] text-white font-black text-sm uppercase tracking-[0.3em] rounded-full shadow-2xl shadow-blue-200 hover:scale-[1.02] hover:shadow-blue-300 active:scale-[0.98] transition-all duration-300">
                Log {activeType} Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LogActivityPage;
