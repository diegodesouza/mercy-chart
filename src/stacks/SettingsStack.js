import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ChildProfileScreen from "../screens/ChildProfileScreen";
import CaretakerProfileScreen from "../screens/CaretakerProfileScreen";
import AddChildScreen from "../screens/AddChildScreen";
import AddCaretakerScreen from "../screens/AddCaretakerScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createNativeStackNavigator();
const SettingsStack = () => {
    return (
        <Stack.Navigator id="settingsStack">
            <Stack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="ChildProfile"
                component={ChildProfileScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="CaretakerProfile"
                component={CaretakerProfileScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="AddChild"
                component={AddChildScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="AddCaretaker"
                component={AddCaretakerScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}

export default SettingsStack;
