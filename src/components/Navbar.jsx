import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ unreadCount = 0 }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-theme-card px-8 py-5 flex items-center justify-between border-b border-theme relative z-50 transition-colors duration-300">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/dashboard')}>
        <div className="w-12 h-12 bg-[#80D0C7] rounded-[14px] flex items-center justify-center shadow-lg shadow-teal-50/20">
          <div className="w-6 h-6 bg-white/40 rounded-full"></div>
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-theme-main leading-none">Little Dreamers</h1>
          <p className="text-[10px] font-bold text-theme-light uppercase tracking-[0.2em] mt-1">Staff Portal</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2.5 bg-theme-subtle text-theme-muted hover:text-[#80D0C7] rounded-xl transition-all border border-theme shadow-sm"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <FaMoon /> : <FaSun className="text-yellow-400" />}
        </button>

        <button
          onClick={() => navigate('/alerts')}
          className="relative p-2.5 bg-theme-subtle text-theme-muted hover:text-teal-400 rounded-xl transition-all border border-theme shadow-sm"
        >
          <FaBell />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full border-2 border-theme"></span>
          )}
        </button>

        <div className="flex items-center gap-4 pl-6 border-l border-theme">
          <div className="text-right hidden md:block">
            <h3 className="text-sm font-black text-theme-main">Ms. Jenny</h3>
            <p className="text-[10px] font-bold text-theme-light uppercase tracking-widest">Rainbow Room Teacher</p>
          </div>
          <div className="w-11 h-11 rounded-full border-2 border-theme shadow-sm overflow-hidden bg-theme-subtle">
            <img src="https://ui-avatars.com/api/?name=Jenny+Staff&background=80D0C7&color=fff" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-theme-subtle text-theme-muted font-bold rounded-xl text-[10px] hover:bg-theme-card transition-all ml-1 border border-theme">
            <FaSignOutAlt className="text-[10px]" /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
