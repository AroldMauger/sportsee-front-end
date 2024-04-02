import React, { useContext } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Legend, PolarAngleAxis } from 'recharts';
import UserContext from '../../../../context/UserContext.jsx';
import "./RadialCharts.scss";

function RadialCharts() {
  const { score  } = useContext(UserContext);

  const data = [{ score }];

  return (
    <ResponsiveContainer minWidthwidth={400} aspect={1}  style={{ width: "100%", background:"#FBFBFB", height: "100%", borderRadius: "10px" }} >
      <RadialBarChart cx="50%" cy="50%" innerRadius="55%" outerRadius="100%" 
      barSize={10} // la largeur de la barre rouge du graphique
      data={data}       
      startAngle={90} // ici on définit la position sur le cercle d'où part le graphique
      endAngle={450} // ici on définit la position sur le cercle où s'arrête le graphique
      >
      <circle cx="50%" cy="50%" r="27%" // on définit la largeur du cercle
      fill="#FFFFFF" />
      <PolarAngleAxis
        type="number"
        domain={[0, 1]} // le graphique affiche les données sur un axe allant de 0 à 1. 
        tick={false}    // on n'affiche pas les valeurs autour du graphique
        background="#FBFBFB"
        />
        <RadialBar  dataKey="score"  // on récupère les valeurs depuis le UserContext
        cornerRadius={50} // effet arrondi sur la barre rouge du graphique
        fill='#FF0000'/>

        <text
          className="title__lineChart"
          width="15"
          dominantBaseline={'hanging'} // le premier caractère du texte "Score" est aligné verticalement à x=24 et y=30
          x="24" // ici x et y serve à modifier la position du title "Score"
          y="30"
        >
          Score
        </text>
        <Legend
          layout="vertical" // permet d'aligner les deux balises <p> 
          verticalAlign="middle"
          fill="#74798C"
          content={() => (
            <div className='radialChart__legend'>
              <p className="radialChart__legend-value">{`${Math.round(score * 100)}%`}</p> {/*On affiche le score en % arrondi*/}
              <p className="radialChart__legend-label">de votre objectif</p>
            </div>
          )}
        />

      </RadialBarChart>
    </ResponsiveContainer>
  );
}

export default RadialCharts;


