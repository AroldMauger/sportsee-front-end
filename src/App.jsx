import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import AsideNavbar from './components/AsideNavbar/AsideNavbar.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import "./App.scss";

function App() {
  return (
    <div>
      <Navbar/>
      <main>
        <AsideNavbar/>
        <Dashboard/>
      </main>
    </div>
  )
}

export default App