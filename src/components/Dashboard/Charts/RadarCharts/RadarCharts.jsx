import "./RadarCharts.scss";
import React, { useContext, PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import UserContext from '../../../../context/UserContext.jsx';

function RadarCharts() {

  const { userPerformance } = useContext(UserContext);

  if (!userPerformance) {
    return <div>Loading...</div>;
  }

  // On récupère l'objet data dans une variable objet data
  const { data } = userPerformance.data;

  // On récupère la liste des types de performance dans une variable
  const kinds = userPerformance.data.kind;

  // On veut que les légendes soient en français avec des majuscules
  const translationsToFrench = {
    cardio: 'Cardio',
    energy: 'Énergie',
    endurance: 'Endurance',
    strength: 'Force',
    speed: 'Vitesse',
    intensity: 'Intensité'
  }
  // On change l'ordre des éléments dans le tableau pour que les données apparaissent sur le graphique comme sur la maquette
  const desiredLegendOrder = ['intensity', 'speed', 'strength', 'endurance', 'energy', 'cardio'];

  // On map les données pour les réorganiser selon l'ordre désiré
  const dataInChart = desiredLegendOrder.map(kind => ({
    kind: translationsToFrench[kind],
    value: data.find(item => kinds[item.kind] === kind).value // on cherche dans "data" l'éléments dont le kind correspond au kind dans map(kind =>)
  }));
  function renderOuterTick(props) {
    const { x, y, payload } = props;
    let dx = 0;
    let dy = 0;
  
    // On ajuste la position de chaque légende sur l'axe dx et dy en fonction de la maquette
    switch (payload.index) {
      case 0:
        dy = -10;
        break;
      case 1:
        dx = 30;
        dy = 0;
        break;
      case 2:
        dx = 30;
        dy = 5;
        break;
      case 3:
        dy = 10;
        break;
      case 4:
        dx = -30;
        dy = 5;
        break;
      case 5:
        dx = -30;
        dy = 0;        
        break;
      case 6:
        dy = 25;
      default:
        break;
    }
  
    return (
      <text 
        x={x + dx} 
        y={y + dy} 
        fill="#FFFFFF" 
        fontSize={15} 
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {payload.value}
      </text>
    );
  }
  
  
  return (
    <ResponsiveContainer minWidthwidth={500} aspect={1} style={{ width: "100%", height: "100%",  backgroundColor: '#282D30', borderRadius: "10px" }} >
      <RadarChart cx="50%" cy="50%" outerRadius="50%" data={dataInChart} style={{ width: "100%", margin: 'auto'}}>
        <PolarGrid  radialLines={false} polarRadius={[0, 10, 20, 40, 64]} strokeWidth={1} />
        <PolarAngleAxis dataKey="kind"  stroke="#FFFFFF" tickLine={false} 
  tick={renderOuterTick}
         />
        <PolarRadiusAxis fill="#FFFFFF"  stroke="none" />
        
        <Tooltip />
        <Radar name="performance" dataKey="value" stroke="none" fill="#FF0101B2" fillOpacity={0.9}  />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export default RadarCharts;



