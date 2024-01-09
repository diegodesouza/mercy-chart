/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import { observer } from "mobx-react/src";
import {NavigationContainer} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useAuthenticationStore} from './src/stores/AuthenticationStore';
import auth from '@react-native-firebase/auth';
import AuthenticationStack from './src/stacks/AuthenticationStack';
import {useCommonStore} from './src/stores/CommonStore';
import BottomBar from './src/components/BottomBar';
import { PaperProvider } from "react-native-paper";

const  App = () => {
    const authStore = useAuthenticationStore();
    const {isLoading} = useCommonStore();
    const {handleChangeAuthenticationStore, isSignedIn} = authStore;

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(user => {
            console.log('useEffect app user: ', user)
            if (user) {
                handleChangeAuthenticationStore('user', user);
                handleChangeAuthenticationStore('isSignedIn', true);
            } else {
                handleChangeAuthenticationStore('isSignedIn', false);
            }
        });
        return subscriber; // unsubscribe on unmount
    }, []);

    return (
        <SafeAreaProvider>
            <GestureHandlerRootView style={{flex: 1}}>
                <PaperProvider>
                    <NavigationContainer>
                        <Spinner
                            visible={isLoading}
                            textContent={'Loading...'}
                            cancelable
                            textStyle={{color: '#F19336'}}
                        />
                        {isSignedIn ? <BottomBar /> : <AuthenticationStack />}
                    </NavigationContainer>
                </PaperProvider>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    );
}

export default observer(App);
