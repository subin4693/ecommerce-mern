import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const CartContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useCartContext = () => useContext(Context);
