import uuid from 'react-native-uuid';
export default class Strike {
    uid = null;
    index = null;
    strike = false;
    icon = '';
    createdDate = null;

    constructor(init) {
        this.uid = init?.uid || uuid.v4();
        this.index = init?.index;
        this.strike = init?.strike || false;
        this.icon = init?.icon || 'circle';
        this.createdDate = new Date();
    }
}