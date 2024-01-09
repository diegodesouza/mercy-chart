import React from 'react';
import {makeAutoObservable, runInAction} from 'mobx';
import database from '@react-native-firebase/database';
import {commonStore} from './CommonStore';
import Strike from './models/Strike';

class StrikeStore {
    strikes = [];
    strikeIndex = -1;
    constructor() {
        makeAutoObservable(this);
    }

    getStrikes = async childId => {
        console.log('childId is: ', childId);
        try {
            commonStore.handleCommonStore('isLoading', true);
            await database()
                .ref(`strikes/${childId}`)
                .once('value')
                .then(snap => {
                    console.log('snap for strikes ', snap);
                    if (snap.val()) {
                        this.handleChangeStrikeStore('strikes', snap.val());
                    } else {
                        for (let i = 0; i < 3; i++) {
                            runInAction(() => {
                                this.strikes.push(new Strike({index: i}));
                            });
                        }
                    }
                });
        } catch (e) {
            console.log('getStriker error', e);
        } finally {
            commonStore.handleCommonStore('isLoading', false);
        }
    };

    setStrike = async childId => {
        try {
            commonStore.handleCommonStore('isLoading', true);
            this.handleChangeStrikeStore(
                'strikes',
                this.strikes.map((s, i) => {
                    if (this.strikeIndex === i) {
                        s.strike = true;
                    }
                    return s;
                }),
            );
            await database().ref(`strikes/${childId}`).set(this.strikes);
        } catch (error) {
            console.log('setStrike error', error);
        } finally {
            commonStore.handleCommonStore('isLoading', false);
        }
    };

    deleteStrike = async childId => {
        try {
            commonStore.handleCommonStore('isLoading', true);
            this.handleChangeStrikeStore(
                'strikes',
                this.strikes.map((s, i) => {
                    if (this.strikeIndex === i) {
                        s.strike = false;
                    }
                    return s;
                }),
            );
            await database().ref(`strikes/${childId}`).set(this.strikes);
        } catch (error) {
            console.log('deleteStrike error', error);
        } finally {
            commonStore.handleCommonStore('isLoading', false);
        }
    };

    handleChangeStrikeStore = (key, value) => {
        if (!key && !value) {
            return;
        }
        this[key] = value;
    };
}

// Instantiate the counter store.
const strikeStore = new StrikeStore();
// Create a React Context with the counter store instance.
export const StrikeStoreContext = React.createContext(strikeStore);
export const useStrikeStore = () => React.useContext(StrikeStoreContext);
