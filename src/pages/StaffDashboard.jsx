import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaSignOutAlt, FaChevronDown, FaCamera, FaRunning, FaUtensils, FaMoon, FaStar, FaExclamationTriangle, FaUsers, FaCheckCircle, FaRegCommentDots, FaRegClock, FaClipboardCheck, FaRegPlusSquare, FaUserFriends, FaRegEnvelope, FaPalette } from 'react-icons/fa';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Log Activity');
  const [activeActivityType, setActiveActivityType] = useState('Activity');

  const stats = [
    { title: "Present Today", value: "2", subValue: "of 2 students", icon: <FaUsers />, color: "bg-[#EAF8F6]", iconColor: "text-[#00bea3]" },
    { title: "Activities", value: "12", subValue: "logged today", icon: <FaCheckCircle />, color: "bg-[#F0F7FF]", iconColor: "text-[#3498DB]" },
    { title: "Messages", value: "3", subValue: "from parents", icon: <FaRegCommentDots />, color: "bg-[#FFF9E6]", iconColor: "text-[#F1C40F]" },
    { title: "Next Activity", value: "Lunch", subValue: "in 45 minutes", icon: <FaRegClock />, color: "bg-[#F0F7FF]", iconColor: "text-[#3498DB]" },
  ];

  const tabs = [
    { id: 'Attendance', label: 'Attendance', icon: <FaClipboardCheck /> },
    { id: 'Log Activity', label: 'Log Activity', icon: <FaRegPlusSquare /> },
    { id: 'My Students', label: 'My Students', icon: <FaUserFriends /> },
    { id: 'Messages', label: 'Messages', icon: <FaRegEnvelope /> },
  ];

  const activityTypes = [
    { id: 'Activity', label: 'Activity', icon: <FaPalette className="text-[#3498DB]" /> },
    { id: 'Meal', label: 'Meal', icon: <FaUtensils className="text-gray-400" /> },
    { id: 'Nap', label: 'Nap', icon: <FaMoon className="text-gray-400" /> },
    { id: 'Milestone', label: 'Milestone', icon: <FaStar className="text-gray-400" /> },
    { id: 'Incident', label: 'Incident', icon: <FaExclamationTriangle className="text-gray-400" /> },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-gray-800">
      {/* Navbar */}
      <nav className="bg-white px-8 py-5 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#80D0C7] rounded-[14px] flex items-center justify-center shadow-lg shadow-teal-50">
             <div className="w-6 h-6 bg-white/40 rounded-full"></div>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-gray-800 leading-none">Little Dreamers</h1>
            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] mt-1">Staff Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/alerts')}
            className="relative p-2.5 bg-gray-50 text-gray-400 hover:text-teal-400 rounded-xl transition-all"
          >
            <FaBell />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full border-2 border-white"></span>
          </button>

          <div className="flex items-center gap-4 pl-6 border-l border-gray-100">
            <div className="text-right hidden md:block">
              <h3 className="text-sm font-black text-gray-800">Ms. Jenny</h3>
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Rainbow Room Teacher</p>
            </div>
            <div className="w-11 h-11 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-100">
              <img src="https://ui-avatars.com/api/?name=Jenny+Staff&background=80D0C7&color=fff" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-500 font-bold rounded-xl text-[10px] hover:bg-gray-100 transition-all ml-1 border border-gray-100">
               <FaSignOutAlt className="text-[10px]" /> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="relative">
        {/* Background Banner with Image and Overlay */}
        <div className="absolute top-0 left-0 w-full h-80 overflow-hidden">
          <img 
            src="/daycare-bg.png" 
            alt="Daycare Background" 
            className="w-full h-full object-cover opacity-60 grayscale-[20%] sepia-[10%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#80D0C7]/80 to-[#00bea3]/60 mix-blend-multiply"></div>
          
          <div className="absolute inset-0 max-w-[1200px] mx-auto px-10 flex flex-col justify-center pb-20">
            <h1 className="text-5xl font-black text-white tracking-tighter mb-2 drop-shadow-md">Rainbow Room</h1>
            <p className="text-white/90 font-bold text-lg tracking-wide drop-shadow-sm">3-4 years • 12/15 Students</p>
          </div>
        </div>
        
        <div className="max-w-[1200px] mx-auto px-8 relative pt-52 animate-in fade-in slide-in-from-top-4 duration-700">
          
          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className={`${stat.color} rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all`}>
                 <div className={`${stat.iconColor} text-3xl mb-4 bg-white/40 p-3 rounded-2xl`}>
                   {stat.icon}
                 </div>
                 <h4 className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-1">{stat.title}</h4>
                 <div className="flex items-baseline gap-2">
                   <span className="text-3xl font-black text-gray-800 tracking-tighter">{stat.value}</span>
                   {stat.subValue && <span className="text-gray-400 text-[10px] font-bold">{stat.subValue}</span>}
                 </div>
              </div>
            ))}
          </div>

          {/* Tab Navigation Below Cards */}
          <div className="flex justify-center mb-10">
            <div className="bg-gray-50 rounded-full p-1.5 flex items-center gap-1 shadow-inner border border-gray-100">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-8 py-3.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-gray-800 shadow-md'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <span className={activeTab === tab.id ? 'text-[#3498DB]' : ''}>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form Section */}
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-50 p-10 mb-20">
             <h2 className="text-2xl font-black text-gray-800 mb-8">Log New Activity</h2>

             <div className="space-y-8">
               {/* Activity Type Selection */}
               <section>
                 <label className="block text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4 ml-1">Activity Type</label>
                 <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                   {activityTypes.map((type) => (
                     <button
                      key={type.id}
                      onClick={() => setActiveActivityType(type.id)}
                      className={`flex flex-col items-center justify-center py-6 px-4 rounded-xl border transition-all duration-300 group ${
                        activeActivityType === type.id
                          ? 'border-blue-400 bg-blue-50 text-[#3498DB] shadow-sm'
                          : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
                      }`}
                     >
                       <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">{type.icon}</div>
                       <span className="text-[10px] font-black uppercase tracking-widest">{type.label}</span>
                     </button>
                   ))}
                 </div>
               </section>

               {/* Child Selector */}
               <section>
                 <label className="block text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4 ml-1">Select Child</label>
                 <div className="relative">
                    <select className="w-full h-14 bg-[#FEF9F5] border-0 rounded-full px-8 font-bold text-gray-700 focus:ring-2 focus:ring-blue-100 outline-none transition-all appearance-none cursor-pointer">
                      <option value="">Choose a student...</option>
                      <option value="1">Aarav Sharma</option>
                      <option value="2">Vivaan Gupta</option>
                      <option value="3">Isha Patel</option>
                    </select>
                    <FaChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                 </div>
               </section>

               {/* Activity Title */}
               <section>
                 <label className="block text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4 ml-1">Activity Title</label>
                 <input 
                  type="text" 
                  placeholder="e.g., Painting Session" 
                  className="w-full h-14 bg-[#FEF9F5] border border-orange-50 rounded-lg px-8 font-bold text-gray-700 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-300"
                 />
               </section>

               {/* Description Textarea */}
               <section>
                 <label className="block text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4 ml-1">Description</label>
                 <textarea 
                  rows="4" 
                  placeholder="Describe the activity, meals, or observations..." 
                  className="w-full bg-[#FEF9F5] border border-orange-50 rounded-lg p-8 font-bold text-gray-700 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none placeholder:text-gray-300"
                 />
               </section>

               {/* Add Photo Area */}
               <section>
                 <label className="block text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4 ml-1">Add Photo (Optional)</label>
                 <div className="w-full h-40 border-2 border-dashed border-orange-100 rounded-xl bg-[#FEF9F5] flex flex-col items-center justify-center gap-3 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-gray-200 group-hover:text-blue-400">
                      <FaCamera className="text-xl" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 group-hover:text-blue-400 transition-colors">Click to upload photo</span>
                 </div>
               </section>

               {/* Log Button */}
               <div className="pt-4">
                 <button className="w-full h-16 bg-gradient-to-r from-[#3498DB] to-[#2980B9] text-white font-black text-[12px] uppercase tracking-widest rounded-full shadow-lg shadow-blue-100 hover:shadow-xl transition-all active:scale-95">
                   Log Activity
                 </button>
               </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
