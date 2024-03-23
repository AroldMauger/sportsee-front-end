import React from 'react'
import "./HasError.scss";

function HasError() {
  return (
    <div className='error-message'>
      <p>Oups, une erreur est survenue.</p>
      <p>Veuillez réessayer plus tard.</p>
    </div>
  )
}

export default HasError