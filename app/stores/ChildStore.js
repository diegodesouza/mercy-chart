import React from 'react';
import {makeAutoObservable, runInAction, toJS} from 'mobx';
import {get, ref, set} from "firebase/database";
import { collection, setDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import {FIREBASE_DB} from "../config/firebase.config";
import {storageStore} from './StorageStore'
import {commonStore} from "./CommonStore";
import Child from "./models/Child";

class ChildStore {
    children = []

    child = {}

    constructor() {
        makeAutoObservable(this)
    }

    getChildren = async (userId) => {
        try {
            commonStore.handleCommonStore('isLoading', true)
            const q = query(collection(FIREBASE_DB, "children"), where("userId", "==", userId));
            const childrenSnapshot = await getDocs(q);
            childrenSnapshot.forEach((doc) => {
                const found = this.children.find((child) => child.uid === doc.id);
                if (!found) {
                    runInAction(() => {
                        this.children.push(doc.data())
                    })
                }
            });
        } catch (error) {
            console.log('error', error)
        } finally {
            commonStore.handleCommonStore('isLoading', false)
        }
    }

    getChild = async (childId) => {
        try {
            commonStore.handleCommonStore('isLoading', true)
            // this.handleChangeChildStore('child' , await get(ref(FIREBASE_DB, `children/${childId}`)))
            const childrenRef = doc(FIREBASE_DB, 'children', childId);
            const childrenSnapshot = await getDoc(childrenRef)
            if (childrenSnapshot.exists()) {
                console.log("Document data:", childrenSnapshot.data());
                this.handleChangeChildStore('user', childrenSnapshot.data())
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

    setChild = async (userId, child) => {
        try {
            commonStore.handleCommonStore('isLoading', true)
            await storageStore.uploadImageAsync(child.uid, storageStore.imageURL)
                .then(async (avatarURL) => {
                    if (avatarURL) {
                        const _child = new Child({
                            uid: child.uid,
                            name: child.name,
                            userId: userId,
                            avatarURL
                        })
                        const childRef = doc(FIREBASE_DB, 'children', child.uid);
                        await setDoc(childRef, Object.assign({}, _child))
                        this.handleChangeChildStore('currentChildId', childRef.id)
                        // await set(ref(FIREBASE_DB, `children/${child.uid}/`),
                        //     { ..._child })
                        //     .then(() => {
                        //         this.handleChangeChildStore('child', _child)
                        //     })
                    }
                })
        } catch (error) {
            console.log('error', error)
        } finally {
            commonStore.handleCommonStore('isLoading', false)
        }
    }

    deleteChild = async (child) => {
        try {
            // update child
        } catch (e) {
            console.log('UpdateUserError ------> ', e.message);
        }
    }

    handleChangeChildStore = (key, value) => {
        if (!key && !value) return;
        this[key] = value;
    }
}

// Instantiate the counter store.
const childStore = new ChildStore();
// Create a React Context with the counter store instance.
export const ChildStoreContext = React.createContext(childStore);
export const useChildStore = () => React.useContext(ChildStoreContext)