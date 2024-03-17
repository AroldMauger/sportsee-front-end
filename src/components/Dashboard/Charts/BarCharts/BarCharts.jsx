import React, { useContext, PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./BarCharts.scss";
import UserContext from '../../../../context/UserContext.jsx';


function BarCharts() {
  const { userActivity } = useContext(UserContext);

  if (!userActivity) {
    return <div>Loading...</div>;
  }

  //On récupère l'objet data dans une variable objet sessions
  const { sessions } = userActivity.data;

  return (
      <ResponsiveContainer width="100%" height={320} className='barchart-container' style={{ backgroundColor: '#FBFBFB', borderRadius: "10px"}}>
        <BarChart
          width={500}
          height={300}
          data={sessions}
          margin={{
            top: 50,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          
        >
          <text x={20} y={20} style={{ fontSize: '20px', fontWeight: 'bold' }}>Activité quotidienne</text>
          <CartesianGrid strokeDasharray="3 3" vertical={false}  />
          <XAxis dataKey="day" tickFormatter={(value, index) => index + 1} />  {/* Pour obtenir une numérotation en dessous des barres, on utilise l'index qui commence à 0, donc on ajoute +1*/}
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" opacity={0} />
          <YAxis yAxisId="right" orientation="right" stroke="#9B9EAC"           domain={["dataMin - 10", "dataMax + 10"]}/>        {/*domain={[69, 71]} */}

          {/*Tooltip se charge de la modale qui apparaît au survol sur les barres */}
          <Tooltip 
          content={(tooltipProps) => {
            const { payload } = tooltipProps;
            if (payload && payload.length > 0) {
              const data = payload[0].payload;
              return (
                <div style={{ backgroundColor: '#E60000', padding: '10px', fontSize: "11px", color:"white" }}>
                  <p>{data.kilogram}kg</p>
                  <p>{data.calories}kCal</p>
                </div>
              );
            }
            return null;
          }}
        />
          <Legend 
          align="right" 
          verticalAlign="top" 
          iconType="circle" 
          iconSize={10}
          wrapperStyle={{ top: 0 }} 

           payload={[
            { value: 'Poids (kg)', color: '#282D30' },
            { value: 'Calories brûlées (kCal)', color: '#E60000' },
          ]}
          />
          <Bar radius={[20, 20, 0, 0]} maxBarSize={8} yAxisId="right" dataKey="kilogram" fill="#282D30"   /> 
          <Bar radius={[20, 20, 0, 0]} maxBarSize={8} yAxisId="left" dataKey="calories" fill="#E60000"   />
        </BarChart>
      </ResponsiveContainer>
  )
}

export default BarCharts