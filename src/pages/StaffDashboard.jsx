import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaSignOutAlt, FaChevronDown, FaCamera, FaRunning, FaUtensils, FaMoon, FaStar, FaCalendarAlt, FaUsers, FaCheckCircle, FaRegCommentDots, FaRegClock, FaClipboardCheck, FaRegPlusSquare, FaUserFriends, FaRegEnvelope, FaPalette } from 'react-icons/fa';
import Navbar from '../components/Navbar';

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
    { id: 'Schedule', label: 'Schedule', icon: <FaCalendarAlt className="text-gray-400" /> },
  ];

  return (
    <div className="min-h-screen bg-theme-page font-sans text-theme-main transition-colors duration-300">
      <Navbar unreadCount={2} />

      {/* Main Container */}
      <main className="relative">
        {/* Background Banner with Image and Overlay */}
        <div className="absolute top-0 left-0 w-full h-80 overflow-hidden">
          <img 
            src="/daycare-bg.png" 
            alt="Daycare Background" 
            className="w-full h-full object-cover opacity-40 grayscale-[20%] sepia-[10%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#80D0C7]/80 to-[#00bea3]/60 mix-blend-multiply"></div>
          
          <div className="absolute inset-0 max-w-[1200px] mx-auto px-10 flex flex-col justify-center pb-20">
            <h1 className="text-5xl font-black text-white tracking-tighter mb-2 drop-shadow-md">Rainbow Room</h1>
            <p className="text-white/90 font-bold text-lg tracking-wide drop-shadow-sm">3-4 years • 12/15 Students</p>
          </div>
        </div>
        
        <div className="max-w-[1200px] mx-auto px-8 relative pt-52 animate-in fade-in slide-in-from-top-4 duration-700">
          
          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 mt-8">
            {stats.map((stat, idx) => (
              <div key={idx} className={`${stat.color} dark:bg-opacity-10 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all border border-theme`}>
                 <div className={`${stat.iconColor} text-3xl mb-4 bg-white/40 dark:bg-black/20 p-3 rounded-2xl`}>
                   {stat.icon}
                 </div>
                 <h4 className="text-theme-muted text-[11px] font-bold uppercase tracking-widest mb-1">{stat.title}</h4>
                 <div className="flex items-baseline gap-2">
                   <span className="text-3xl font-black text-theme-main tracking-tighter">{stat.value}</span>
                   {stat.subValue && <span className="text-theme-muted text-[10px] font-bold">{stat.subValue}</span>}
                 </div>
              </div>
            ))}
          </div>

          {/* Tab Navigation Below Cards */}
          <div className="flex justify-center mb-10">
            <div className="bg-theme-subtle rounded-full p-1.5 flex items-center gap-1 shadow-inner border border-theme">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-8 py-3.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-theme-card text-theme-main shadow-md'
                      : 'text-theme-muted hover:text-theme-main'
                  }`}
                >
                  <span className={activeTab === tab.id ? 'text-[#3498DB]' : ''}>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form Section */}
          <div className="max-w-5xl mx-auto bg-theme-card rounded-2xl shadow-sm border border-theme p-10 mb-20">
             <h2 className="text-2xl font-black text-theme-main mb-8">Log New Activity</h2>

             <div className="space-y-8">
               {/* Activity Type Selection */}
               <section>
                 <label className="block text-[10px] font-black text-theme-light uppercase tracking-widest mb-4 ml-1">Activity Type</label>
                 <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                   {activityTypes.map((type) => (
                     <button
                      key={type.id}
                      onClick={() => {
                        if (type.id === 'Schedule') {
                          navigate('/schedule');
                        } else {
                          setActiveActivityType(type.id);
                        }
                      }}
                      className={`flex flex-col items-center justify-center py-6 px-4 rounded-xl border transition-all duration-300 group ${
                        activeActivityType === type.id
                          ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 text-[#3498DB] shadow-sm'
                          : 'border-theme bg-theme-page text-theme-muted hover:border-blue-200'
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
                 <label className="block text-[10px] font-black text-theme-light uppercase tracking-widest mb-4 ml-1">Select Child</label>
                 <div className="relative">
                    <select className="w-full h-14 bg-theme-input border border-theme rounded-full px-8 font-bold text-theme-main focus:ring-2 focus:ring-blue-100 outline-none transition-all appearance-none cursor-pointer">
                      <option value="">Choose a student...</option>
                      <option value="1">Aarav Sharma</option>
                      <option value="2">Vivaan Gupta</option>
                      <option value="3">Isha Patel</option>
                    </select>
                    <FaChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-theme-muted pointer-events-none" />
                 </div>
               </section>

               {/* Activity Title */}
               <section>
                 <label className="block text-[10px] font-black text-theme-light uppercase tracking-widest mb-4 ml-1">Activity Title</label>
                 <input 
                  type="text" 
                  placeholder="e.g., Painting Session" 
                  className="w-full h-14 bg-theme-input border border-theme rounded-lg px-8 font-bold text-theme-main focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-theme-muted"
                 />
               </section>

               {/* Description Textarea */}
               <section>
                 <label className="block text-[10px] font-black text-theme-light uppercase tracking-widest mb-4 ml-1">Description</label>
                 <textarea 
                  rows="4" 
                  placeholder="Describe the activity, meals, or observations..." 
                  className="w-full bg-theme-input border border-theme rounded-lg p-8 font-bold text-theme-main focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none placeholder:text-theme-muted"
                 />
               </section>

               {/* Add Photo Area */}
               <section>
                 <label className="block text-[10px] font-black text-theme-light uppercase tracking-widest mb-4 ml-1">Add Photo (Optional)</label>
                 <div className="w-full h-40 border-2 border-dashed border-theme rounded-xl bg-theme-input flex flex-col items-center justify-center gap-3 hover:border-blue-200 hover:bg-blue-50/10 transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-theme-card rounded-xl flex items-center justify-center shadow-sm text-theme-muted group-hover:text-blue-400">
                      <FaCamera className="text-xl" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-theme-muted group-hover:text-blue-400 transition-colors">Click to upload photo</span>
                 </div>
               </section>

               {/* Log Button */}
               <div className="pt-4">
                 <button className="w-full h-16 bg-gradient-to-r from-[#3498DB] to-[#2980B9] text-white font-black text-[12px] uppercase tracking-widest rounded-full shadow-lg shadow-blue-100/20 hover:shadow-xl transition-all active:scale-95">
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
