import { createStackNavigator } from "@react-navigation/stack";
import Wishlist from "../screens/Wishlist";
import ProductDetail from "../screens/ProductDetail";

const Stack = createStackNavigator()

const WishlistNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="WishlistScreen"
        >
            <Stack.Screen
                name="WishlistScreen"
                component={Wishlist}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ProductDetail"
                component={ProductDetail}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>

    )
}

export default WishlistNavigator