import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full bg-blue-600 text-white py-4 shadow-md flex justify-between items-center px-6">
      <div className="text-2xl font-bold">WeatherWise</div>
      <div className="space-x-6">
        <a href="/" className="hover:text-blue-200 transition">Home</a>

      </div>
    </nav>
  );
};

export default Navbar;
