import Dropdown from "../components/Dropdown.jsx";
import Button from "../components/Button.jsx";
import Graphs from "../components/Graphs.jsx";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

import React, { useState } from "react";
import ErrorMetrics from "../components/ErrorMetrics.jsx";
import StatsSummary from "../components/StatsSummary.jsx";

const SimulationPage = () => {
  const [dataType, setDataType] = useState("temperature");
  const [hours, setHours] = useState(1);
  const [startDate, setStartDate] = useState("2025-05-12T12:00:00")

    const metrics = {
    MAE: 0,
    MAPE: 0,
    MSE: 0,
    RMSE: 0,
  };

  const actualStats = {
    mean: 0,
    median: 0,
    std: 0,
  };

  const simulatedStats = {
    mean: 0,
    median: 0,
    std: 0,
  };

  return (
    <div className="flex min-h-screen bg-gray-800 text-white" >
      <Sidebar />
      <div className="flex-1 h-4">
        <Navbar />
        <h1 className="text-3xl font-bold font-[Poppins] leading-snug ml-[200px] mt-[60px]">
          Welcome to<br />Digital Twin Dashboard!
        </h1>
        <div className="grid grid-cols-3 gap-y-2 mt-4 items-start max-w-[960px] ml-[100px]">
          <Dropdown 
            label="Choose data" 
            options={["temperature", "humidity", "latency", "rssi"]}
            value={dataType}
            onChange={(e) => setDataType(e.target.value)}
            />
          <Dropdown 
            label="Simulated Hours" 
            options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            />
          <Dropdown 
            label="Start Date" 
            options={["2025-05-12T12:00:00", "2025-05-12T13:00:00", "2025-05-12T14:00:00", "2025-05-12T15:00:00"]}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            />
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-6xl">
          <div className="flex-1">
            <Graphs />  
            <Button label="Simulate" />
          </div>
          <div className="w-[420px] flex flex-col gap-4 ml-[520px] mt-2">
            <ErrorMetrics metrics={metrics}/>
            <StatsSummary simulated={simulatedStats} actual={actualStats}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimulationPage;