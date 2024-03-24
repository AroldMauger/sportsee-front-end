import React, { useContext, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "./LineCharts.scss";
import UserContext from '../../../../context/UserContext.jsx';

function LineCharts() {
  const { userSessions } = useContext(UserContext);
  const [hoverIndex, setHoverIndex] = useState(null); // La fonction "setHoverIndex" mettre à jour la valeur de hoverIndex

  const { sessions } = userSessions.data;

  const CustomTick = ({ index, x, y }) => {
    let label;
    switch (index) {  // On associe une lettre à chaque index du tableau
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
      <text x={x - ((index - 2) * 8)} y={y} fill="#FFFFFF" opacity={0.5}> {/* Pour que les initiales des jours soient plus rapprochées */}
        {label}
      </text>
    );
  };
  // On change la valeur de la variable (width) en pourcentage en fonction de l'index survolé 
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
        // au survol sur le graphique on veut récupérer la position horizontale de la souris
        onMouseMove={(e) => {
          const xAxis = e && e.activePayload && e.activePayload[0] && e.activePayload[0].payload;
          if (xAxis) {
            const index = sessions.findIndex((session) => session.day === xAxis.day);
            setHoverIndex(index); // la fonction "setHoverIndex" met à jour la variable hoverIndex définie plus haut
          } else {
            setHoverIndex(null); // s'il n'y a pas de survol sur le graphique, alors la fonction renvoie null et le rectangle foncé n'apparaît pas
          }
        }}
      >
        <XAxis 
          dataKey="day" 
          tick={<CustomTick />}
          tickLine={false} // faire disparaitre les séparateurs tick de l'axe X
          axisLine={false} // faire disparaitre l'axe X
          tickSize={0} 
          interval={"preserveStartEnd"}
        />
        <YAxis 
          domain={["dataMin - 20", "dataMax + 30"]} // on définit une tranche de valeurs pour mieux centrer la ligne du graphique
          hide={true}
        />
        {/*Tooltip se charge de la modale qui apparaît au survol sur les barres */}
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
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.5}/> {/* Mise en forme de la ligne avec opacité progressive */}
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
          style={{ position: "absolute" }} 
        />
        <text x={40} y={50} style={{ fontSize: '18px', fill: '#FFFFFF', fontFamily: 'Roboto', fontWeight:'500', opacity:'0.5' }}>
          <tspan>Durée moyenne des</tspan>
          <tspan x={40} dy="1.2em">sessions</tspan>
        </text>
      </LineChart>
      {/* Si un index survolé existe, alors un rectangle rouge foncé apparaît pour remplir le graphique. 
      La largeur (width) de ce rectangle dépend de la variable hoverIndex*/}
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
