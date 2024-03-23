import React, { createContext, useState, useEffect } from 'react';
import { getUser, getUserActivity, getUserPerformance, getUserSessions } from '../service/Api.jsx';
//import { getUser, getUserActivity, getUserPerformance, getUserSessions } from '../service/Mockapi.jsx';

// On utilise la méthode createContext() de React
const UserContext = createContext();

// On définit un provider pour accéder aux données dans toute l'application (voir App.jsx)
export const UserProvider = ({ children }) => {
    const userId = 18;

    // ON RECUPERE LES DONNES userData 
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const fetchData = () => {
                getUser(userId)
                .then(data => {
                    setUserData(data);
                })
        };
        fetchData();
    }, []);

    const calculateScore = () => {
        if (!userData) return 0;
        return userData.data.todayScore !== undefined ? userData.data.todayScore : userData.data.score !== undefined ? userData.data.score : 0;
    };

        // ON RECUPERE LES DONNES userActivity
        const [userActivity, setUserActivity] = useState(null);
        useEffect(() => {
            const fetchData = () => {
                getUserActivity(userId)
                    .then(data => {
                        setUserActivity(data);
                    })
            };
            fetchData();
        }, []);

         // ON RECUPERE LES DONNES userSessions
         const [userSessions, setUserSessions] = useState(null);
         useEffect(() => {
             const fetchData = () => {
                     getUserSessions(userId)
                     .then(data => {
                        setUserSessions(data);
                     })
             };
             fetchData();
         }, []);

          // ON RECUPERE LES DONNES userPerformance
          const [userPerformance, setUserPerformance] = useState(null);
          useEffect(() => {
              const fetchData = () => {
                     getUserPerformance(userId)
                      .then(data => {
                        setUserPerformance(data);
                      })
              };
              fetchData();
          }, []);
        
        const contextValue = {
            userData: userData,
            userActivity: userActivity,
            userSessions : userSessions,
            userPerformance: userPerformance,
            score:calculateScore()
        };
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;


// ESTCE QUE JE SUIS EN TRAIN DE CHARGER ? +> AFFICHE RIEN (isLoading)
// ESCE QUE JE SUIS EN ERREUR +> AFFICHE UN MESSAGE D'ERREUR (Error)
// ESTCE QUE J'AI MES DONNEES = > AFFICHE LE GRAPHIQUE (userData, userPerformance, userActivity, userAverageSession) 
//(environ 4 fetch au total pour récupérer les données pour les graph)