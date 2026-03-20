import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaCheck, FaTrash, FaArrowLeft, FaInfoCircle, FaExclamationTriangle, FaCheckCircle, FaStar, FaRegBell } from 'react-icons/fa';

const AlertsPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'info', priority: 'high', message: 'Play time started', time: '10:30 AM', date: 'Today', unread: true },
    { id: 2, type: 'success', priority: 'medium', message: 'Lunch completed for Rainbow Room', time: '12:15 PM', date: 'Today', unread: true },
    { id: 3, type: 'warning', priority: 'high', message: 'Pickup reminder in 10 mins (Aarav)', time: '03:45 PM', date: 'Today', unread: false },
    { id: 4, type: 'info', priority: 'low', message: 'Circle time beginning soon', time: '09:15 AM', date: 'Earlier', unread: false },
    { id: 5, type: 'success', priority: 'medium', message: 'Morning snack served', time: '08:45 AM', date: 'Earlier', unread: false },
    { id: 6, type: 'warning', priority: 'high', message: 'Check supply for Nap time diapers', time: 'Yesterday', date: 'Earlier', unread: true },
  ]);

  const unreadCount = alerts.filter(a => a.unread).length;

  const markAllRead = () => {
    setAlerts(alerts.map(a => ({ ...a, unread: false })));
  };

  const markRead = (id) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, unread: false } : a));
  };

  const deleteAlert = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const filteredAlerts = useMemo(() => {
    switch (activeFilter) {
      case 'Unread': return alerts.filter(a => a.unread);
      case 'Important': return alerts.filter(a => a.priority === 'high');
      default: return alerts;
    }
  }, [alerts, activeFilter]);

  const groupedAlerts = useMemo(() => {
    return {
      Today: filteredAlerts.filter(a => a.date === 'Today'),
      Earlier: filteredAlerts.filter(a => a.date === 'Earlier'),
    };
  }, [filteredAlerts]);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'info': return <FaInfoCircle className="text-blue-500" />;
      case 'warning': return <FaExclamationTriangle className="text-yellow-500" />;
      case 'success': return <FaCheckCircle className="text-green-500" />;
      default: return <FaBell className="text-gray-500" />;
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case 'info': return 'bg-blue-100';
      case 'warning': return 'bg-yellow-100';
      case 'success': return 'bg-green-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-gray-800 p-10">
      <div className="max-w-4xl mx-auto animate-in fade-in duration-700">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-12 h-12 flex items-center justify-center bg-white shadow-sm border border-gray-50 rounded-2xl hover:bg-gray-50 transition-all text-gray-400"
            >
              <FaArrowLeft />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-black tracking-tighter text-gray-800">Notifications</h1>
                {unreadCount > 0 && (
                  <span className="bg-blue-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg shadow-blue-100">
                    {unreadCount} NEW
                  </span>
                )}
              </div>
              <p className="text-gray-400 font-bold text-sm mt-1 tracking-wide">Stay updated with all daycare activities</p>
            </div>
          </div>
          <button 
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className={`px-6 py-3 rounded-full font-black text-[11px] uppercase tracking-widest transition-all ${
              unreadCount > 0 
              ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100' 
              : 'bg-gray-50 text-gray-300 border border-gray-100 cursor-not-allowed'
            }`}
          >
            Mark all as read
          </button>
        </header>

        {/* Filter Tabs */}
        <div className="bg-gray-50/50 rounded-full p-1.5 flex items-center gap-1 w-fit mb-10 border border-gray-100">
          {['All', 'Unread', 'Important'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-white text-[#3498DB] shadow-md border border-blue-50'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="space-y-12 pb-20">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-100 flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <FaRegBell className="text-3xl text-gray-200" />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">No new notifications</h3>
              <p className="text-gray-300 font-bold text-sm tracking-wide">We'll alert you when something happens!</p>
            </div>
          ) : (
            Object.keys(groupedAlerts).map((group) => {
              const groupAlerts = groupedAlerts[group];
              if (groupAlerts.length === 0) return null;

              return (
                <div key={group}>
                  <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-6 ml-1">{group}</h3>
                  <div className="space-y-4">
                    {groupAlerts.map((alert) => (
                      <div 
                        key={alert.id}
                        className={`group relative flex items-center justify-between p-6 rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                          alert.unread 
                          ? 'bg-blue-50 border-blue-100' 
                          : 'bg-white border-gray-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-6">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-inner ${getIconBg(alert.type)}`}>
                            {getAlertIcon(alert.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-3">
                              <h4 className="font-black text-[17px] text-gray-800 tracking-tight leading-tight">
                                {alert.message}
                              </h4>
                              {alert.unread && <span className="w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white shadow-md animate-pulse"></span>}
                              {alert.priority === 'high' && <FaStar className="text-yellow-400 text-sm" title="Important" />}
                            </div>
                            <p className="text-gray-400 font-bold text-[11px] mt-1.5 uppercase tracking-widest flex items-center gap-2">
                              {alert.time} • {alert.date}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          {alert.unread && (
                            <button 
                              onClick={() => markRead(alert.id)}
                              className="p-3 bg-white text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-sm border border-blue-100"
                              title="Mark as read"
                            >
                              <FaCheck className="text-xs" />
                            </button>
                          )}
                          <button 
                            onClick={() => deleteAlert(alert.id)}
                            className="p-3 bg-white text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm border border-red-50"
                            title="Delete"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
