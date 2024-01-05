import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import History from "../screens/History";

const HistoryStack = createNativeStackNavigator();
const HistoryStackScreen = () => {
    return (
        <HistoryStack.Navigator>
            <HistoryStack.Screen
                name="HomeStack"
                component={History}
                options={{headerShown: false}}
            />
        </HistoryStack.Navigator>
    );
}

export default HistoryStackScreen;