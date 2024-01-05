import React from 'react';
import {makeAutoObservable} from 'mobx';

class CommonStore {
    isLoading = false;

    constructor() {
        makeAutoObservable(this)
    }

    handleCommonStore = (key, value) => {
        if (!key && !value) return;
        this[key] = value;
    }
}

// Instantiate the counter store.
export const commonStore = new CommonStore();
// Create a React Context with the counter store instance.
export const CommonStoreContext = React.createContext(commonStore);
export const useCommonStore = () => React.useContext(CommonStoreContext)