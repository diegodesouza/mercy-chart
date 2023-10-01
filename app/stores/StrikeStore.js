import React from 'react';
import {makeAutoObservable} from 'mobx';
import {ref, set, push, onValue} from "firebase/database";
import {FIREBASE_DB} from "../config/firebase.config";
import {commonStore} from "./CommonStore";
import Strikes from "./models/Strikes";

class StrikeStore {
    strikes = []
    strikeIndex = -1;
    currentStrikeId = '';

    constructor() {
        makeAutoObservable(this)
        this.strikes = new Strikes().generateStrikes();
    }

    // getStrikes = async (childId) => {
    //     console.log('child', childId)
    //     try {
    //         commonStore.handleCommonStore('isLoading', true)
    //         await get(ref(FIREBASE_DB, `strikes/${childId}`))
    //             .then(snap => {
    //                 console.log('snap', snap)
    //                 if (snap.exists()) {
    //                     this.handleChangeStrikeStore('strikes', ...Object.keys(snap.val()).map(strike => strike))
    //                     console.log('strikes', this.strikes)
    //                 } else {
    //                     runInAction(() => {
    //                         const strikes = new Strikes()
    //                         this.strikes = strikes.generateStrikes(childId)
    //                         console.log('strikes 2', this.strikes)
    //                     })
    //                 }
    //             })
    //     } catch (e) {
    //         console.log(e)
    //     } finally {
    //         commonStore.handleCommonStore('isLoading', false)
    //     }
    // }

    addStrike = async (childId) => {
        try {
            commonStore.handleCommonStore('isLoading', true)
            const strikes = new Strikes();
            await set(ref(FIREBASE_DB,`strikes/${childId}/${new Date()}`), strikes.generateStrikes(childId))
                .then(snap => {
                    console.log('span>>>', snap)
                })
        } catch (error) {
            console.log('error', error)
        } finally {
            commonStore.handleCommonStore('isLoading', false)
        }
    }

    updateStrike = async (childId) => {
        try {
            commonStore.handleCommonStore('isLoading', true)
            this.handleChangeStrikeStore('strikes',
                this.strikes?.map((s, i) => {
                    if (this.strikeIndex === i && !this.strikeIndex > 2) {
                        s.strike = true
                    }
                    return s;
                })
            )
            const strikesRef = ref(FIREBASE_DB, `strikes/${childId}`)
            await set(strikesRef, this.strikes)
            onValue(strikesRef, (snapshot) => {
                console.log('snapshot', snapshot)
            })
            // const refKey = push().key
            // if (refKey && refKey === this.currentStrikeId) {
            //     this.handleChangeStrikeStore('currentStrikeId', refKey)
            // }
        } catch (error) {
            console.log('error', error)
        } finally {
            commonStore.handleCommonStore('isLoading', false)
        }
    }

    // updateStrike = async (childId) => {
    //     try {
    //         commonStore.handleCommonStore('isLoading', true)
    //         this.handleChangeStrikeStore('strikes',
    //             this.strikes?.map((s, i) => {
    //                 if (this.strikeIndex === i && !this.strikeIndex > 2) {
    //                     s.strike = true
    //                 }
    //                 return s;
    //             })
    //         )
    //         await set(ref(FIREBASE_DB, `strikes/${childId}`), this.strikes)
    //     } catch (error) {
    //         console.log('error', error)
    //     } finally {
    //         commonStore.handleCommonStore('isLoading', false)
    //     }
    // }

    deleteStrike = async (childId) => {
        try {
            commonStore.handleCommonStore('isLoading', true)
            this.handleChangeStrikeStore('strikes',
                this.strikes?.map((s, i) => {
                    if (this.strikeIndex === i) {
                        s.strike = false
                    }
                    return s;
                })
            )
            await set(ref(FIREBASE_DB, `strikes/${childId}`), this.strikes)
        } catch (error) {
            console.log('error', error)
        } finally {
            commonStore.handleCommonStore('isLoading', false)
        }
    }

    handleChangeStrikeStore = (key, value) => {
        if (!key && !value) return;
        this[key] = value;
    }
}

// Instantiate the counter store.
const strikeStore = new StrikeStore();
// Create a React Context with the counter store instance.
export const StrikeStoreContext = React.createContext(strikeStore);
export const useStrikeStore = () => React.useContext(StrikeStoreContext)