import React from 'react';
import "./NutrientsContainer.scss";

function NutrientsContainer(props) {
  

  return (
    <div className='nutrients-container'>
      <img src={props.nutrientIcon} alt="icône représentant un nutriment" />
      <div className='nutrients-info'>
        <span className='nutrient-value'>{props.keyData}</span>
        <span className='nutrient-name'>{props.nutrientName}</span>

      </div>
    </div>
  )
} 

export default NutrientsContainer