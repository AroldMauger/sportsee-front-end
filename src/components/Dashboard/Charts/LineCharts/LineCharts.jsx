import React, { useContext, PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "./LineCharts.scss";
import UserContext from '../../../../context/UserContext.jsx';

function LineCharts() {
  const { userSessions } = useContext(UserContext);

  if (!userSessions) {
    return <div>Loading...</div>;
  }

  //On récupère l'objet data dans une variable objet sessions
  const { sessions } = userSessions.data;

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
      <text x={x - ((index -2) * 8)} y={y} fill="#FFFFFF" opacity={0.5}>  {/* Ici on modifie l'espace entre les ticks*/}
        {label}
      </text>
    );
  };
  return (

      <ResponsiveContainer width={300} aspect={1} className={"linechart-container"}  style={{ position: "relative", width: "100%", height: "100%",  backgroundColor: '#FF0000', borderRadius: "10px" }} >
        

        <LineChart
          data={sessions}
          margin={{
            left: 0,
            top: 20,
            right: 0,            
          }}
          
          >
          <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} fill='#FF0000' />

          <XAxis 
          dataKey="day" 
          tick={<CustomTick />}
          tickLine={false}
          axisLine={false}
          tickSize={0} 
          interval={"preserveStartEnd"}

          />

          <YAxis 
          domain={["dataMin - 15", "dataMax + 30"]}
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

          {/* LinearGradient avec opacity pour la courbe */}
          <defs>
            <linearGradient id="lineGradient">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.5}/>
              <stop offset="70%" stopColor="#FFFFFF"/>
            </linearGradient>
          </defs>
      
          <Line type="natural" dataKey="sessionLength" stroke="url(#lineGradient)" dot={false} strokeWidth={3} opacity={0.7}   style={{ position: "absolute", zIndex: 1 }} // Ajoutez cette ligne pour positionner la ligne au-dessus
 />
          <text x={40} y={50} style={{ fontSize: '18px', fill: '#FFFFFF', fontFamily: 'Roboto', fontWeight:'500', opacity:'0.5' }}>
          <tspan>
            Durée moyenne des
          </tspan>
          <tspan x={40} dy="1.2em">
            sessions
          </tspan>
        </text>


        </LineChart>
        
        {/* Rectangle Dark-red pour les week-end */}
        <div style={{ position: "absolute", top: 0, right: 0, width: "33%", height: "100%", backgroundColor: "#800000", opacity: 0.2, borderRadius: "0px 10px 10px 0px", zIndex: 1, pointerEvents: "none"}}></div>

      </ResponsiveContainer>
        
  )
}

export default LineCharts