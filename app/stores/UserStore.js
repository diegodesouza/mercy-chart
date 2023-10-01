import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { get, set, ref } from "firebase/database";
import { FIREBASE_DB } from "../config/firebase.config";
import {commonStore} from "./CommonStore";

class UserStore {
    currentUserId = {};

    constructor() {
        makeAutoObservable(this)
    }

    getUsers = async () => {
        try {
            commonStore.handleCommonStore('isLoading', true)
            return await get(ref(FIREBASE_DB, 'users'));
        } catch (error) {
            console.log('error', error)
        } finally {
            commonStore.handleCommonStore('isLoading', false)
        }
    }

    getUser = async (userId) => {
        try {
            commonStore.handleCommonStore('isLoading', true)
            return await get(ref(FIREBASE_DB, `users/${userId}`))
        } catch (error) {
            console.log('error', error)
        } finally {
            commonStore.handleCommonStore('isLoading', false)
        }
    }

    setUser = async (userId, user) => {
        try {
            commonStore.handleCommonStore('isLoading', true)
            const userRef = doc(FIREBASE_DB, 'users', userId)

            await setDoc(userRef,  {
                email: user.email,
                uid: user.uid,
                displayName: user.displayName
            }, { capital: true }, { merge: true })
            this.handleChangeUserStore('currentUserId', userRef.id)
        } catch (error) {
            console.log('error', error)
        } finally {
            commonStore.handleCommonStore('isLoading', false)
        }
    }

    updateUser = async (user) => {
        try {
            // update user
        } catch (e) {
            console.log('UpdateUserError ------> ', e.message);
        }
    }

    deleteUser = async (user) => {
        try {
            // update user
        } catch (e) {
            console.log('UpdateUserError ------> ', e.message);
        }
    }

    handleChangeUserStore = (key, value) => {
        if (!key && !value) return;
        this[key] = value;
    }
}

export const userStore = new UserStore();

export const UserStoreContext = createContext(userStore);

export const useUserStore = () => useContext(UserStoreContext);