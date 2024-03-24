import { USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_MAIN_DATA, USER_PERFORMANCE } from "./data.js"

// Ici on importe les données mockées. On pourra utiliser ces fonctions dans le UserContext pour ne pas dépendre du backend. 
const getUser = async (userId) =>  {
    return {data:USER_MAIN_DATA.find(data => data.id === userId)}
}

const getUserActivity = async (userId)=>  {
    return {data:USER_ACTIVITY.find(data => data.userId === userId)}
}

const getUserSessions = async (userId)=> {
    return {data:USER_AVERAGE_SESSIONS.find(data => data.userId === userId)}
}

const getUserPerformance = async (userId)=> {
    return  {data:USER_PERFORMANCE.find(data => data.userId === userId)}
}

export {getUser, getUserActivity, getUserPerformance, getUserSessions}