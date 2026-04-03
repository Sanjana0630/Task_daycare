import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaCheck, FaTrash, FaInfoCircle, FaExclamationTriangle, FaCheckCircle, FaStar, FaRegBell, FaArrowLeft } from 'react-icons/fa';
import Navbar from '../components/Navbar';

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
      case 'info': return 'bg-blue-100/50';
      case 'warning': return 'bg-yellow-100/50';
      case 'success': return 'bg-green-100/50';
      default: return 'bg-gray-100/50';
    }
  };

  return (
    <div className="min-h-screen bg-theme-page font-sans text-theme-main transition-colors duration-300 relative overflow-x-hidden">
      {/* Subtle Blurred Background Image */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-[0.02] dark:opacity-[0.05] blur-xl -z-10"
      ></div>

      <Navbar unreadCount={unreadCount} />
      
      <main className="max-w-4xl mx-auto p-10 animate-in fade-in duration-1000 slide-in-from-bottom-5">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="group flex items-center gap-3 mb-8 px-6 py-2.5 bg-theme-card/60 backdrop-blur-md rounded-2xl border border-theme text-theme-muted font-black text-[11px] uppercase tracking-widest hover:bg-theme-card hover:text-blue-600 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300 active:scale-95"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Dashboard
        </button>

        {/* Header - Glassmorphism */}
        <header className="flex items-center justify-between mb-12 p-8 bg-theme-card/70 backdrop-blur-xl rounded-3xl border border-theme shadow-xl shadow-blue-900/5">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-black tracking-tighter text-theme-main">Notifications</h1>
              {unreadCount > 0 && (
                <span className="bg-blue-500/90 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg shadow-blue-200 backdrop-blur-sm">
                  {unreadCount} NEW
                </span>
              )}
            </div>
            <p className="text-theme-muted font-bold text-sm mt-2 tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
              Stay updated with all daycare activities
            </p>
          </div>
          <button 
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className={`px-8 py-3.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all duration-300 shadow-sm border ${
              unreadCount > 0 
              ? 'bg-theme-card text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:shadow-md border-theme' 
              : 'bg-theme-card/30 text-theme-muted border-theme/20 cursor-not-allowed'
            }`}
          >
            Mark all as read
          </button>
        </header>

        {/* Filter Tabs - Glassmorphism */}
        <div className="bg-theme-card/60 backdrop-blur-lg rounded-full p-2 flex items-center gap-1 w-fit mb-12 border border-theme shadow-lg shadow-blue-900/5">
          {['All', 'Unread', 'Important'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-10 py-3.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-500 ${
                activeFilter === filter
                  ? 'bg-blue-100/80 dark:bg-blue-900/40 text-blue-600 shadow-inner'
                  : 'text-theme-muted hover:text-theme-main hover:bg-theme-card/40'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="space-y-16 pb-24">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-24 bg-theme-card/60 backdrop-blur-md rounded-[40px] border border-theme shadow-2xl flex flex-col items-center animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-theme-card backdrop-blur rounded-full flex items-center justify-center mb-8 shadow-inner border border-theme">
                <FaRegBell className="text-4xl text-blue-100 dark:text-blue-900/40" />
              </div>
              <h3 className="text-3xl font-black text-theme-main mb-3">No new notifications</h3>
              <p className="text-theme-muted font-bold text-sm tracking-wide">We'll alert you when something happens!</p>
            </div>
          ) : (
            Object.keys(groupedAlerts).map((group) => {
              const groupAlerts = groupedAlerts[group];
              if (groupAlerts.length === 0) return null;

              return (
                <div key={group} className="animate-in fade-in slide-in-from-left-4 duration-700">
                  <div className="flex items-center gap-4 mb-4 ml-2">
                    <h3 className="text-[13px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-[0.2em]">{group}</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-blue-200 dark:from-blue-500/30 to-transparent"></div>
                  </div>
                  <div className="flex flex-col gap-[14px]">
                    {groupAlerts.map((alert) => (
                      <div 
                        key={alert.id}
                        className={`group relative flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/5 hover:border-blue-400/30 ${
                          alert.unread 
                          ? 'bg-theme-card border-blue-400/20' 
                          : 'bg-theme-card border-theme'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner border border-theme ${getIconBg(alert.type)}`}>
                            {getAlertIcon(alert.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-3">
                              <h4 className={`font-black text-[16px] tracking-tight leading-tight ${alert.unread ? 'text-theme-main' : 'text-theme-muted'}`}>
                                {alert.message}
                              </h4>
                              {alert.unread && <span className="w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-theme shadow-lg animate-pulse"></span>}
                              {alert.priority === 'high' && <FaStar className="text-yellow-400 text-xs drop-shadow-sm" title="Important" />}
                            </div>
                            <p className="text-theme-muted font-bold text-[10px] mt-1 uppercase tracking-widest flex items-center gap-2">
                              <span className="opacity-50 tracking-normal font-sans italic lowercase">{alert.time}</span>
                              <span className="w-1 h-1 bg-theme-subtle rounded-full"></span>
                              {alert.date}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                          {alert.unread && (
                            <button 
                              onClick={() => markRead(alert.id)}
                              className="p-2.5 bg-theme-card/90 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-md border border-theme active:scale-90"
                              title="Mark as read"
                            >
                              <FaCheck className="text-[10px]" />
                            </button>
                          )}
                          <button 
                            onClick={() => deleteAlert(alert.id)}
                            className="p-2.5 bg-theme-card/90 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-md border border-theme active:scale-90"
                            title="Delete"
                          >
                            <FaTrash className="text-[10px]" />
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
      </main>
    </div>
  );
};

export default AlertsPage;
