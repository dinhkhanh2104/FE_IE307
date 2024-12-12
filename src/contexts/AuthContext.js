import { createContext, useState, useEffect } from "react";
import { getCart } from "../services/axios/actions/CartAction";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext({})
export const AuthProvider = ({children}) => {
    const [token, setToken] = useState('')
    const [cart, setCart] = useState([])

    useEffect(() => {
        const fetchCart = async () => {
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    const userId = decoded.id;
                    const response = await getCart(userId)
                    setCart(response.products)
                }
                catch(err) {
                    console.error(err);
                }
            }
          
        }
        fetchCart()
    }, [token]);
    
    return (
        <AuthContext.Provider
            value={{token, setToken, cart, setCart}}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext