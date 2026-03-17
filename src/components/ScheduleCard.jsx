import { FaClock, FaCheckCircle, FaSpinner } from 'react-icons/fa';

const ScheduleCard = ({ activity, time, child, emoji, Icon, highlight, status, category, location, bgColor, currentView }) => {
  const isDaycare = currentView === "Daycare";

  if (!isDaycare) {
    // Determine status styling for Parent View
    let statusStyle = '';
    let StatusIcon = null;

    if (status === 'Completed') {
      statusStyle = 'bg-green-100 text-green-700 border-green-200';
      StatusIcon = FaCheckCircle;
    } else if (status === 'Ongoing') {
      statusStyle = 'bg-blue-100 text-blue-700 border-blue-200';
      StatusIcon = FaSpinner;
    } else {
      statusStyle = 'bg-gray-100 text-gray-600 border-gray-200';
      StatusIcon = null; // Maybe a future icon
    }

    return (
      <div className={`
        ${bgColor} rounded-2xl shadow-sm p-5 border border-gray-100
        hover:scale-[1.02] hover:shadow-lg transition-all duration-300 cursor-pointer
        relative overflow-hidden
      `}>
        {/* Soft highlight bar if active */}
        {highlight && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-400"></div>}
        
        <div className="flex justify-between items-center sm:items-start">
          <div className="flex items-center gap-4">
            <div className={`text-2xl bg-white p-3 rounded-2xl shadow-sm border border-gray-100/50 flex items-center justify-center`}>
              {Icon}
            </div>
            <div>
              <h3 className="text-gray-800 font-bold text-lg leading-tight">{activity}</h3>
              <div className="flex items-center gap-1.5 mt-1.5">
                <FaClock className="text-gray-400 text-xs" />
                <span className="text-gray-500 text-sm font-medium">{time}</span>
              </div>
            </div>
          </div>

          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold shadow-sm ${statusStyle}`}>
             {StatusIcon && <StatusIcon className={status === 'Ongoing' ? 'animate-spin' : ''} />}
             {status}
          </div>
        </div>
      </div>
    );
  }

  // Daycare View Card
  return (
    <div className={`
      relative bg-white/80 backdrop-blur-md shadow-sm p-6 
      border ${highlight ? 'border-l-8 border-purple-500 bg-purple-50/10' : 'border border-gray-100'}
      hover:-translate-y-1 hover:shadow-xl hover:border-blue-200 transition-all duration-300 ease-out
      group rounded-2xl
    `}>
      {/* Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 -z-10"></div>

      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
           <div className="text-3xl bg-gray-50 p-2 rounded-xl shadow-inner border border-gray-100">{emoji}</div>
           <div>
              <h3 className="font-bold text-gray-800 text-lg">
                {activity}
              </h3>
              <p className="text-sm font-medium text-gray-500 mt-0.5 flex items-center gap-1">
                 <span className="opacity-70">📍</span> {location}
              </p>
           </div>
        </div>

        {/* Status Tag for Daycare only */}
        <div className={`
          px-3 py-1 rounded-full text-xs font-bold shadow-sm whitespace-nowrap
          ${status === 'Ongoing' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-blue-50 text-blue-600 border border-blue-100'}
        `}>
          {status}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-100/60">
        <div className="flex items-center gap-4">
           {/* Category Badge - Daycare only */}
           <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-md border border-gray-200">
             {category}
           </span>
           
           {/* Time Box */}
           <div className="flex items-center gap-1.5 font-medium text-sm text-gray-600">
             <FaClock className="text-gray-400" /> {time}
           </div>
        </div>

        {/* Child Info */}
        <div className="flex items-center gap-2 text-sm text-gray-700 font-medium bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
           <span className="text-lg">👶</span>
           {child}
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
