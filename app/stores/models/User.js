export default class User {
    uid = null;
    displayName= null;
    email = null;
    selectedChildId = null

    constructor(init) {
        this.uid = init.uid;
        this.displayName = init?.displayName;
        this.email = init?.email;
        this.selectedChildId = init?.selectedChildId || ''
    }
}