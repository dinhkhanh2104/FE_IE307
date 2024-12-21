import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { useContext } from "react";
import BottomTabs from "./BottomTabs"
import AuthContext from "../contexts/AuthContext";
import AdminNavigator from "./AdminNavigator";

export default function Navigators() {

    const { token, role } = useContext(AuthContext)

return (
    <NavigationContainer>
        {/* {token ? ( role === "admin" ? <AdminNavigator /> : <BottomTabs />) : <AuthStack />} */}
        {token ? (  <BottomTabs />) : <AuthStack />}
    </NavigationContainer>
)
}