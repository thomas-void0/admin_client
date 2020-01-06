import store from 'store';

const USER_KEY = "user_key";

export default {
    saveLocalData:data=>{
        store.set(USER_KEY,data);
    },
    getLocalData:()=>{
        return store.get(USER_KEY);
    },
    removeLocalData:()=>{
        store.remove(USER_KEY);
    }
}


