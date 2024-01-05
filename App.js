import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { observer } from "mobx-react";
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useAuthenticationStore } from "./src/stores/AuthenticationStore";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import AuthenticationStackScreen from "./src/stacks/AuthenticationStackScreen";
import { useCommonStore } from "./src/stores/CommonStore";
import BottomBar from "./src/components/BottomBar";

const App = (props) => {
    const authStore = useAuthenticationStore();
    const { isLoading } = useCommonStore();
    const { handleChangeAuthenticationStore, isSignedIn } = authStore;
    const auth = getAuth();

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, (user) => {
            if (user) {
                handleChangeAuthenticationStore('user', user)
                handleChangeAuthenticationStore('isSignedIn', true)
            } else {
                handleChangeAuthenticationStore('isSignedIn', false)
            }
        });
        return subscriber; // unsubscribe on unmount
    }, [])

    return (
        <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <PaperProvider>
                    <NavigationContainer>
                        <Spinner
                            visible={isLoading}
                            textContent={'Loading...'}
                            cancelable
                            textStyle={{ color: '#F19336' }}
                        />
                        {
                            isSignedIn ?
                                <BottomBar /> :
                                <AuthenticationStackScreen />
                        }
                    </NavigationContainer>
                </PaperProvider>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    );
}

export default observer(App)
