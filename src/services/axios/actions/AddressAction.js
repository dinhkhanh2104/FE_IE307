import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAddress = async () => {
  const token = await AsyncStorage.getItem('userToken');
  try {
    const response = await fetch('https://ie-307-6017b574900a.herokuapp.com/addresses',{
        method:"GET",
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()

    return data; // Assuming the response contains the user's addresses
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error;
  }
};
