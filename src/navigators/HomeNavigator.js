import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import ProductDetail from "../screens/ProductDetail"
import CartNavigator from "./CartNavigator";
import Checkout from "../screens/Checkout";
import AddressSelection from "../screens/AddressSelection ";
import AddAddressScreen from "../screens/AddAddress";
import EditAddressScreen from "../screens/EditAddress";
import SaleNavigator from "./SaleNavigator";
import Search from "../screens/Search";


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
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SaleNavigator"
                component={SaleNavigator}
                options={{
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
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="AddAddress"
                component={AddAddressScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="EditAddress"
                component={EditAddressScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Search"
                component={Search}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>

    )
}

export default HomeNavigator