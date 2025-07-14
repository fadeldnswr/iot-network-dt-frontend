import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Graphs = ({ data }) => {
  return (
    <div className="bg-base-200 p-4 rounded-box mt-2 w-4xl ml-[200px]">
      <h2 className="text-center text-lg font-medium mb-2 font-[Poppins]">Simulated Vs Real Data</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Simulated" stroke="#8884d8" dot={false} />
          <Line type="monotone" dataKey="Actual" stroke="#ffffff" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graphs;