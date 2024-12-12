import { createStackNavigator } from "@react-navigation/stack";
import Cart from "../screens/Cart";
import CheckOut from "../screens/CheckOut";

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
                    headerStyle : {
                        borderBottomColor : 'rgba(0,0,0,0.2)',
                        borderBottomWidth : 1,
                    },
                }}
            />
        </Stack.Navigator>

    )
}

export default CartNavigator