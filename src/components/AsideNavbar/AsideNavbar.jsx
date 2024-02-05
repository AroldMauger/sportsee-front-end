import React from 'react'
import "./AsideNavbar.scss";

function AsideNavbar() {
  return (
    <div className='aside-nav'>
        <div className='icons-container'>
            <img src="aside-icon-1.png" alt="icône yoga" />
            <img src="aside-icon-2.png" alt="icône natation" />
            <img src="aside-icon-3.png" alt="icône vélo" />
            <img src="aside-icon-4.png" alt="icône musculation" />
        </div>
        <p className='copyright'>Copyright SportSee 2020</p>
    </div>
  )
}

export default AsideNavbar