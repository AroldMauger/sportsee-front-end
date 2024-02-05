import React from 'react'
import "./Navbar.scss";

function Navbar() {
  return (
    <div className='navbar-container'>
        <img src="logo.png" alt="Logo du site SportSee" />
        <ul className='navbar-links'>
            <li>Accueil</li>
            <li>Profil</li>
            <li>Réglage</li>
            <li>Communauté</li>
        </ul>
    </div>
  )
}

export default Navbar