import { useState } from "react";
import ScheduleList from "../components/ScheduleList";
import AlertBox from "../components/AlertBox";
import { FaCalendarAlt } from "react-icons/fa";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState("Parent");

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans antialiased pb-12">
      {/* Header */}
      <header className={`bg-gradient-to-r ${currentView === 'Parent' ? 'from-pink-400 to-purple-400' : 'from-[#6b7aff] to-[#a379ff]'} pb-16 pt-8 px-6 rounded-b-[40px] shadow-sm mb-8 animate-[fadeIn_0.5s_ease-out] transition-colors duration-500`}>
        <div className="max-w-6xl mx-auto flex flex-col items-center md:items-start">
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6">
            <div className="text-white text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-normal">Daycare Dashboard</h1>
              {currentView === 'Parent' ? (
                <div className="flex items-center gap-2 mt-2 text-white/90">
                  <p className="text-base font-medium">👋 Good morning! Here's Aarav’s day so far.</p>
                </div>
              ) : (
                <p className="text-white/80 mt-1 text-base font-normal">Monitor today's activities and alerts</p>
              )}
            </div>

            {/* View Toggle Button */}
            <div className="bg-black/10 backdrop-blur-md p-1 rounded-full flex border border-white/10 shadow-inner">
              <button 
                onClick={() => setCurrentView("Parent")}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                  currentView === "Parent" ? "bg-white text-pink-500 shadow-sm" : "text-white hover:text-white/80"
                }`}
              >
                Parent View
              </button>
              <button 
                onClick={() => setCurrentView("Daycare")}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                  currentView === "Daycare" ? "bg-white text-[#897aff] shadow-sm" : "text-white hover:text-white/80"
                }`}
              >
                Daycare View
              </button>
            </div>
          </div>
          
          {/* Daycare Specific Header Controls */}
          {currentView === "Daycare" && (
            <div className="flex gap-4 w-full md:w-auto items-center mt-6 animate-[fadeIn_0.3s_ease-out]">
              <div className="relative flex-1 md:w-80">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search child, activity..." 
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-white/95 border-0 focus:ring-4 focus:ring-purple-300/50 shadow-sm text-sm outline-none transition-all text-gray-800 font-medium"
                />
              </div>
              
              <button className="bg-white text-purple-600 font-bold rounded-2xl px-6 py-3 shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300 whitespace-nowrap hidden md:block border border-purple-100">
                + New Schedule
              </button>
            </div>
          )}

          {/* Parent Specific Date/Calendar */}
          {currentView === "Parent" && (
            <div className="flex items-center gap-2 mt-4 text-white/90 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full w-max text-sm font-medium animate-[fadeIn_0.4s_ease-out]">
              <FaCalendarAlt />
              <span>Oct 24, 2023</span>
            </div>
          )}
        </div>

        {/* Stats Cards Row (Only for Daycare View) */}
        {currentView === "Daycare" && (
          <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 transform translate-y-8 animate-[fadeIn_0.5s_ease-out]">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/50 flex items-center gap-4 hover:-translate-y-1 transition duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-500 text-2xl">📅</div>
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-1">Total Activities</p>
                <p className="text-2xl font-bold text-gray-800">12</p>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/50 flex items-center gap-4 hover:-translate-y-1 transition duration-300">
               <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-500 text-2xl">✅</div>
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-1">Ongoing Tasks</p>
                <p className="text-2xl font-bold text-gray-800">4</p>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/50 flex items-center gap-4 hover:-translate-y-1 transition duration-300">
               <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-500 text-2xl">⚠️</div>
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-1">Active Alerts</p>
                <p className="text-2xl font-bold text-gray-800">3</p>
              </div>
            </div>
          </div>
        )}
      </header>
      
      {/* Main Content Area */}
      <main className={`max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 ${currentView === 'Daycare' ? 'mt-12' : 'mt-[-40px] z-10 relative'}`}>
        <section className="col-span-1 md:col-span-2 space-y-6">
          <ScheduleList currentView={currentView} />
        </section>
        <section className="col-span-1">
          <AlertBox currentView={currentView} />
        </section>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

export default Dashboard;
