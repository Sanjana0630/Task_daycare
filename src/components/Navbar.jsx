import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ unreadCount = 0 }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white px-8 py-5 flex items-center justify-between border-b border-gray-50 relative z-50">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/dashboard')}>
        <div className="w-12 h-12 bg-[#80D0C7] rounded-[14px] flex items-center justify-center shadow-lg shadow-teal-50">
           <div className="w-6 h-6 bg-white/40 rounded-full"></div>
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-gray-800 leading-none">Little Dreamers</h1>
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] mt-1">Staff Portal</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={() => navigate('/alerts')}
          className="relative p-2.5 bg-gray-50 text-gray-400 hover:text-teal-400 rounded-xl transition-all"
        >
          <FaBell />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full border-2 border-white"></span>
          )}
        </button>

        <div className="flex items-center gap-4 pl-6 border-l border-gray-100">
          <div className="text-right hidden md:block">
            <h3 className="text-sm font-black text-gray-800">Ms. Jenny</h3>
            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Rainbow Room Teacher</p>
          </div>
          <div className="w-11 h-11 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-100">
            <img src="https://ui-avatars.com/api/?name=Jenny+Staff&background=80D0C7&color=fff" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-500 font-bold rounded-xl text-[10px] hover:bg-gray-100 transition-all ml-1 border border-gray-100">
             <FaSignOutAlt className="text-[10px]" /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
