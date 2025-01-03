import { createStackNavigator } from "@react-navigation/stack";
import Sale from "../screens/Sale";
import ProductDetail from "../screens/ProductDetail";
import Checkout from "../screens/CheckOut";

const Stack = createStackNavigator()

const SaleNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="SaleScreen"
        >
            <Stack.Screen
                name="SaleScreen"
                component={Sale}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ProductDetail"
                component={ProductDetail}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Checkout"
                component={Checkout}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>

    )
}

export default SaleNavigator