import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import HomeStack from "../stacks/HomeStack";
import HistoryStack from "../stacks/HistoryStack";
import SettingsStack from "../stacks/SettingsStack";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useChildStore} from "../stores/ChildStore";

const Tab = createBottomTabNavigator();

const BottomBar = () => {
    const insets = useSafeAreaInsets();
    const childStore = useChildStore();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case 'History':
                            iconName = 'history';
                            break;
                        case 'Settings':
                            iconName = 'settings';
                            break;
                        default:
                            iconName = 'home';
                    }

                    return <MaterialIcons name={iconName} size={size} color={color} />;
                },
                tabBarStyle: {
                    paddingBottom: 20,
                    paddingTop: 10,
                    height: insets ? insets.bottom + 90 : 70
                },
                tabBarLabelStyle: { paddingBottom: 15 },
                tabBarActiveTintColor: '#D92D00',
                tabBarInactiveTintColor: 'gray',
                headerShown: false
            })}
        >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="History" component={HistoryStack} />
            <Tab.Screen name="Settings" component={SettingsStack} />
        </Tab.Navigator>
    );
}

export default BottomBar
