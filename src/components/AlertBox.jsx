import { FaBell, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const AlertBox = ({ currentView }) => {
  const isDaycare = currentView === "Daycare";

  const daycareAlerts = [
    { title: "Pickup time in 10 mins (Aarav)", time: "Just now", type: "warning" },
    { title: "Lunch completed for Room A", time: "1 hour ago", type: "success" },
    { title: "Nap time started in Room B", time: "2 hours ago", type: "info" },
  ];

  const parentAlerts = [
    { title: "Pickup reminder in 10 mins! 🚗", time: "2 mins ago", type: "warning", color: "bg-orange-50/80 border-orange-100 text-orange-800" },
    { title: "Aarav finished lunch! 🎉", time: "1 hour ago", type: "success", color: "bg-green-50/80 border-green-100 text-green-800" },
  ];

  const alerts = isDaycare ? daycareAlerts : parentAlerts;

  return (
    <div className={`bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-6 h-full animate-[fadeIn_0.6s_ease-out] border border-gray-100 rounded-2xl`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`font-bold text-gray-800 tracking-wide flex items-center gap-2 ${!isDaycare ? 'text-xl' : 'text-[17px]'}`}>
          {!isDaycare && <FaBell className="text-yellow-500" />} Alerts
          {/* Notification Badge - Daycare only */}
          {isDaycare && (
            <span className="flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full shadow-sm animate-pulse">
              3
            </span>
          )}
        </h2>
        {isDaycare && (
          <button className="text-sm font-semibold text-purple-600 hover:text-purple-800 transition">Mark all read</button>
        )}
      </div>

      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`
              relative group flex items-start gap-3.5 p-4 transition-all duration-300 cursor-pointer rounded-xl border shadow-sm hover:scale-[1.02] hover:shadow-md 
              ${isDaycare ? 
                `${alert.type === 'warning' ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200' : 
                   alert.type === 'success' ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-200' : 
                   'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200'}` 
               : alert.color
              }
            `}
          >
            {/* Alert Icon */}
            {isDaycare ? (
              <div className="mt-0.5 text-xl">
                 {alert.type === 'warning' ? '🔔' : alert.type === 'success' ? '✅' : 'ℹ️'}
              </div>
            ) : (
              <div className="mt-0.5 text-lg">
                {alert.type === 'warning' ? <FaExclamationCircle className="text-orange-500" /> : <FaCheckCircle className="text-green-500" />}
              </div>
            )}
            
            <div className="flex-1">
              <p className={`font-semibold text-sm ${isDaycare ? (alert.type === 'warning' ? 'text-yellow-900' : alert.type === 'success' ? 'text-green-900' : 'text-blue-900') : ''}`}>
                {alert.title}
              </p>
              <p className={`text-xs font-medium mt-1 ${isDaycare ? 'opacity-60' : 'opacity-70'}`}>{alert.time}</p>
            </div>

            {/* Action Buttons - Daycare only (visible on hover) */}
            {isDaycare && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 backdrop-blur-sm rounded-lg p-1 flex gap-1">
                <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-white text-gray-500 hover:text-green-600 transition" title="Mark as Read">✓</button>
                <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-white text-gray-500 hover:text-red-500 transition" title="Dismiss">✕</button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {isDaycare && (
        <button className="w-full mt-6 py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 font-semibold text-sm hover:border-purple-300 hover:bg-purple-50 transition">
          View Past Alerts
        </button>
      )}
    </div>
  );
};

export default AlertBox;
