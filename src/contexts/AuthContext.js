import { createContext, useState, useEffect, createElement, Children } from "react";


const AuthContext = createContext({})
export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(true)
    const [cart, setCart] = useState()
    
    return (
        <AuthContext.Provider
            value={{token, setToken, cart, setCart}}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext