import React from 'react'
import "./Dashboard.scss";
import Hello from '../Hello/Hello.jsx';
import NutrientsContainer from '../NutrientsContainer/NutrientsContainer.jsx';
import BarCharts from "../Dashboard/Charts/BarCharts/BarCharts.jsx";
import LineCharts from "../Dashboard/Charts/LineCharts/LineCharts.jsx";
import RadarCharts from "../Dashboard/Charts/RadarCharts/RadarCharts.jsx";
import RadialCharts from "../Dashboard/Charts/RadialCharts/RadialCharts.jsx";

function Dashboard() {
  return (
    <div className='dashboard-container'>
      <Hello/>
      <div className='dashboard-main-container'>
        <div className='dashboard-charts-container'>
          <BarCharts/>
          <div className='smallcharts-container'>
            <LineCharts/>
            <RadarCharts/>
            <RadialCharts/>
          </div>
        </div>
        <div className='all-nutrients-container'>
          <NutrientsContainer/>
          <NutrientsContainer/>
          <NutrientsContainer/>
          <NutrientsContainer/>
        </div>      
  </div>
    </div>
  )
}

export default Dashboard