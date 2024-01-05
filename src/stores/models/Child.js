import uuid from 'react-native-uuid';
export default class Child {
    uid = null;
    name= null;
    userId = null;
    avatarURL = null;

    constructor(init) {
        this.uid = init?.uid || uuid.v4();
        this.name = init?.name;
        this.userId = init?.userId;
        this.avatarURL = init?.avatarURL
    }
}