import { createStackNavigator } from "@react-navigation/stack";
import Voucher from "../screens/Admin/Voucher";
import AddVoucher from "../screens/Admin/AddVoucher";


const Stack = createStackNavigator()

const DiscountNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Voucher"
        >
            <Stack.Screen
                name="Voucher"
                component={Voucher}
                options={{ headerShown: false }}
            />
             <Stack.Screen
                name="AddVoucher"
                component={AddVoucher}
                options={{ headerShown: false }}
            />
           
        </Stack.Navigator>

    )
}

export default DiscountNavigator