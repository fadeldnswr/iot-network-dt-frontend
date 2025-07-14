import React from 'react';

const ErrorMetrics = ({ metrics }) => {
  return (
    <div className="bg-base-200 p-4 rounded-box font-[Poppins]">
      <h3 className="text-lg font-bold mb-2 text-center">Performance Metrics</h3>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="stat bg-base-100 text-center p-2 rounded-box">
            <div className="stat-title text-white">{key}</div>
            <div className="stat-value text-white">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorMetrics;