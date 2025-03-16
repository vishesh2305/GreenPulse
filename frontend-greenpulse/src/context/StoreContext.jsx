import React, { createContext, useRef, useState } from "react";  // ✅ Add React import
import { itemlist } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    
    function addToCart(id) {
        if (!cartItems[id]) {
            setCartItems((c) => ({ ...c, [id]: 1 }));
        } else {
            setCartItems((c) => ({ ...c, [id]: c[id] + 1 }));
        }
    }

    const imageFiles = useRef([]);

    function removeFromCart(id) {
        setCartItems((c) => ({ ...c, [id]: c[id] - 1 }));
    }

    const contextValue = {
        itemlist,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        imageFiles,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
