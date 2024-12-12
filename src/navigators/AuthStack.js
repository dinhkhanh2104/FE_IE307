import { createStackNavigator } from "@react-navigation/stack";

import IntroSiler from "../screens/IntroSlider";
import Login from "../screens/Login";
import ForgotPass from "../screens/ForgotPass";
import Register from "../screens/Register";


const Stack = createStackNavigator()

export default function AuthStack() {
    return (
        <Stack.Navigator
            initialRouteName="IntroSlider"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="IntroSlider"
                component={IntroSiler}
            />
            <Stack.Screen
                name="Login"
                component={Login}
            />

            <Stack.Screen
                name="Register"
                component={Register}
            />

            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPass}
            />

        </Stack.Navigator>
    )
}