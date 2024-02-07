import React, { useContext } from 'react';
import "./Hello.scss";
import UserContext from '../../context/UserContext.jsx';

function Hello() {
  const userData = useContext(UserContext);

  if (!userData) {
    return <div>Loading...</div>;
  }
  //On récupère l'objet data dans une variable userInfos
  const { userInfos } = userData.data;

  return (
    <div className='hello-container'>
        <h2 className='hello-title'>Bonjour <span className='username-red'>{userInfos.firstName}</span></h2>
        <p>Félicitations... Vous avez explosé vos objectifs hier👏</p>
    </div>
  )
}

export default Hello