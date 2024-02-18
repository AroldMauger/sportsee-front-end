import React, { useContext, PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./BarCharts.scss";
import UserContext from '../../../../context/UserContext.jsx';


function BarCharts() {
  const { userActivity } = useContext(UserContext);

  if (!userActivity) {
    return <div>Loading...</div>;
  }

  //On récupère l'objet data dans une variable userInfos
  const { sessions } = userActivity.data;

  return (
      <ResponsiveContainer width="100%" height="100%" className='barchart-container'>
        <BarChart
          width={500}
          height={300}
          data={sessions}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <text x={20} y={20} style={{ fontSize: '20px', fontWeight: 'bold' }}>Activité quotidienne</text>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" opacity={0}/>
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"  />
          <Tooltip />
          <Legend 
          align="right" 
          verticalAlign="top" 
          iconType="circle" 
           payload={[
            { value: 'Poids (kg)', type: 'rect', color: '#282D30' },
            { value: 'Calories brûlées (kCal)', type: 'rect', color: '#E60000' },
          ]}
          />
          <Bar yAxisId="right" dataKey="kilogram" fill="#282D30" />
          <Bar yAxisId="left" dataKey="calories" fill="#E60000" />
        </BarChart>
      </ResponsiveContainer>
  )
}

export default BarCharts