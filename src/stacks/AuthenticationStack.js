import React from "react";
import {StyleSheet} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createNativeStackNavigator();
const AuthenticationStack = () => (
    <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} options={styles.header} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={styles.headerWithNav} />
    </Stack.Navigator>
)

const styles = StyleSheet.create({
    header: {
        headerStyle: {
            backgroundColor: '#F1E6E0',
        },
        headerShown: false,
    },

    headerWithNav: {
        headerStyle: {
            backgroundColor: '#F1E6E0',
        },
        headerShadowVisible: false,
        headerBackTitleVisible: true,
        headerTintColor: '#F19336',
        title: null,
    }
})

export default AuthenticationStack;
