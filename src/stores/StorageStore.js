import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {commonStore} from './CommonStore';
import {Platform} from 'react-native';

class StorageStore {
    imageURL = null;

    constructor() {
        makeAutoObservable(this);
    }

    uploadImageAsync = async (childId, uri) => {
        commonStore.handleCommonStore('isLoading', true);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        const imagePath = `/avatars/${childId}`;
        const imageRef = storage().ref(imagePath);
        const task = storage().ref(imagePath).putFile(uploadUri);
        try {
            await task;
        } catch (e) {
            console.error(e);
        } finally {
            commonStore.handleCommonStore('isLoading', false);
        }
        return await imageRef.getDownloadURL();
    };

    pickImage = async () => {
        commonStore.handleCommonStore('isLoading', true);
        try {
            const response = await launchImageLibrary({
                mediaTypes: 'photo',
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0,
            });

            if (!response.didCancel) {
                this.handleChangeStorageStore('imageURL', response?.uri);
            }
        } catch (e) {
            console.log(e);
        } finally {
            commonStore.handleCommonStore('isLoading', false);
        }
    };

    handleChangeStorageStore = (key, value) => {
        if (!key && !value) {
            return;
        }
        this[key] = value;
    };
}

// Instantiate the counter store.
export const storageStore = new StorageStore();
// Create a React Context with the counter store instance.
export const StorageStoreContext = createContext(storageStore);
export const useStorageStore = () => useContext(StorageStoreContext);
