export default class User {
    uid = null;
    displayName= null;
    email = null;
    children = [];

    constructor(init) {
        this.uid = init.uid;
        this.displayName = init.displayName;
        this.email = init.email;
    }

    setChild = child => {
        const foundChild = this.children.find(c => c.uid === child.uid);
        if (!foundChild) {
            this.children.push(child)
        }
    }
}