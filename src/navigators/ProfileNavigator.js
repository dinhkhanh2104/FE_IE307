import { createStackNavigator } from "@react-navigation/stack";
import AddressSelection from "../screens/AddressSelection ";
import AddAddressScreen from "../screens/AddAddress";
import EditAddressScreen from "../screens/EditAddress";
import Profile from "../screens/Profile";
import MyOrdersScreen from "../screens/MyOrder";
import OrderDetailScreen from "../screens/OrderDetailScreen";
import FeedbackScreen from "../screens/Feedback";
const Stack = createStackNavigator()

const ProfileNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Profile"
        >
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
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
                name="MyOrdersScreen"
                component={MyOrdersScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="OrderDetailScreen"
                component={OrderDetailScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="FeedbackScreen"
                component={FeedbackScreen}
                options={{
                    headerShown: false
                }}
            />
            
        </Stack.Navigator>

    )
}

export default ProfileNavigator