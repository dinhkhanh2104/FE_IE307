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
        </Stack.Navigator>

    )
}

export default HomeNavigator