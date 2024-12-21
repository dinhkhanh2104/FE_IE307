import { createStackNavigator } from "@react-navigation/stack";
import Categories from "../screens/Categories";
import ProductDetail from "../screens/ProductDetail";
import Checkout from "../screens/Checkout";
const Stack = createStackNavigator()

const CategoriesNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="CategoriesScreen"
        >
            <Stack.Screen
                name="CategoriesScreen"
                component={Categories}
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

export default CategoriesNavigator