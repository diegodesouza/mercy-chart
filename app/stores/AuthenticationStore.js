import {createContext, useContext} from 'react';
import {makeAutoObservable, runInAction} from 'mobx';
import { FIREBASE_AUTH } from "../config/firebase.config";
import {
    deleteUser,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from 'firebase/auth';
import User from "./models/User";
import { userStore } from "./UserStore";
import { commonStore } from "./CommonStore";

class AuthenticationStore {
    loggedInUser = {}
    name = '';
    email = '';
    password = '';
    confirmPassword= '';
    isSignedIn = false;
    isSigningUp = false;
    signInFailed = false;
    signUpFailed = false;
    errorMessage = '';

    constructor() {
        makeAutoObservable(this)
    }

    ERRORS = {
        'auth/invalid-email': 'Email is invalid.',
        'auth/email-already-exists': 'Email already exists.',
        'auth/internal-error': 'An error occurred please try again later.',
        'auth/invalid-credential': 'Invalid Credentials.',
        'auth/invalid-password': 'Invalid Password.',
        'auth/weak-password': 'Password should be at least 6 characters.',
        'auth/missing-password': 'Missing Password.',
        'auth/missing-email': 'Missing Email.',
        'auth/user-not-found': 'User Not Found.',
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/requires-recent-login': 'You need to Reauthenticate in order to do this action'
    }

    signIn = async (email, password) => {
        this.handleChangeAuthenticationStore('password', password)
        commonStore.handleCommonStore('isLoading', true)
        signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then( async (response) => {
                runInAction(() => {
                    this.loggedInUser = {...response.user, password};
                    this.isSignedIn = true;
                    this.signInFailed = false;
                })
                return response;
            })
            .catch((error) => {
                console.log('error', error)
                runInAction(() => {
                    this.signInFailed = true;
                    this.isSignedIn = false;
                    this.errorMessage = this.ERRORS[error.code];
                })
            })
            .finally(() =>{
                console.log('signed in')
                commonStore.handleCommonStore('isLoading', false)
            })
    }

    signUp = (name, email, password) => {
        const {setUser} = userStore;
        commonStore.handleCommonStore('isLoading', true)
        createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then(({user}) => {
                if (user) {
                    updateProfile(user, { displayName: name, })
                        .then(()=> {
                            setUser(user.uid, new User(user))
                        })
                        .catch((error) => console.log(error))
                    runInAction(() => {
                        this.signUpFailed = false;
                        this.isSignedIn = true;
                    })
                }
                return user;
            }).catch((error) => {
            console.log(error)
            runInAction(() => {
                this.signUpFailed = true;
                this.isSignedIn = false;
                this.isSigningUp = false;
                this.errorMessage = this.ERRORS[error.code];
            })
        }).finally(() => {
            this.handleChangeAuthenticationStore('isSigningUp', false)
            commonStore.handleCommonStore('isLoading', false)
            console.log('finally signed up')
        })
    }

    signOut = async () => {
        try {
            await signOut(FIREBASE_AUTH)
            this.handleChangeAuthenticationStore('isSignedIn', false)
        } catch (error) {
            console.log('error', error)
        } finally {
            console.log('signed out')
        }
    }

    deleteUser = async () => {
        try {
            commonStore.handleCommonStore('isLoading', true)
            await deleteUser(this.loggedInUser);
        } catch (error) {
            if (error.code === 'auth/requires-recent-login') {
                const credential = EmailAuthProvider.credential(this.loggedInUser.email, this.password);
                await reauthenticateWithCredential(this.loggedInUser, credential)
            }
            console.log('error', error)
        } finally {
            console.log('signed out')
            commonStore.handleCommonStore('isLoading', false)
        }
    }

    get emailIsAlreadyInUse() {
        return this.errorMessage === 'An account with this email already exists.'
    }

    passwordMatches = () => {
        return this.password === this.confirmPassword;
    }

    handleChangeAuthenticationStore = (key, value) => {
        if (!key && !value) return;
        this[key] = value;
    }
}

// Instantiate the counter store.
export const authenticationStore = new AuthenticationStore();
// Create a React Context with the counter store instance.
export const AuthenticationStoreContext = createContext(authenticationStore);
export const useAuthenticationStore = () => useContext(AuthenticationStoreContext)