import React, { useContext } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Legend, PolarAngleAxis } from 'recharts';
import UserContext from '../../../../context/UserContext.jsx';
import "./RadialCharts.scss";

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
    <ResponsiveContainer width={300} style={{ width: "100%", background:"#FBFBFB", height: "100%", borderRadius: "10px" }} >
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="55%"
        outerRadius="100%"
        barSize={10}
        data={data}
        startAngle={90}
        endAngle={450}
      >
        <circle cx="50%" cy="50%" r="27%" fill="#FFFFFF" />
        <PolarAngleAxis
          type="number"
          domain={[0, 1]}
          angleAxisId={0}
          tick={false}
          background="#FBFBFB"
        />
        <RadialBar minAngle={50} clockWise dataKey="score" cornerRadius={10} fill='#FF0000' />
        <text
          className="title__lineChart"
          width="15"
          dominantBaseline={'hanging'}
          x="24"
          y="30"
          fontSize="24"
          fill="black"
          opacity={1}
          fontWeight="500"
        >
          Score
        </text>

        <Legend
          iconSize={0}
          layout="vertical"
          verticalAlign="middle"
          content={
            <g transform={`translate(150, 150)`}>
              <text textAnchor="middle"  fill="#74798C" className='radialChart__legend'>
                <tspan className='radialChart__legend-value' x="0" dy="-1em">{score * 100}%</tspan>
                <tspan className='radialChart__legend-label' x="0" dy="1.5em">de votre objectif</tspan>
              </text>
            </g>
          }
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

export default RadialCharts;
