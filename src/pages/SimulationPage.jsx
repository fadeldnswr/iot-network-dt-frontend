import Dropdown from "../components/Dropdown.jsx";
import Button from "../components/Button.jsx";
import Graphs from "../components/Graphs.jsx";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import ErrorMetrics from "../components/ErrorMetrics.jsx";
import StatsSummary from "../components/StatsSummary.jsx";

import React, { useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const SimulationPage = () => {
  // Define state variables for dropdown selections
  const [dataType, setDataType] = useState("temperature");
  const [hours, setHours] = useState(1);
  const [startDate, setStartDate] = useState("2025-05-12T14:00:03")
  const [graphData, setGraphData] = useState([]);
  const [metrics, setMetrics] = useState({
    MAE: 0,
    MAPE: 0,
    MSE: 0,
    RMSE: 0,
  })
  const [actualStats, setActualStats] = useState({
    mean: 0,
    median: 0,
    std_dev: 0,
  })
  const [simulatedStats, setSimulatedStats] = useState({
    mean: 0,
    median: 0,
    std_dev: 0,
  })

  // Define a function to convert hour to steps
  const hourToSteps = (hours) => {
    return (hours * 3600 ) / 2 // Assuming 2 seconds per step
  }

  // Define a function to fetch the data
  const fetchData = async () => {
    try {
      const steps = hourToSteps(hours);
      // Define parameters for the API request
      const params = {
        start_date: startDate,
        steps: steps,
        category: dataType,
      }

      // Define the API endpoint
      const [realRes, simulatedRes, statsRes, metricsRes] = await Promise.all([
        axios.get(`${BASE_URL}visualize-real/real`, {params}),
        axios.get(`${BASE_URL}visualize-simulated/simulated`, {params}),
        axios.get(`${BASE_URL}statistical/summary`, {params}),
        axios.get(`${BASE_URL}error/metrics`, {params}),
      ])

      // Get the real and simulated data
      const realData = realRes.data.data;
      const simulatedData = simulatedRes.data.data;

      // Create a map for simulated data based on timestamp
      const simulatedMap = new Map(
        simulatedData.map(item => [item.timestamp, item[dataType]])
      );

      // Merge real and simulated data
      const mergedData = realData.map(item => ({
        time: item.timestamp,
        actual: item[dataType],
        simulated: simulatedMap.get(item.timestamp), // null agar tidak mengganggu skala jika tidak cocok
      }));

      // Set the states
      setGraphData(mergedData);
      setActualStats({
        mean: statsRes.data?.real_data_statistics?.mean ?? 0,
        median: statsRes.data?.real_data_statistics?.median ?? 0,
        std_dev: statsRes.data?.real_data_statistics?.std_dev ?? 0,
      });
      setSimulatedStats({
        mean: statsRes.data?.simulated_data_statistics?.mean ?? 0,
        median: statsRes.data?.simulated_data_statistics?.median ?? 0,
        std_dev: statsRes.data?.simulated_data_statistics?.std_dev ?? 0,
      });
      setMetrics({
        MAE: metricsRes.data.data.MAE ?? 0,
        MSE: metricsRes.data.data.MSE ?? 0,
        RMSE: metricsRes.data.data.RMSE ?? 0,
        MAPE: metricsRes.data.data.MAPE ?? 0
      });

      // Log the fetched data for debugging
      console.log("Real Data Sample:", realData[0]);
      console.log("Simulated Data Sample:", simulatedData[0]);
      console.log("Stats Summary Response:", statsRes.data);
      console.log("Metrics Response:", metricsRes.data);
      console.log('Fetching with params:', params);
      console.log(`${BASE_URL}visualize-real/real`);
      console.log(`${BASE_URL}visualize-simulated/simulated`);
      console.log(`${BASE_URL}statistical/summary`);
      console.log(`${BASE_URL}error/metrics`);
    } catch(error){
      console.error("Error fetching data:", error);
    }
  }

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
            options={["temperature", "humidity(%)", "latency(ms)", "rssi(dBm)"]}
            value={dataType}
            onChange={(e) => setDataType(e.target.value)}
            />
          <Dropdown 
            label="Simulated Hours" 
            options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            />
          <Dropdown 
            label="Start Date" 
            options={["2025-05-12T15:00:03", "2025-05-12T16:00:03", "2025-05-12T17:00:03", "2025-05-12T18:00:03"]}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            />
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-6xl">
          <div className="flex-1">
            <Graphs data={graphData}/>  
            <Button label="Simulate" onClick={fetchData}/>
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