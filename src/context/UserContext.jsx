import React, { createContext, useState, useEffect } from 'react';

// On utilise la méthode createContext() de React
const UserContext = createContext();

// On définit un provider pour accéder aux données dans toute l'application (voir App.jsx)
export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            fetch("http://localhost:3000/user/12")  // on fetch sur l'id 12
                .then((response) => response.json())
                .then(data => {
                    setUserData(data);
                })
        };
        fetchData();
    }, []);

    return (
        <UserContext.Provider value={userData}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
