import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <Context.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useUserContext = () => useContext(Context);
