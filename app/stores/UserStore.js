import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';
import { collection, setDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { get, set, ref } from "firebase/database";
import { FIREBASE_DB } from "../config/firebase.config";
import {commonStore} from "./CommonStore";

class UserStore {
    currentUserId = {};

    user = {};

    users = [];

    constructor() {
        makeAutoObservable(this)
    }

    getUsers = async () => {
        try {
            commonStore.handleCommonStore('isLoading', true)
            const querySnapshot = await getDocs(collection(FIREBASE_DB, "users" ));
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                this.handleChangeUserStore('users', doc.data())
            });
        } catch (error) {
            console.log('error', error)
        } finally {
            commonStore.handleCommonStore('isLoading', false)
        }
    }

    getUser = async (userId) => {
        try {
            commonStore.handleCommonStore('isLoading', true)
            const userRef = doc(FIREBASE_DB, 'users', userId);
            const userSnapshot = await getDoc(userRef)
            if (userSnapshot.exists()) {
                console.log("Document data:", userSnapshot.data());
                this.handleChangeUserStore('user', userSnapshot.data())
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        } catch (error) {
            console.log('error', error)
        } finally {
            commonStore.handleCommonStore('isLoading', false)
        }
    }

    setUser = async (userId, user) => {
        try {
            commonStore.handleCommonStore('isLoading', true)
            const userRef = doc(FIREBASE_DB, 'users', userId);

            await setDoc(userRef,  {
                email: user.email,
                uid: user.uid,
                displayName: user.displayName
            }, { merge: true })
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