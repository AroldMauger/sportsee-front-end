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
  const tickFill = '#f0bab4';

const CustomTick = ({ index, x, y }) => {
    let label;
    switch (index) {
      case 0:
        label = 'L';
        break;
      case 1:
      case 2:
        label = 'M';
        break;
      case 3:
        label = 'J';
        break;
      case 4:
        label = 'V';
        break;
      case 5:
        label = 'S';
        break;
      case 6:
        label = 'D';
        break;
      default:
        break;
    }
    return (
      <text x={x - ((index -2) * 8)} y={y} fill={tickFill}>  {/* Ici on modifie l'espace entre les ticks*/}
        {label}
      </text>
    );
  };
  return (

      <ResponsiveContainer width={400} height="100%" aspect={1} className={"linechart-container"} >
        <LineChart
          data={sessions}
          margin={{
            left: 0,
            top: 20,
            right: 0,            
            bottom: 5, 
          }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} fill='#FF0000' />

          <XAxis 
            dataKey="day" 
           tick={<CustomTick />}
         //   padding={{ left : 20, right: 20 }} 
                     tickLine={false}
                     axisLine={false}
                      tickSize={-35} 
                 interval={"preserveStartEnd"}

          />

          <YAxis 
         // opacity={0}  
          domain={["dataMin - 15", "dataMax + 10"]}
         hide="true"

          />
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
          }}
          />
          <Legend />
          <Line type="natural" dataKey="sessionLength" stroke="#FFFFFF" dot={false} strokeWidth={3}  />
          <text x={100} y={50} style={{ fontSize: '14px' }}>Durée moyenne des sessions</text>

          <ReferenceArea x1={5} x2={7} fill="#800000" fillOpacity={0.3} />

        </LineChart>
      </ResponsiveContainer>
        
  )
}

export default LineCharts