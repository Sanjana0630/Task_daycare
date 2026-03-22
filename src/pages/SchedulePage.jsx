import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBell, FaSignOutAlt, FaChevronLeft, FaChevronRight, 
  FaPlus, FaSearch, FaHistory, FaCalendarDay, FaCalendarAlt, 
  FaClock, FaUsers, FaMapMarkerAlt, FaCheckCircle, FaExclamationCircle,
  FaUtensils, FaRunning, FaMoon, FaStar, FaMusic, FaPaintBrush, FaBookOpen
} from 'react-icons/fa';
import Navbar from '../components/Navbar';

const SchedulePage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Today');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const scrollContainerRef = useRef(null);

  // Mock Data
  const [activities, setActivities] = useState([
    { id: 1, name: 'Breakfast', time: '08:00 AM', endTime: '08:45 AM', children: 12, status: 'Completed', icon: <FaUtensils />, location: 'Dining Hall', description: 'Healthy morning meal' },
    { id: 2, name: 'Free Play', time: '09:00 AM', endTime: '10:00 AM', children: 15, status: 'Completed', icon: <FaRunning />, location: 'Indoor Play Area', description: 'Supervised free play' },
    { id: 3, name: 'Art Session', time: '10:15 AM', endTime: '11:15 AM', children: 14, status: 'Ongoing', icon: <FaPaintBrush />, location: 'Creative Studio', description: 'Finger painting and crafts' },
    { id: 4, name: 'Story Time', time: '11:30 AM', endTime: '12:00 PM', children: 15, status: 'Upcoming', icon: <FaBookOpen />, location: 'Reading Corner', description: 'Traditional folk tales' },
    { id: 5, name: 'Lunch', time: '12:15 PM', endTime: '01:00 PM', children: 15, status: 'Upcoming', icon: <FaUtensils />, location: 'Dining Hall', description: 'Nutritious lunch' },
    { id: 6, name: 'Nap Time', time: '01:15 PM', endTime: '03:00 PM', children: 15, status: 'Upcoming', icon: <FaMoon />, location: 'Rest Zone', description: 'Quiet rest period' },
    { id: 7, name: 'Outdoor Play', time: '03:15 PM', endTime: '04:15 PM', children: 15, status: 'Upcoming', icon: <FaRunning />, location: 'Playground', description: 'Garden activities' },
    { id: 8, name: 'Music Class', time: '04:30 PM', endTime: '05:15 PM', children: 12, status: 'Upcoming', icon: <FaMusic />, location: 'Main Hall', description: 'Rhythm and songs' },
  ]);

  const ongoingActivity = activities.find(a => a.status === 'Ongoing');
  const nextActivity = activities.find(a => a.status === 'Upcoming');

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 300 : scrollLeft + 300;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === 'All') return matchesSearch;
    if (activeFilter === 'Today') return matchesSearch; // For mock, all are "today"
    if (activeFilter === 'Upcoming') return matchesSearch && activity.status === 'Upcoming';
    return matchesSearch;
  });

  const completionPercentage = Math.round((activities.filter(a => a.status === 'Completed').length / activities.length) * 100);

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-gray-800">
      <Navbar unreadCount={2} />

      <main className="max-w-[1400px] mx-auto px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Today's Schedule</h1>
            <p className="text-gray-400 font-bold flex items-center gap-2">
              <FaCalendarDay className="text-[#3498DB]" /> Manage and track daily activities for Rainbow Room
            </p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#3498DB] to-[#2980B9] text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-100 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <FaPlus /> Add Schedule
          </button>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-10">
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#3498DB]">Daily Progress</span>
              <h3 className="text-2xl font-black text-gray-800">{completionPercentage}% Day Completed</h3>
            </div>
            <span className="text-gray-400 font-bold text-sm">
              {activities.filter(a => a.status === 'Completed').length} of {activities.length} completed
            </span>
          </div>
          <div className="w-full h-3 bg-gray-50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#80D0C7] to-[#00bea3] transition-all duration-1000 ease-out"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                <input 
                  type="text" 
                  placeholder="Search activity..."
                  className="w-full h-14 pl-14 pr-6 bg-white border border-gray-100 rounded-full font-bold text-gray-700 focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none transition-all shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex bg-gray-50 p-1 rounded-full border border-gray-100 shadow-inner">
                {['All', 'Today', 'Upcoming'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-8 py-3 rounded-full font-black text-[11px] uppercase tracking-widest transition-all ${
                      activeFilter === filter 
                        ? 'bg-white text-gray-800 shadow-md' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Horizontal Schedule View */}
            <div className="relative group">
              {/* Navigation Arrows */}
              <button 
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#3498DB] opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
              >
                <FaChevronLeft />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#3498DB] opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
              >
                <FaChevronRight />
              </button>

              <div 
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {filteredActivities.map((activity, idx) => (
                  <div 
                    key={activity.id}
                    className={`flex-shrink-0 w-72 snap-start rounded-[32px] p-6 transition-all duration-300 relative border-2 ${
                      activity.status === 'Ongoing'
                        ? 'bg-white border-[#3498DB] shadow-2xl shadow-blue-100 ring-4 ring-blue-50 scale-[1.02] z-10'
                        : activity.status === 'Completed'
                        ? 'bg-[#F0FAF6] border-[#00bea3]/20 shadow-sm'
                        : 'bg-white border-gray-50 shadow-sm hover:shadow-md'
                    }`}
                  >
                    {activity.status === 'Completed' && (
                      <div className="absolute top-4 right-4 text-[#00bea3]">
                        <FaCheckCircle className="text-xl" />
                      </div>
                    )}
                    {activity.status === 'Ongoing' && (
                      <div className="absolute -top-3 left-6 px-3 py-1 bg-[#3498DB] text-white text-[9px] font-black uppercase tracking-widest rounded-full animate-pulse shadow-md">
                        Live Now
                      </div>
                    )}

                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 ${
                      activity.status === 'Ongoing' ? 'bg-blue-50 text-[#3498DB]' : 
                      activity.status === 'Completed' ? 'bg-white text-[#00bea3]' : 'bg-gray-50 text-gray-400'
                    }`}>
                      {activity.icon}
                    </div>

                    <h3 className="text-xl font-black text-gray-800 mb-1">{activity.name}</h3>
                    <p className="text-gray-400 text-sm font-bold mb-4 flex items-center gap-2">
                       <FaClock className="text-xs" /> {activity.time} - {activity.endTime}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                      <div className="flex items-center gap-2">
                        <FaUsers className="text-gray-300 text-sm" />
                        <span className="text-xs font-black text-gray-500">{activity.children} Kids</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-gray-300 text-sm" />
                        <span className="text-xs font-bold text-gray-400">{activity.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Panel */}
          <div className="w-full lg:w-80 space-y-6">
            {/* Current Activity Card */}
            <div className="bg-gradient-to-br from-[#3498DB] to-[#2980B9] rounded-[32px] p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 -mr-16 -mt-16 rounded-full blur-2xl"></div>
               <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-4 block">Currently Ongoing</span>
               {ongoingActivity ? (
                 <>
                   <h3 className="text-3xl font-black mb-2 tracking-tight">{ongoingActivity.name}</h3>
                   <p className="text-white/80 font-bold mb-6 flex items-center gap-2">
                     <FaClock className="opacity-60" /> Ends at {ongoingActivity.endTime}
                   </p>
                   <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                     <p className="text-xs font-bold leading-relaxed">{ongoingActivity.description}</p>
                   </div>
                 </>
               ) : (
                 <p className="font-bold">No active activity</p>
               )}
            </div>

            {/* Next Activity Card */}
            <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3498DB] mb-4 block">Coming Up Next</span>
               {nextActivity ? (
                 <>
                   <div className="flex items-center gap-4 mb-4">
                     <div className="w-12 h-12 bg-orange-50 text-[#ff6d34] rounded-xl flex items-center justify-center text-xl">
                       {nextActivity.icon}
                     </div>
                     <div>
                       <h4 className="text-xl font-black text-gray-800">{nextActivity.name}</h4>
                       <p className="text-[#ff6d34] text-xs font-black uppercase tracking-widest">{nextActivity.time}</p>
                     </div>
                   </div>
                   <button className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-500 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2">
                     View Details <FaChevronRight className="text-[10px]" />
                   </button>
                 </>
               ) : (
                 <p className="text-gray-400 font-bold">End of day reached</p>
               )}
            </div>

            {/* Quick Actions */}
            <div className="bg-[#FEF9F5] border border-orange-50 rounded-[32px] p-8">
               <h4 className="text-sm font-black text-gray-800 mb-6 uppercase tracking-widest">Quick Logs</h4>
               <div className="grid grid-cols-2 gap-4">
                 <button className="p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-2 border border-orange-50">
                    <FaUtensils className="text-[#3498DB]" />
                    <span className="text-[9px] font-black uppercase">Meal</span>
                 </button>
                 <button className="p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-2 border border-orange-50">
                    <FaExclamationCircle className="text-[#ff6d34]" />
                    <span className="text-[9px] font-black uppercase">Alert</span>
                 </button>
               </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Schedule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">Add New Activity</h2>
                  <p className="text-gray-400 font-bold">Plan a new event for the kids</p>
                </div>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="w-12 h-12 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-full flex items-center justify-center transition-all"
                >
                  <FaPlus className="rotate-45" />
                </button>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <section>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Activity Name</label>
                    <input type="text" placeholder="e.g., Afternoon Art" className="w-full h-14 bg-gray-50 border-0 rounded-2xl px-6 font-bold text-gray-700 outline-none focus:ring-4 focus:ring-blue-100 transition-all" />
                  </section>
                  <section>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Location</label>
                    <input type="text" placeholder="e.g., Playground" className="w-full h-14 bg-gray-50 border-0 rounded-2xl px-6 font-bold text-gray-700 outline-none focus:ring-4 focus:ring-blue-100 transition-all" />
                  </section>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  <section>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Start Time</label>
                    <input type="time" className="w-full h-14 bg-gray-50 border-0 rounded-2xl px-6 font-bold text-gray-700 outline-none focus:ring-4 focus:ring-blue-100 transition-all" />
                  </section>
                  <section>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">End Time</label>
                    <input type="time" className="w-full h-14 bg-gray-50 border-0 rounded-2xl px-6 font-bold text-gray-700 outline-none focus:ring-4 focus:ring-blue-100 transition-all" />
                  </section>
                  <section className="col-span-2 lg:col-span-1">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Children Count</label>
                    <input type="number" placeholder="15" className="w-full h-14 bg-gray-50 border-0 rounded-2xl px-6 font-bold text-gray-700 outline-none focus:ring-4 focus:ring-blue-100 transition-all" />
                  </section>
                </div>

                <section>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Description</label>
                  <textarea rows="3" placeholder="What will the kids be doing?" className="w-full bg-gray-50 border-0 rounded-[24px] p-6 font-bold text-gray-700 outline-none focus:ring-4 focus:ring-blue-100 transition-all resize-none"></textarea>
                </section>

                <div className="pt-6 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 h-16 bg-gray-100 text-gray-500 font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] h-16 bg-gradient-to-r from-[#3498DB] to-[#2980B9] text-white font-black text-xs uppercase tracking-[0.2em] rounded-full shadow-xl shadow-blue-100 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Create Schedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Styles for hiding scrollbar */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default SchedulePage;
