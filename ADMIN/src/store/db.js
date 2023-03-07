import { createStore } from 'vuex'
import {
    getDocs,
    onSnapshot,
    addDoc,
    collection,
    setDoc,
    doc,
    deleteDoc,
    query,
    where,
    collectionGroup
} from "firebase/firestore";
import { async } from '@firebase/util';

// Create a new store instance.
const store = createStore({
    state: {
        Firestore: null, //preencho ela no pligins/firebase 
        db: []
    },
    getters: {},
    actions: {
        async GetByPage({ commit }, uid) {
            uid = uid.replace("+", " ")
            return await onSnapshot(doc(this.state.Firestore, "db", uid), (doc) => {
                return doc.data().data
            });
        },
        async GetAll({ commit }, to) {
            if (this.state.drawPage.length > 0) {
                commit('loading', to)
                return
            }

            const MyCollection = collection(db.state.Firestore, 'dynamic')
            const querySnapshot = await getDocs(MyCollection);
            await querySnapshot.forEach((doc) => {
                this.state.drawPage.push({
                    page: doc.id,
                    comp: doc.data().page
                })
            })
            commit('loading', to)
        }

    },
    mutations: {

        get: async (state) => {
        },
    },
    modules: {},
})

export default store