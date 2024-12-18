import { createStackNavigator } from "@react-navigation/stack";
import Categories from "../screens/Categories";
import ProductDetail from "../screens/ProductDetail";

const Stack = createStackNavigator()

const CategoriesNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Categories"
        >
            <Stack.Screen
                name="Categories"
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
        </Stack.Navigator>

    )
}

export default CategoriesNavigator