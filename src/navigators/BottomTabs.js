import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator"
import Wishlist from "../screens/Wishlist";
import Profile from "../screens/Profile";
import CartNavigator from "./CartNavigator";
import { Icon } from "react-native-elements";
import { COLORS, SIZES } from "../constants/theme";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const Tab = createBottomTabNavigator()

export default function BottomTabs() {

    const {cart} = useContext(AuthContext)

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
                component={HomeNavigator}
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
                component={CartNavigator}
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