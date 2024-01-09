import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';
import auth from '@react-native-firebase/auth';
import User from './models/User';
import {userStore} from './UserStore';
import {commonStore} from './CommonStore';

class AuthenticationStore {
    user = {};
    name = '';
    email = '';
    password = '';
    confirmPassword = '';
    isSignedIn = false;
    isSigningUp = false;
    signInFailed = false;
    signUpFailed = false;
    errorMessage = '';

    constructor() {
        makeAutoObservable(this);
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
        'auth/network-request-failed': 'No internet connection detected'
    };

    signIn = async (email, password) => {
        commonStore.handleCommonStore('isLoading', true);
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                console.log('sign in response: ', response);
                this.handleChangeAuthenticationStore('user', response.user);
                this.handleChangeAuthenticationStore('isSignedIn', true);
                this.handleChangeAuthenticationStore('signInFailed', false);
                return response;
            })
            .catch(error => {
                console.log('login error', error);
                this.handleChangeAuthenticationStore('signInFailed', true);
                this.handleChangeAuthenticationStore('isSignedIn', false);
                this.handleChangeAuthenticationStore(
                    'errorMessage',
                    this.ERRORS[error.code],
                );
            })
            .finally(() => {
                console.log('user signed in: ', this.user);
                commonStore.handleCommonStore('isLoading', false);
            });
    };

    signUp = (name, email, password) => {
        const {setUser} = userStore;
        commonStore.handleCommonStore('isLoading', true);
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(({user}) => {
                if (user) {
                    auth()
                        .currentUser.updateProfile(user, {displayName: name})
                        .then(() => {
                            setUser(user.uid, new User(user)).catch(error =>
                                console.log('setUser error', error),
                            );
                        })
                        .catch(error => console.log('updateProfile error', error));
                    this.handleChangeAuthenticationStore('signUpFailed', false);
                    this.handleChangeAuthenticationStore('isSignedIn', true);
                }
                return user;
            })
            .catch(error => {
                console.log('signup error', error);
                this.handleChangeAuthenticationStore('signUpFailed', true);
                this.handleChangeAuthenticationStore('isSignedIn', false);
                this.handleChangeAuthenticationStore('isSigningUp', false);
                this.handleChangeAuthenticationStore(
                    'errorMessage',
                    this.ERRORS[error.code],
                );
            })
            .finally(() => {
                this.handleChangeAuthenticationStore('isSigningUp', false);
                commonStore.handleCommonStore('isLoading', false);
                console.log('user signed up: ', this.user);
            });
    };

    signOut = async () => {
        try {
            await auth().signOut();
            this.handleChangeAuthenticationStore('isSignedIn', false);
        } catch (error) {
            this.handleChangeAuthenticationStore('isSignedIn', true);
            console.log('signout error', error);
        } finally {
            console.log('signed out');
        }
    };

    get emailIsAlreadyInUse() {
        return this.errorMessage === 'An account with this email already exists.';
    }

    passwordMatches = () => {
        return this.password === this.confirmPassword;
    };

    handleChangeAuthenticationStore = (key, value) => {
        if (!key && !value) {
            return;
        }
        this[key] = value;
    };
}

// Instantiate the counter store.
export const authenticationStore = new AuthenticationStore();
// Create a React Context with the counter store instance.
export const AuthenticationStoreContext = createContext(authenticationStore);
export const useAuthenticationStore = () =>
    useContext(AuthenticationStoreContext);
