import { createStackNavigator } from "@react-navigation/stack";
import Product from "../screens/Admin/Product";
import CreateProduct from "../screens/Admin/CreateProduct";
const Stack = createStackNavigator()

const ProductNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="ProductScreen"
        >
            <Stack.Screen
                name="ProductScreen"
                component={Product}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CreateProduct"
                component={CreateProduct}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>

    )
}

export default ProductNavigator