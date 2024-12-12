import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import ProductDetail from "../screens/ProductDetail"

const Stack = createStackNavigator()

const HomeNavigator = () => {
    return(
        <Stack.Navigator
            initialRouteName="HomeScreen"
        >
            <Stack.Screen 
                name="HomeScreen"
                component={Home}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name="ProductDetail"
                component={ProductDetail}
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

export default HomeNavigator