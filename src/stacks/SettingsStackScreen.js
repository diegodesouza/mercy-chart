import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Settings from "../screens/Settings";
import ChildProfile from "../screens/ChildProfile";
import CaretakerProfile from "../screens/CaretakerProfile";
import AddChild from "../screens/AddChild";
import AddCaretaker from "../screens/AddCaretaker";

const SettingsStack = createNativeStackNavigator();
const SettingsStackScreen = () => {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen
                name="SettingsStack"
                component={Settings}
                options={{headerShown: false}}
            />
            <SettingsStack.Screen
                name="ChildProfile"
                component={ChildProfile}
                options={{headerShown: false}}
            />
            <SettingsStack.Screen
                name="CaretakerProfile"
                component={CaretakerProfile}
                options={{headerShown: false}}
            />
            <SettingsStack.Screen
                name="AddChild"
                component={AddChild}
                options={{headerShown: false}}
            />
            <SettingsStack.Screen
                name="AddCaretaker"
                component={AddCaretaker}
                options={{headerShown: false}}
            />
        </SettingsStack.Navigator>
    );
}

export default SettingsStackScreen;