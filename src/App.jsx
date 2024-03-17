import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import AsideNavbar from './components/AsideNavbar/AsideNavbar.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import "./App.scss";
import { UserProvider } from './context/UserContext.jsx';

function App() {
  return (
    // Ici le provider entoure l'application pour pouvoir accéder aux données partout
    <UserProvider>

        <div className='all-project-container'>
          <Navbar/>
          <main>
            <AsideNavbar/>
            <Dashboard/>
          </main>
        </div>

    </UserProvider>

  )
}

export default App

