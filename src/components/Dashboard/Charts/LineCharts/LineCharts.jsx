import React, { useContext, PureComponent } from 'react';
import { LineChart, ReferenceArea, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./LineCharts.scss";
import UserContext from '../../../../context/UserContext.jsx';

function LineCharts() {
  const { userSessions } = useContext(UserContext);

  if (!userSessions) {
    return <div>Loading...</div>;
  }

  //On récupère l'objet data dans une variable objet sessions
  const { sessions } = userSessions.data;
  const daysOfWeekInitials = ["L", "M", "M", "J", "V", "S", "D"];

  return (

      <ResponsiveContainer width="40%" height="100%" className={"linechart-container"}>
        <LineChart
          width={300}
          height={300}
          data={sessions}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} fill='#FF0000'/>

          <XAxis dataKey="day"   tickFormatter={(value, index) => daysOfWeekInitials[index]}   
            tick={{ fontSize: '14px', dy: 12, textAlign: 'center' }}  
         
          />
          <YAxis opacity={0}  />
          <Tooltip 
          content={(tooltipProps) => {
            const { payload } = tooltipProps;
            if (payload && payload.length > 0) {
              const data = payload[0].payload;
              return (
                <div style={{ backgroundColor: '#FFFFFF', padding: '5px', fontSize: "11px" , fontWeight: "500"}}>
                  <p>{data.sessionLength} min</p>
                </div>
              );
            }
            return null;
          }}/>
          <Legend />
          <Line type="monotone" dataKey="sessionLength" stroke="#FFFFFF" dot={false} strokeWidth={3}/>
          <text x={100} y={50} style={{ fontSize: '14px' }}>Durée moyenne des sessions</text>

          <ReferenceArea x1={5} x2={7} fill="#800000" fillOpacity={0.3} />

        </LineChart>
      </ResponsiveContainer>
        
  )
}

export default LineCharts