import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { observer } from "mobx-react";
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useAuthenticationStore } from "./app/stores/AuthenticationStore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AuthenticationStackScreen from "./app/stacks/AuthenticationStackScreen";
import { useCommonStore } from "./app/stores/CommonStore";
import BottomBar from "./app/components/BottomBar";
import {useUserStore} from "./app/stores/UserStore";
import {useChildStore} from "./app/stores/ChildStore";

const App = () => {
    const authStore = useAuthenticationStore();
    const userStore = useUserStore();
    const childStore = useChildStore();
    const {children, handleChangeChildStore} = childStore;
    const {handleChangeUserStore, getUser} = userStore;
    const { isLoading } = useCommonStore();
    const { handleChangeAuthenticationStore, isSignedIn } = authStore;
    const auth = getAuth();

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, async (user) => {
            if (user) {
                handleChangeAuthenticationStore('loggedInUser', user)
                handleChangeAuthenticationStore('isSignedIn', true)
                handleChangeUserStore('user', user)
                const currentUser = await getUser(user.uid)
                if (currentUser?.selectedChildId !== '') {
                    const foundChild = children.find((child) => child.uid === currentUser?.selectedChildId)
                    handleChangeChildStore('child', foundChild);
                }
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
