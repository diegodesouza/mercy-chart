import uuid from 'react-native-uuid';
import Strike from "./Strike";
export default class Strikes {
    childId = null;
    uid = null;
    strikes = null;
    createdAt= null;
    updatedAt= null;

    constructor(init) {
        this.childId = init?.childId;
        this.uid = init?.uid || uuid.v4();
        this.strikes = init?.strikes || [];
        this.createdAt = init?.createdAt || new Date();
        this.updatedAt = init?.updatedAt || new Date();
    }

    generateStrikes = () => {
        for (let i = 0; i < 3; i++) {
            this.strikes.push(new Strike({index: i}))
        }
        return this.strikes;
    }
}