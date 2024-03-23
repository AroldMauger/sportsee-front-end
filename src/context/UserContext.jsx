import React, { createContext, useState, useEffect } from 'react';
import { getUser, getUserActivity, getUserPerformance, getUserSessions } from '../service/Api.jsx';
//import { getUser, getUserActivity, getUserPerformance, getUserSessions } from '../service/Mockapi.jsx';

// On utilise la méthode createContext() de React
const UserContext = createContext();

// On définit un provider pour accéder aux données dans toute l'application (voir App.jsx)
export const UserProvider = ({ children }) => {
    const userId = 18;

    const [userData, setUserData] = useState(null);
    const [userActivity, setUserActivity] = useState(null);
    const [userSessions, setUserSessions] = useState(null);
    const [userPerformance, setUserPerformance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUser(userId);
                setUserData(userData);
                const userActivityData = await getUserActivity(userId);
                setUserActivity(userActivityData);
                const userSessionsData = await getUserSessions(userId);
                setUserSessions(userSessionsData);
                const userPerformanceData = await getUserPerformance(userId);
                setUserPerformance(userPerformanceData);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        setLoading(true);
        fetchData();
    }, []);

    const calculateScore = () => {
        if (!userData) return 0;
        return userData.data.todayScore !== undefined ? userData.data.todayScore : userData.data.score !== undefined ? userData.data.score : 0;
    };

    const contextValue = {
        userData,
        userActivity,
        userSessions,
        userPerformance,
        score: calculateScore(),
        loading,
        error
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;