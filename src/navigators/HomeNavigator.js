import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import ProductDetail from "../screens/ProductDetail"
import CartNavigator from "./CartNavigator";
import Checkout from "../screens/CheckOut";
import AddressSelection from "../screens/AddressSelection ";
import AddAddressScreen from "../screens/AddAddress";
import EditAddressScreen from "../screens/EditAddress";

const Stack = createStackNavigator()

const HomeNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
        >
            <Stack.Screen
                name="HomeScreen"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CartNavigator"
                component={CartNavigator}
                options={{
                    tabBarVisible: false, 
                    headerShown: false 
                }}
            />
            <Stack.Screen
                name="ProductDetail"
                component={ProductDetail}
                options={{
                    headerStyle: {
                        // borderBottomColor: 'rgba(0,0,0,0.2)',
                        // borderBottomWidth: 1,
                        // height:80,
                    },
                    // tabBarVisible: false, 
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="CheckOut"
                component={Checkout}
                options={{
                    headerShown: false,
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

export default HomeNavigator