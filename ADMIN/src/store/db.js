//https://github.com/firebase/snippets-web/tree/1c4c6834f310bf53a98b3fa3c2e2191396cacd69/snippets/firestore-next/test-firestore
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

            //GET SIMPLES
            // onSnapshot(doc(state.Firestore, "5514000000000", '5514981729322@s.whatsapp.net'), (doc) => {
            //     state.db.push(doc.data())
            //     console.log(doc.data());
            // });

            //GET QUERY | WHERE
            // const citiesRef = collection(state.Firestore, "cities");
            // const q = await query(citiesRef, where('country', 'in', ['USA', 'Japan']));
            // onSnapshot(q, (querySnapshot) => {
            //     const cities = [];
            //     querySnapshot.forEach((doc) => {
            //         cities.push(doc.data());
            //     });
            //     console.log("Current cities in CA: ", cities.join(", "));
            // });

            //SET DOC IN COLLECTION
            // const citiesRef = collection(state.Firestore, "cities");
            // setDoc(doc(citiesRef, "SF"), {
            //     name: "San Francisco", state: "CA", country: "USA",
            //     capital: false, population: 860000,
            //     regions: ["west_coast", "norcal"]
            // });
            // setDoc(doc(citiesRef, "LA"), {
            //     name: "Los Angeles", state: "CA", country: "USA",
            //     capital: false, population: 3900000,
            //     regions: ["west_coast", "socal"]
            // });
            // setDoc(doc(citiesRef, "DC"), {
            //     name: "Washington, D.C.", state: null, country: "USA",
            //     capital: true, population: 680000,
            //     regions: ["east_coast"]
            // });
            // setDoc(doc(citiesRef, "TOK"), {
            //     name: "Tokyo", state: null, country: "Japan",
            //     capital: true, population: 9000000,
            //     regions: ["kanto", "honshu"]
            // });
            // setDoc(doc(citiesRef, "BJ"), {
            //     name: "Beijing", state: null, country: "China",
            //     capital: true, population: 21500000,
            //     regions: ["jingjinji", "hebei"]
            // });

            //DELETE
            // deleteDoc(doc(state.Firestore, "cities", "DC"));

            //ADD IN COLLECTION
            // try {
            //     const docRef = addDoc(collection(state.Firestore, "users"), {
            //         first: "Ada",
            //         last: "Lovelace",
            //         born: 1815
            //     });
            //     console.log("Document written with ID: ", docRef.id);
            // } catch (e) {
            //     console.error("Error adding document: ", e);
            // }

            //SET DOC
            // try {
            //     const docRef = setDoc(doc(state.Firestore, "users", "logs"), {
            //         first: "Ada",
            //         last: "Lovelace",
            //         born: 1815
            //     });
            //     console.log("Document written with ID: ", docRef.id);
            // } catch (e) {
            //     console.error("Error adding document: ", e);
            // }

            //GET DOCS BY COLLECTION
            // const querySnapshot = await getDocs(collection(state.Firestore, "5514000000000"));
            // querySnapshot.forEach((doc, index) => {
            //     state.db.push(doc.data())
            // });
        },
    },
    modules: {},
})

export default store