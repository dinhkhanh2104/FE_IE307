import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { useContext } from "react";
import BottomTabs from "./BottomTabs"
import AuthContext from "../contexts/AuthContext";

export default function Navigators() {
    const { token } = useContext(AuthContext)
    return (
        <NavigationContainer>
            {token ? <BottomTabs /> : <AuthStack />}
        </NavigationContainer>
    )
}