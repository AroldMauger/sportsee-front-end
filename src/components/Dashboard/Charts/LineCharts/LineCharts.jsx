import React, { useContext, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "./LineCharts.scss";
import UserContext from '../../../../context/UserContext.jsx';

function LineCharts() {
  const { userSessions } = useContext(UserContext);
  const [hoverIndex, setHoverIndex] = useState(null);

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
      <text x={x - ((index - 2) * 8)} y={y} fill="#FFFFFF" opacity={0.5}>
        {label}
      </text>
    );
  };

  let width;
  if (hoverIndex === 6) {
    width = "0%";
  } else if (hoverIndex === 5) {
    width = "16.5%";
  } else if (hoverIndex === 4) {
    width = "33%";
  } else if (hoverIndex === 3) {
    width = "50%";
  } else if (hoverIndex === 2) {
    width = "66.5%";
  } else if (hoverIndex === 1) {
    width = "83.5%";
  } else if (hoverIndex === 0) {
    width = "100%";
  }

  return (
    <ResponsiveContainer  minWidthwidth={400} aspect={1} className={"linechart-container"} style={{ position: "relative", backgroundColor: '#FF0000', borderRadius: "10px" }}>
      <LineChart
        data={sessions}
        margin={{
          left: 0,
          top: 20,
          right: 0,
        }}
        onMouseMove={(e) => {
          const xAxis = e && e.activePayload && e.activePayload[0] && e.activePayload[0].payload;
          if (xAxis) {
            const index = sessions.findIndex((session) => session.day === xAxis.day);
            setHoverIndex(index);
          } else {
            setHoverIndex(null);
          }
        }}
      >
        <XAxis 
          dataKey="day" 
          tick={<CustomTick />}
          tickLine={false}
          axisLine={false}
          tickSize={0} 
          interval={"preserveStartEnd"}
        />
        <YAxis 
          domain={["dataMin - 20", "dataMax + 30"]}
          hide={true}
        />
        <Tooltip 
          cursor={false}
          content={(tooltipProps) => {
            const { payload } = tooltipProps;
            if (payload && payload.length > 0) {
              const data = payload[0].payload;
              return (
                <div style={{ backgroundColor: '#FFFFFF', padding: '5px', fontSize: "11px", fontWeight: "500" }}>
                  <p>{data.sessionLength} min</p>
                </div>
              );
            }
            return null;
          }}
          
        />
        <defs>
          <linearGradient id="lineGradient">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.5}/>
            <stop offset="70%" stopColor="#FFFFFF"/>
          </linearGradient>
        </defs>
        <Line 
          type="natural" 
          dataKey="sessionLength" 
          stroke="url(#lineGradient)" 
          dot={false} 
          strokeWidth={3} 
          opacity={0.7}   
          style={{ position: "absolute", zIndex: 1 }} 
        />
        <text x={40} y={50} style={{ fontSize: '18px', fill: '#FFFFFF', fontFamily: 'Roboto', fontWeight:'500', opacity:'0.5' }}>
          <tspan>Durée moyenne des</tspan>
          <tspan x={40} dy="1.2em">sessions</tspan>
        </text>
      </LineChart>
      {hoverIndex !== null ? (
        <div className='dark-rectangle'
          style={{
            position: "absolute", 
            top: 0, 
            right: 0, 
            width: width, 
            height: "100%", 
            backgroundColor: "#800000", 
            opacity: 0.2, 
            borderRadius: "0px 10px 10px 0px", 
            zIndex: 1, 
            pointerEvents: "none",
          }}
        ></div>
      ) : null}
      <CartesianGrid width="100%" height="100%" strokeDasharray="3 3" vertical={false} horizontal={false} fill='#FF0000' />
    </ResponsiveContainer>
  );
}

export default LineCharts;
