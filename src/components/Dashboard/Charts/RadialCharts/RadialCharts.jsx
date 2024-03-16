import React, { useContext } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Legend, PolarAngleAxis } from 'recharts';
import UserContext from '../../../../context/UserContext.jsx';

function RadialCharts() {
  const { userData } = useContext(UserContext);

  if (!userData) {
    return <div>Loading...</div>;
  }


 let score;
 if (userData.data.todayScore !== undefined) {
    score = userData.data.todayScore;
 } else if (userData.data.score !== undefined) {
    score = userData.data.score;
 } else {
   score = 0;   // valeur par défaut
 }

  const data = [{ score: score }];

  return (
    <ResponsiveContainer width={300} aspect={1} style={{ width: "100%", height: "100%", borderRadius: "10px" }}>
      <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="80%" barSize={7} data={data}       startAngle={90}
          endAngle={450} >
               <circle cx="50%" cy="50%" r="27%" fill="#FFFFFF" />
          <PolarAngleAxis
            type="number"
            domain={[0, 1]}
            angleAxisId={0}
            tick={false}
          />
        <RadialBar minAngle={50} background clockWise dataKey="score"  cornerRadius={10}/>

        <text
          className="title__lineChart"
          width="15"
          dominantBaseline={'hanging'}
          x="24"
          y="50"
          fontSize="22"
          fill="black"
          opacity={1}
        >
          Score
        </text>
        
        <Legend
         iconSize={0}
         iconType="rect"
         layout="vertical"
         verticalAlign="middle"
         fill="#74798C"
          content={
            <div className="radialChart__legend">
              <p className="radialChart__legend-value">{score * 100}% </p>
              <p className="radialChart__legend-label">de votre objectif</p>
            </div>
          }
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

export default RadialCharts;
