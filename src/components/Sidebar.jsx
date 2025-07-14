import React from 'react';

const Sidebar = () => {
  return (
    <div className="menu p-4 w-60 min-h-screen bg-base-200 text-base-content">
      <ul>
        <li className="mb-2 font-bold text-lg">Simulation</li>
        <li className="mb-2 text-gray-400">Prediction</li>
        <li className="text-gray-400">Configuration</li>
      </ul>
    </div>
  );
};

export default Sidebar;