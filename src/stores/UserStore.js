import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';
import database from '@react-native-firebase/database';
import {commonStore} from './CommonStore';

class UserStore {
    user = {};

    constructor() {
        makeAutoObservable(this);
    }

    getUsers = async () => {
        try {
            commonStore.handleCommonStore('isLoading', true);
            return await database().ref('users').once('value');
        } catch (error) {
            console.log('getUsers error', error);
        } finally {
            commonStore.handleCommonStore('isLoading', false);
        }
    };

    getUser = async userId => {
        try {
            commonStore.handleCommonStore('isLoading', true);
            return await database().ref(`users/${userId}`).once('value');
        } catch (error) {
            console.log('getUser error', error);
        } finally {
            commonStore.handleCommonStore('isLoading', false);
        }
    };

    setUser = async (userId, user) => {
        try {
            commonStore.handleCommonStore('isLoading', true);
            return await database().ref(`users/${userId}`).set({
                email: user.email,
                uid: user.uid,
                displayName: user.displayName,
            });
        } catch (error) {
            console.log('setUser error', error);
        } finally {
            console.log('user set');
            commonStore.handleCommonStore('isLoading', false);
        }
    };

    updateUser = async user => {
        try {
            // update user
        } catch (e) {
            console.log('UpdateUserError ------> ', e.message);
        }
    };

    deleteUser = async user => {
        try {
            // update user
        } catch (e) {
            console.log('UpdateUserError ------> ', e.message);
        }
    };
}

export const userStore = new UserStore();

export const UserStoreContext = createContext(userStore);

export const useUserStore = () => useContext(UserStoreContext);
