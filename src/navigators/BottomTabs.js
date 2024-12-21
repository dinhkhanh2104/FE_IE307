import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator"
import Profile from "../screens/Profile";
import { Icon } from "react-native-elements";
import { COLORS, SIZES } from "../constants/theme";
import WishlistNavigator from "./WishlistNavigator";
import CategoriesNavigator from "./CategoriesNavigator";
import Feather from '@expo/vector-icons/Feather';
import { useContext } from "react";
import  AuthContext  from "../contexts/AuthContext";


const Tab = createBottomTabNavigator()

export default function BottomTabs() {
    
    const {wishlist} = useContext(AuthContext)

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
                component={WishlistNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Icon name="heart" type="octicon" size={24} color={focused ? COLORS.primary : COLORS.black}/>
                    },
                    headerShown: false,
                  
                }}
            />

            <Tab.Screen
                name="Categories"
                component={CategoriesNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Feather name="grid" size={24} color={focused ? COLORS.primary : COLORS.black} /> 
                    },
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