import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import Ionicons from '@expo/vector-icons/Ionicons';

import Home from "../screens/Home";
import Wishlist from "../screens/Wishlist";
import Cart from "../screens/Cart";
import Profile from "../screens/Profile";
import { Icon } from "react-native-elements";
import { COLORS, SIZES } from "../constants/theme";

const Tab = createBottomTabNavigator()

export default function BottomTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={
                () => ({
                    tabBarActiveTintColor: COLORS.primary,
                    tabBarInactiveTintColor: COLORS.black,
                    tabBarLabelStyle: {
                        fontSize: SIZES.font12,
                    },
                    tabBarStyle: {
                        height: 56,
                    },
                })
            }
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Icon name="home" type="feather" size={24} color={focused ? COLORS.primary : COLORS.black}/>
                    },
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Wishlist"
                component={Wishlist}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Icon name="heart" type="octicon" size={24} color={focused ? COLORS.primary : COLORS.black}/>
                    },
                    headerShown: false
                }}
            />

            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Icon name="shopping-cart" type="feather" size={24} color={focused ? COLORS.primary : COLORS.black} />
                    },
                    tabBarBadge: 3,
                    headerShown: false
                    
                }}
            />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return <Icon name="user" type="feather" size={24} color={focused ? COLORS.primary : COLORS.black}/>
                        },
                        headerShown: false
                    }}
                />

        </Tab.Navigator>
    )
}