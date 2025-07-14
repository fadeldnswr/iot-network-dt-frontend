import Graphs from "../components/Graphs.jsx";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import React from "react";

const SimulationPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-800 text-white" >
      <Sidebar />
      <div className="flex-1 h-4">
        <Navbar />
        <h1 className="text-3xl font-bold font-[Poppins] leading-snug ml-[200px] mt-[100px]">Welcome to<br />Digital Twin Dashboard!</h1>
        <Graphs />  
      </div>
    </div>
  )
}

export default SimulationPage;