import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaCheck, FaTrash, FaArrowLeft, FaInfoCircle, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const AlertsPage = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'info', message: 'Play time started', time: '2 mins ago', unread: true },
    { id: 2, type: 'success', message: 'Lunch completed', time: '10 mins ago', unread: true },
    { id: 3, type: 'warning', message: 'Pickup reminder in 10 mins', time: '1 hour ago', unread: false },
    { id: 4, type: 'info', message: 'Circle time beginning soon', time: '2 hours ago', unread: false },
  ]);

  const markAllRead = () => {
    setAlerts(alerts.map(a => ({ ...a, unread: false })));
  };

  const markRead = (id) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, unread: false } : a));
  };

  const deleteAlert = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const getAlertStyles = (type) => {
    switch (type) {
      case 'info': return 'bg-blue-50 text-blue-600';
      case 'warning': return 'bg-yellow-50 text-yellow-600';
      case 'success': return 'bg-green-50 text-green-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'info': return <FaInfoCircle />;
      case 'warning': return <FaExclamationTriangle />;
      case 'success': return <FaCheckCircle />;
      default: return <FaBell />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="p-3 bg-white shadow-sm border border-gray-100 rounded-xl hover:bg-gray-50 transition-all text-gray-400"
            >
              <FaArrowLeft />
            </button>
            <h1 className="text-3xl font-black tracking-tight text-gray-800">Notifications</h1>
          </div>
          <button 
            onClick={markAllRead}
            className="px-6 py-2.5 bg-gray-50 text-gray-500 font-bold rounded-xl text-xs hover:bg-gray-100 transition-all border border-gray-100"
          >
            Mark all as read
          </button>
        </header>

        {/* Notification List */}
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-100">
              <FaBell className="text-4xl text-gray-100 mx-auto mb-4" />
              <p className="text-gray-300 font-bold uppercase tracking-widest text-xs">No notifications yet</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div 
                key={alert.id}
                className="bg-white rounded-xl shadow-sm border border-gray-50 p-5 flex justify-between items-center hover:bg-gray-50 transition-all group animate-in fade-in slide-in-from-bottom-2 duration-500"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${getAlertStyles(alert.type)}`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className={`font-black tracking-tight text-[15px] ${alert.unread ? 'text-gray-800' : 'text-gray-400'}`}>
                        {alert.message}
                      </h4>
                      {alert.unread && <span className="w-2.5 h-2.5 bg-blue-400 rounded-full border-2 border-white shadow-sm"></span>}
                    </div>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1">
                      {alert.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  {alert.unread && (
                    <button 
                      onClick={() => markRead(alert.id)}
                      title="Mark as read"
                      className="p-2.5 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-100 transition-all"
                    >
                      <FaCheck className="text-xs" />
                    </button>
                  )}
                  <button 
                    onClick={() => deleteAlert(alert.id)}
                    title="Delete"
                    className="p-2.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-all"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
