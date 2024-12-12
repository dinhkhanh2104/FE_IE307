import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react"

import AuthStack from "./AuthStack";
import AuthContext from "../contexts/AuthContext"
import BottomTabs from "./BottomTabs"

export default function Navigators() {
    const { token } = useContext(AuthContext)
    return (
        <NavigationContainer>
            {!token ? <BottomTabs /> : <AuthStack />}
        </NavigationContainer>
    )
}
