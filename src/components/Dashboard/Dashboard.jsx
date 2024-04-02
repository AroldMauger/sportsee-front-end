import React, { useContext } from 'react';
import "./Dashboard.scss";
import Hello from '../Hello/Hello.jsx';
import NutrientsContainer from '../NutrientsContainer/NutrientsContainer.jsx';
import BarCharts from "../Dashboard/Charts/BarCharts/BarCharts.jsx";
import LineCharts from "../Dashboard/Charts/LineCharts/LineCharts.jsx";
import RadarCharts from "../Dashboard/Charts/RadarCharts/RadarCharts.jsx";
import RadialCharts from "../Dashboard/Charts/RadialCharts/RadialCharts.jsx";
import UserContext from '../../context/UserContext.jsx';
import Loading from '../Loading/Loading.jsx';
import HasError from '../HasError/HasError.jsx';

function Dashboard() {
  // on récupère nos variables depuis le context
  const { userData, userActivity, userSessions, userPerformance, loading, error } = useContext(UserContext);
  if (loading) {
    return <Loading/>  // affichage du spinner
  }
  if (error || !userData || !userActivity || !userSessions || !userPerformance) {
    return <HasError/>  // affichage du message d'erreur
  }

  //On récupère l'objet data dans une variable keyData
  const { keyData } = userData.data;

  console.log(userPerformance)
  return (
    <div className='dashboard-container'>
      <Hello/>
      <div className='dashboard-main-container'>
        <div className='dashboard-charts-container'>
          <BarCharts/>
          <div className='dashboard-small-charts-container'>
                <LineCharts/>
                <RadarCharts/>
                <RadialCharts/>
         </div>
        </div>
        {/* Pour les nutriments, on passe des props au composant*/}
        <div className='all-nutrients-container'>
          <NutrientsContainer nutrientName="Calories" nutrientIcon="calories-icon.png" keyData={keyData.calorieCount+"kCal"}/>
          <NutrientsContainer nutrientName="Protéines" nutrientIcon="protein-icon.png" keyData={keyData.proteinCount+"g"}/>
          <NutrientsContainer nutrientName="Glucides" nutrientIcon="carbs-icon.png" keyData={keyData.carbohydrateCount+"g"}/>
          <NutrientsContainer nutrientName="Lipides" nutrientIcon="fat-icon.png" keyData={keyData.lipidCount+"g"}/>
        </div>      
      </div>
    </div>
  )
}

export default Dashboard;
