import React from 'react';

const StatsSummary = ({ actual = {}, simulated = {} }) => {
  return (
    <div className="bg-base-200 p-4 rounded-box h-[211px] font-[Poppins]">
      <h3 className="text-lg font-bold mb-2 text-center">Statistical Summary</h3>
      <div className="grid grid-cols-2 mt-8 text-center">
        <div className="flex-1">
          <p>Actual Mean : {actual.mean}</p>
          <p>Actual Median : {actual.median}</p>
          <p>Actual Std. Dev : {actual.std_dev}</p>
        </div>
        <div className="flex-1">
          <p>Sim. Mean : {simulated.mean}</p>
          <p>Sim. Median : {simulated.median}</p>
          <p>Sim. Std. Dev : {simulated.std_dev}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsSummary;
