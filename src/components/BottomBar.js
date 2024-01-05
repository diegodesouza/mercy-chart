import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import HomeStackScreen from "../stacks/HomeStackScreen";
import HistoryStackScreen from "../stacks/HistoryStackScreen";
import SettingsStackScreen from "../stacks/SettingsStackScreen";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

const BottomBar = () => {
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
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
                height: insets ? insets.bottom + 70 : 70
            },
            tabBarLabelStyle: { paddingBottom: 15 },
            tabBarActiveTintColor: '#D92D00',
            tabBarInactiveTintColor: 'gray',
            headerShown: false
        })}
        >
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="History" component={HistoryStackScreen} />
            <Tab.Screen name="Settings" component={SettingsStackScreen} />
        </Tab.Navigator>
    );
}

export default BottomBar
