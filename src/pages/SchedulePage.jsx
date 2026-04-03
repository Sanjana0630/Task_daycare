import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaChevronLeft, FaChevronRight, 
  FaPlus, FaSearch, FaCalendarDay, FaCalendarAlt, 
  FaClock, FaMapMarkerAlt,
  FaUtensils, FaRunning, FaMoon, FaMusic, FaPaintBrush, FaBookOpen,
  FaEdit, FaTrashAlt, FaCheck, FaSync
} from 'react-icons/fa';
import Navbar from '../components/Navbar';

const SchedulePage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const scrollContainerRef = useRef(null);

  // Mock Data
  const [activities] = useState([
    { id: 1, name: 'Breakfast', time: '08:00 AM', endTime: '08:45 AM', children: 12, status: 'Completed', icon: <FaUtensils />, location: 'Dining Hall', description: 'Healthy morning meal', progress: 100 },
    { id: 2, name: 'Free Play', time: '09:00 AM', endTime: '10:00 AM', children: 15, status: 'Completed', icon: <FaRunning />, location: 'Indoor Play Area', description: 'Supervised free play', progress: 100 },
    { id: 3, name: 'Art Session', time: '10:15 AM', endTime: '11:15 AM', children: 14, status: 'Ongoing', icon: <FaPaintBrush />, location: 'Creative Studio', description: 'Finger painting and crafts', progress: 65 },
    { id: 4, name: 'Story Time', time: '11:30 AM', endTime: '12:00 PM', children: 15, status: 'Upcoming', icon: <FaBookOpen />, location: 'Reading Corner', description: 'Traditional folk tales', progress: 0 },
    { id: 5, name: 'Lunch', time: '12:15 PM', endTime: '01:00 PM', children: 15, status: 'Upcoming', icon: <FaUtensils />, location: 'Dining Hall', description: 'Nutritious lunch', progress: 0 },
    { id: 6, name: 'Nap Time', time: '01:15 PM', endTime: '03:00 PM', children: 15, status: 'Upcoming', icon: <FaMoon />, location: 'Rest Zone', description: 'Quiet rest period', progress: 0 },
    { id: 7, name: 'Outdoor Play', time: '03:15 PM', endTime: '04:15 PM', children: 15, status: 'Upcoming', icon: <FaRunning />, location: 'Playground', description: 'Garden activities', progress: 0 },
    { id: 8, name: 'Music Class', time: '04:30 PM', endTime: '05:15 PM', children: 12, status: 'Upcoming', icon: <FaMusic />, location: 'Main Hall', description: 'Rhythm and songs', progress: 0 },
  ]);



  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === 'All') return matchesSearch;
    if (activeFilter === 'Today') return matchesSearch; 
    if (activeFilter === 'Upcoming') return matchesSearch && activity.status === 'Upcoming';
    if (activeFilter === 'Completed') return matchesSearch && activity.status === 'Completed';
    return matchesSearch;
  });

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const completionPercentage = Math.round((activities.filter(a => a.status === 'Completed').length / activities.length) * 100);

  return (
    <div className="min-h-screen bg-theme-page font-sans text-theme-main transition-colors duration-300">
      <Navbar unreadCount={2} />

      <main className="max-w-full mx-auto px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-start gap-4">
            <button 
              onClick={() => navigate('/')}
              className="mt-1 w-8 h-8 flex items-center justify-center bg-theme-card border border-theme text-theme-muted hover:text-[#3498DB] rounded-lg shadow-sm transition-all"
              title="Back to Dashboard"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <div>
              <h1 className="text-2xl font-semibold text-theme-main tracking-tight">Schedule Overview</h1>
              <p className="text-sm text-theme-muted flex items-center gap-2">
                <FaCalendarDay className="text-[#3498DB] text-xs" /> Manage and track daily activities for Rainbow Room
              </p>
            </div>
          </div>
          
          {/* Quick Action Bar */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowAddModal(true)}
              className="group flex items-center gap-2 px-4 py-2 bg-[#3498DB] text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-50/20 hover:bg-[#2980B9] transition-all"
            >
              <FaPlus className="text-xs" /> Add Schedule
            </button>
            <button className="p-2.5 bg-theme-card border border-theme text-theme-muted hover:text-[#3498DB] rounded-xl shadow-sm transition-all">
              <FaCalendarAlt className="text-sm" />
            </button>
            <button className="p-2.5 bg-theme-card border border-theme text-theme-muted hover:text-[#3498DB] rounded-xl shadow-sm transition-all">
              <FaSync className="text-sm" />
            </button>
          </div>
        </div>

        {/* Day Switcher */}
        <div className="flex items-center justify-between mb-6 bg-theme-card p-3 rounded-2xl border border-theme shadow-sm">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => changeDate(-1)}
              className="w-8 h-8 flex items-center justify-center bg-theme-subtle text-theme-muted hover:text-theme-main rounded-lg transition-all"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <div className="text-center">
              <h2 className="text-base font-semibold text-theme-main">{formatDate(currentDate)}</h2>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3498DB]">Staff View</p>
            </div>
            <button 
              onClick={() => changeDate(1)}
              className="w-8 h-8 flex items-center justify-center bg-theme-subtle text-theme-muted hover:text-theme-main rounded-lg transition-all"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </div>
          <button 
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-1.5 bg-theme-subtle text-theme-muted font-semibold text-[10px] uppercase tracking-widest rounded-lg hover:bg-theme-card transition-all border border-theme"
          >
            Go to Today
          </button>
        </div>

        {/* Progress Section */}
        <div className="bg-theme-card rounded-3xl p-6 shadow-sm border border-theme mb-10">
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#3498DB]">Daily Progress</span>
              <h3 className="text-2xl font-black text-theme-main">{completionPercentage}% Day Completed</h3>
            </div>
            <span className="text-theme-muted font-bold text-sm">
              {activities.filter(a => a.status === 'Completed').length} of {activities.length} completed
            </span>
          </div>
          <div className="w-full h-3 bg-theme-subtle rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#80D0C7] to-[#00bea3] transition-all duration-1000 ease-out"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="w-full">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1 group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted text-sm group-focus-within:text-[#3498DB] transition-colors" />
              <input 
                type="text" 
                placeholder="Find an activity..."
                className="w-full h-10 pl-10 pr-4 bg-theme-card border border-theme rounded-xl text-sm text-theme-main focus:ring-2 focus:ring-blue-50/20 focus:border-blue-100 outline-none transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex bg-theme-card p-1 rounded-xl border border-theme shadow-sm grow-0">
              {['All', 'Today', 'Upcoming', 'Completed'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-all ${
                    activeFilter === filter 
                      ? 'bg-[#3498DB] text-white shadow-md shadow-blue-50/20' 
                      : 'text-theme-muted hover:text-theme-main hover:bg-theme-subtle'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Schedule View */}
          {filteredActivities.length > 0 ? (
            <div className="relative group">
              {/* Navigation Arrows */}
              <button 
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 z-20 w-14 h-14 bg-theme-card rounded-full shadow-xl border border-theme flex items-center justify-center text-theme-muted hover:text-[#3498DB] opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95"
              >
                <FaChevronLeft className="text-xl" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-6 z-20 w-14 h-14 bg-theme-card rounded-full shadow-xl border border-theme flex items-center justify-center text-theme-muted hover:text-[#3498DB] opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95"
              >
                <FaChevronRight className="text-xl" />
              </button>

              <div 
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto pb-12 pt-4 snap-x no-scrollbar scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {filteredActivities.map((activity) => (
                  <div 
                    key={activity.id}
                    className={`flex-shrink-0 w-full md:w-[calc(50%-1.5rem)] xl:w-[calc(25%-1.5rem)] snap-start group/card bg-theme-card rounded-2xl p-4 transition-all duration-300 relative border cursor-grab active:cursor-grabbing hover:scale-[1.02] hover:shadow-xl hover:z-30 ${
                      activity.status === 'Ongoing'
                        ? 'border-[#3498DB] ring-4 ring-blue-50/20'
                        : activity.status === 'Completed'
                        ? 'border-theme opacity-90'
                        : 'border-transparent shadow-sm'
                    }`}
                  >
                    {/* Hover Actions */}
                    <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover/card:opacity-100 transition-all transform translate-y-2 group-hover/card:translate-y-0 z-10">
                      <button title="Edit" className="w-8 h-8 bg-theme-card shadow-md border border-theme text-theme-muted hover:text-blue-500 rounded-lg flex items-center justify-center transition-all text-xs"><FaEdit /></button>
                      <button title="Delete" className="w-8 h-8 bg-theme-card shadow-md border border-theme text-theme-muted hover:text-red-500 rounded-lg flex items-center justify-center transition-all text-xs"><FaTrashAlt /></button>
                      {activity.status !== 'Completed' && (
                        <button title="Mark Complete" className="w-8 h-8 bg-theme-card shadow-md border border-theme text-theme-muted hover:text-green-500 rounded-lg flex items-center justify-center transition-all text-xs"><FaCheck /></button>
                      )}
                    </div>

                    {/* Status Badge */}
                    <div className="mb-4 flex justify-between items-start">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${
                        activity.status === 'Ongoing' ? 'bg-blue-50 dark:bg-blue-900/20 text-[#3498DB]' : 
                        activity.status === 'Completed' ? 'bg-green-50 dark:bg-green-900/20 text-[#00bea3]' : 'bg-theme-subtle text-theme-muted'
                      }`}>
                        {activity.icon}
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                        activity.status === 'Ongoing' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' :
                        activity.status === 'Completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' :
                        'bg-theme-subtle text-theme-muted'
                      }`}>
                        {activity.status}
                      </span>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-base font-semibold text-theme-main mb-1 leading-tight">{activity.name}</h3>
                      <p className="text-theme-muted text-xs font-medium flex items-center gap-2">
                         <FaClock className="text-[10px] text-[#3498DB]" /> {activity.time} – {activity.endTime}
                      </p>
                      {activity.status === 'Ongoing' && (
                        <p className="text-[#3498DB] text-[9px] font-semibold uppercase mt-1.5 animate-pulse">
                          Ends in 20 mins
                        </p>
                      )}
                    </div>

                    {/* Activity Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] font-semibold text-theme-light uppercase tracking-widest">Activity Progress</span>
                        <span className="text-[10px] font-semibold text-theme-main">{activity.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-theme-subtle rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ${
                            activity.status === 'Ongoing' ? 'bg-[#3498DB]' : 
                            activity.status === 'Completed' ? 'bg-[#00bea3]' : 'bg-theme-muted/20'
                          }`}
                          style={{ width: `${activity.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Footer: Kids and Location */}
                    <div className="flex items-center justify-between pt-4 border-t border-theme mt-auto">
                      <div className="flex items-center -space-x-2">
                         {[1,2,3].map(i => (
                           <div key={i} className="w-6 h-6 rounded-full border border-theme bg-theme-subtle flex items-center justify-center text-[6px] font-semibold text-theme-muted overflow-hidden">
                             <img src={`https://i.pravatar.cc/100?u=${activity.id}-${i}`} alt="kid" className="w-full h-full object-cover" />
                           </div>
                         ))}
                         <div className="w-6 h-6 rounded-full border border-theme bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[7px] font-semibold text-[#3498DB] relative z-10">
                           +{activity.children - 3}
                         </div>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-theme-subtle rounded-lg">
                        <FaMapMarkerAlt className="text-theme-muted text-[10px]" />
                        <span className="text-[9px] font-semibold text-theme-muted">{activity.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 bg-theme-card rounded-[40px] border border-dashed border-theme">
              <div className="w-24 h-24 bg-theme-subtle rounded-full flex items-center justify-center mb-6">
                <FaCalendarDay className="text-4xl text-theme-muted" />
              </div>
              <h3 className="text-2xl font-black text-theme-main mb-2">No schedule for today</h3>
              <p className="text-theme-muted font-bold">Try adjusting your filters or search query</p>
              <button 
                onClick={() => {setActiveFilter('All'); setSearchQuery('');}}
                className="mt-8 px-8 py-3 bg-theme-subtle text-theme-muted font-black text-xs uppercase tracking-widest rounded-full hover:bg-theme-card transition-all"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Add Schedule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-theme-card w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-theme">
            <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-3xl font-black text-theme-main tracking-tight">Add New Activity</h2>
                  <p className="text-theme-muted font-bold">Plan a new event for the kids</p>
                </div>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="w-12 h-12 bg-theme-subtle text-theme-muted hover:text-theme-main rounded-full flex items-center justify-center transition-all"
                >
                  <FaPlus className="rotate-45" />
                </button>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <section>
                    <label className="block text-[10px] font-black text-theme-muted uppercase tracking-widest mb-3 ml-1">Activity Name</label>
                    <input type="text" placeholder="e.g., Afternoon Art" className="w-full h-14 bg-theme-subtle border-0 rounded-2xl px-6 font-bold text-theme-main outline-none focus:ring-4 focus:ring-blue-100/20 transition-all" />
                  </section>
                  <section>
                    <label className="block text-[10px] font-black text-theme-muted uppercase tracking-widest mb-3 ml-1">Location</label>
                    <input type="text" placeholder="e.g., Playground" className="w-full h-14 bg-theme-subtle border-0 rounded-2xl px-6 font-bold text-theme-main outline-none focus:ring-4 focus:ring-blue-100/20 transition-all" />
                  </section>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  <section>
                    <label className="block text-[10px] font-black text-theme-muted uppercase tracking-widest mb-3 ml-1">Start Time</label>
                    <input type="time" className="w-full h-14 bg-theme-subtle border-0 rounded-2xl px-6 font-bold text-theme-main outline-none focus:ring-4 focus:ring-blue-100/20 transition-all" />
                  </section>
                  <section>
                    <label className="block text-[10px] font-black text-theme-muted uppercase tracking-widest mb-3 ml-1">End Time</label>
                    <input type="time" className="w-full h-14 bg-theme-subtle border-0 rounded-2xl px-6 font-bold text-theme-main outline-none focus:ring-4 focus:ring-blue-100/20 transition-all" />
                  </section>
                  <section className="col-span-2 lg:col-span-1">
                    <label className="block text-[10px] font-black text-theme-muted uppercase tracking-widest mb-3 ml-1">Children Count</label>
                    <input type="number" placeholder="15" className="w-full h-14 bg-theme-subtle border-0 rounded-2xl px-6 font-bold text-theme-main outline-none focus:ring-4 focus:ring-blue-100/20 transition-all" />
                  </section>
                </div>

                <section>
                  <label className="block text-[10px] font-black text-theme-muted uppercase tracking-widest mb-3 ml-1">Description</label>
                  <textarea rows="3" placeholder="What will the kids be doing?" className="w-full bg-theme-subtle border-0 rounded-[24px] p-6 font-bold text-theme-main outline-none focus:ring-4 focus:ring-blue-100/20 transition-all resize-none"></textarea>
                </section>

                <div className="pt-6 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 h-16 bg-theme-subtle text-theme-muted font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-theme-card transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] h-16 bg-gradient-to-r from-[#3498DB] to-[#2980B9] text-white font-black text-xs uppercase tracking-[0.2em] rounded-full shadow-xl shadow-blue-100/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
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
