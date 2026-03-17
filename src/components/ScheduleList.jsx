import ScheduleCard from "./ScheduleCard";
import { FaUtensils, FaGamepad, FaBed, FaCheckCircle, FaSpinner, FaHourglassHalf } from 'react-icons/fa';

const ScheduleList = ({ currentView }) => {
  const isDaycare = currentView === "Daycare";

  const daycareSchedules = [
    { time: "9:00 AM - 10:00 AM", activity: "Breakfast", child: "15 children", location: "Cafeteria", emoji: "🍽️", status: "Ongoing", category: "Meal", highlight: true },
    { time: "11:00 AM - 12:00 PM", activity: "Play Time", child: "20 children", location: "Playground", emoji: "🎮", status: "Upcoming", category: "Activity", highlight: false },
    { time: "1:00 PM - 2:00 PM", activity: "Nap Time", child: "18 children", location: "Room A", emoji: "🛏️", status: "Upcoming", category: "Rest", highlight: false },
    { time: "3:30 PM - 4:30 PM", activity: "Art Class", child: "12 children", location: "Room B", emoji: "🎨", status: "Upcoming", category: "Learning", highlight: false },
  ];

  const parentSchedules = [
    { time: "9:00 AM", activity: "Breakfast", icon: "🍽️", status: "Completed", highlight: false, bgColor: "bg-green-50/80" },
    { time: "11:00 AM", activity: "Play Time", icon: "🎮", status: "Ongoing", highlight: true, bgColor: "bg-blue-50/80" },
    { time: "1:00 PM", activity: "Nap Time", icon: "🛏️", status: "Upcoming", highlight: false, bgColor: "bg-gray-50/80" },
  ];

  const schedules = isDaycare ? daycareSchedules : parentSchedules;

  return (
    <div className="h-full flex flex-col animate-[fadeIn_0.5s_ease-out]">
      
      {/* Parent Only: Profile & Tracker */}
      {!isDaycare && (
        <div className="mb-8 space-y-4">
          {/* Child Profile Card */}
          <div className="bg-white rounded-2xl shadow-md p-4 flex items-center justify-between border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center text-3xl border-2 border-pink-200">
                👶
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Aarav</h2>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-sm font-medium text-green-600">At Daycare</span>
                </div>
              </div>
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-xs text-gray-400 font-medium">Drop-off Time</p>
              <p className="text-sm font-bold text-gray-700">8:30 AM</p>
            </div>
          </div>

          {/* Today's Progress Tracker */}
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
            <h3 className="text-sm font-bold text-gray-500 mb-4 tracking-wide uppercase">Today's Progress</h3>
            <div className="flex justify-between items-center relative">
              {/* Connecting Line */}
              <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-1 bg-gray-100 -z-10 rounded-full">
                 <div className="h-full bg-green-400 rounded-full w-1/2"></div>
              </div>

              {/* Steps */}
              <div className="flex flex-col items-center gap-2 bg-white px-2">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shadow-sm">
                  <FaCheckCircle />
                </div>
                <span className="text-xs font-semibold text-green-700">Breakfast</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white px-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center shadow-sm animate-spin-slow">
                  <span className="text-sm">🔄</span>
                </div>
                <span className="text-xs font-semibold text-blue-600">Play Time</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white px-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center shadow-sm">
                  <span className="text-sm">⏳</span>
                </div>
                <span className="text-xs font-semibold text-gray-400">Nap Time</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header section for Daycare vs Parent */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
          {isDaycare ? "Today's Schedule" : "Detailed Schedule"}
        </h2>
        
        {/* Filter Tabs - Only for Daycare */}
        {isDaycare && (
          <div className="flex bg-gray-200/50 p-1 rounded-xl glassmorphism">
            <button className="px-4 py-1.5 text-sm font-semibold rounded-lg bg-white shadow-sm text-purple-600 transition">All</button>
            <button className="px-4 py-1.5 text-sm font-semibold rounded-lg text-gray-500 hover:text-gray-700 transition">Today</button>
            <button className="px-4 py-1.5 text-sm font-semibold rounded-lg text-gray-500 hover:text-gray-700 transition">Upcoming</button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 flex-1 pb-4">
        {schedules.map((schedule, index) => (
          <ScheduleCard
            key={index}
            time={schedule.time}
            activity={schedule.activity}
            child={schedule.child}
            emoji={isDaycare ? schedule.emoji : undefined}
            Icon={!isDaycare ? schedule.icon : undefined}
            status={schedule.status}
            category={schedule.category}
            location={schedule.location}
            highlight={schedule.highlight}
            bgColor={schedule.bgColor}
            currentView={currentView}
          />
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}} />
    </div>
  );
};

export default ScheduleList;
