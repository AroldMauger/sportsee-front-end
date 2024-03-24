// Ici on définit toutes les fonctions qui seront utilisées dans le UserContext. 
//Ces fonctions contiennent les fetch() avec les routes du backend.

const getUser = async (userId) =>  {
    return fetch(`http://localhost:3000/user/${userId}`) 
    .then((response) => response.json())
}

const getUserActivity = async (userId)=>  {
    return fetch(`http://localhost:3000/user/${userId}/activity`) 
    .then((response) => response.json())
}

const getUserSessions = async (userId)=> {
    return fetch(`http://localhost:3000/user/${userId}/average-sessions`) 
    .then((response) => response.json())
}

const getUserPerformance = async (userId)=> {
    return  fetch(`http://localhost:3000/user/${userId}/performance`) 
    .then((response) => response.json())
}

export {getUser, getUserActivity, getUserPerformance, getUserSessions}  // On exporte ces fonctions