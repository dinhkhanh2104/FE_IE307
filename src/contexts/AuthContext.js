import { createContext, useState, useEffect } from "react";
import { getCart } from "../services/axios/actions/CartAction";
import { getAddress } from "../services/axios/actions/AddressAction"; // Assuming you have this action for fetching address

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState([]);

  // Function to fetch cart data
  const fetchCart = async () => {
    if (token) {
      try {
        const response = await getCart(); // Fetch cart data using your getCart function
        setCart(response);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    }
  };

  // Function to fetch address data
  const fetchAddress = async () => {
    if (token) {
      try {
        const response = await getAddress(); // Fetch address data using your getAddress function
        setAddress(response); // Assuming response is an array of address objects
      } catch (err) {
        console.error("Error fetching address:", err);
      }
    }
  };

  // Fetch cart and address data when token is updated
  useEffect(() => {
    if (token) {
      fetchCart(); // Fetch cart when token changes
      fetchAddress(); // Fetch address when token changes
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        cart,
        setCart,
        address,
        setAddress,
        fetchCart,
        fetchAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
