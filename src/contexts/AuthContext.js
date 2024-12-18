import { createContext, useState, useEffect } from "react";
import { getCart } from "../services/axios/actions/CartAction";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext({})
export const AuthProvider = ({children}) => {
    const [token, setToken] = useState('')
    const [cart, setCart] = useState([])
    const fetchCart = async () => {
        if (token) {
            try {
                const response = await getCart()
                setCart(response)
            }
            catch(err) {
                console.error(err);
            }
        }
      
    }

    useEffect(() => {
       
        fetchCart()
    }, [token]);
    
    return (
        <AuthContext.Provider
            value={{token, setToken, cart, setCart,fetchCart}}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext