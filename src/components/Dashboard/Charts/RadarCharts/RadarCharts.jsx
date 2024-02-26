import "./RadarCharts.scss";
import React, { useContext, PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import UserContext from '../../../../context/UserContext.jsx';

function RadarCharts() {

  const { userPerformance } = useContext(UserContext);

  if (!userPerformance) {
    return <div>Loading...</div>;
  }

  //On récupère l'objet data dans une variable objet data
  const { data } = userPerformance.data;

  //On récupère la liste des types de performance dans une variable
  const kinds = userPerformance.data.kind;

  //On définit un objet item pour récupérer le kind depuis la variable kinds et sa value
  const dataInChart = data.map(item => ({
    kind:kinds[item.kind],
    value:item.value
  }));

  return (
        
        <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataInChart}>
          <PolarGrid />
          <PolarAngleAxis dataKey="kind" />
          <PolarRadiusAxis />
          <Tooltip />
          <Radar name="Mike" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>

  )
}

export default RadarCharts

