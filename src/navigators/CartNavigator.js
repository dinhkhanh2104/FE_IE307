import { createStackNavigator } from "@react-navigation/stack";
import Cart from "../screens/Cart";
import CheckOut from "../screens/CheckOut";
import AddressSelection from "../screens/AddressSelection ";
import AddAddressScreen from "../screens/AddAddress";
import EditAddressScreen from "../screens/EditAddress";

const Stack = createStackNavigator()

const CartNavigator = () => {
    return(
        <Stack.Navigator
            initialRouteName="CartScreen"
        >
            <Stack.Screen 
                name="CartScreen"
                component={Cart}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name="CheckOut"
                component={CheckOut}
                options={{
                   headerShown:false
                }}
            />
            <Stack.Screen
                name="AddressSelection"
                component={AddressSelection}
                options={{
                headerShown:false
                }}
            />
            <Stack.Screen
                name="AddAddress"
                component={AddAddressScreen}
                options={{
                headerShown:false
                }}
            />
            <Stack.Screen
                name="EditAddress"
                component={EditAddressScreen}
                options={{
                headerShown:false
                }}
            />
        </Stack.Navigator>

    )
}

export default CartNavigator