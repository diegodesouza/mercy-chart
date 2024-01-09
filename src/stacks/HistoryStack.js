import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import History from "../screens/HistoryScreen";

const Stack = createNativeStackNavigator();
const HistoryStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HistoryStack"
                component={History}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}

export default HistoryStack;
