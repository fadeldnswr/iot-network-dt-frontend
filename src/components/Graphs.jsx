import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Graphs = ({ data }) => {
  const downsampledData = data.filter((_, index) => index % 5 === 0);
  return (
    <div className="bg-base-200 p-4 rounded-box mt-2 w-4xl ml-[200px]">
      <h2 className="text-center text-lg font-medium mb-2 font-[Poppins]">Simulated Vs Real Data</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={downsampledData} margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>
          <XAxis dataKey="time" stroke="#ffffff" />
          <YAxis stroke="#ffffff"   domain={['auto', 'auto']} allowDataOverflow/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="simulated" stroke="#8884d8" dot={false} />
          <Line type="monotone" dataKey="actual" stroke="#ffffff" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graphs;