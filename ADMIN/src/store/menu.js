import { createStore } from 'vuex'
import { ref } from 'vue'
import db from './db'
import {
    getDocs,
    onSnapshot,
    addDoc,
    collection,
    setDoc,
    doc,
} from "firebase/firestore";

// Create a new store instance.
const store = createStore({
    state: {
        sidebarOpen: false,
        userNavigation: [
            // { name: 'Seu Perfil', to: '/profile' },
            // { name: 'Configuração', to: '/config' },
        ],
        navigation: ref([]),
        navigationInit: ref([
            // { name: 'Dashboard', icon: 'HomeIcon', to: '/dashboard' },
            {
                name: 'Configurações',
                icon: 'CogIcon',
                children: [
                    { name: 'Páginas', to: '/pages' },
                    { name: 'Layout', to: '/layout' },
                    { name: 'Usuários', to: '/users' },
                ],
            }
        ])
    },
    getters: {},
    actions: {
        async SaveList({ commit }, menu) {
            const MyCollection = collection(db.state.Firestore, 'menu')
            const MyDocs = await doc(MyCollection, 'list')
            let Json = JSON.parse(JSON.stringify(menu))
            await setDoc(MyDocs, { data: Json });

        },
        async GetList({ commit }) {
            let myreturn = null
            await onSnapshot(doc(db.state.Firestore, "menu", 'list'), (doc) => {
                myreturn = doc.data().data

            });
            return myreturn

        },
        async Save({ commit }, menu) {
            const MyCollection = collection(db.state.Firestore, 'menu')
            const MyDocs = await doc(MyCollection, 'navigation')
            let Json = JSON.parse(JSON.stringify(menu))
            await setDoc(MyDocs, { data: Json });

        },
        async SaveRefs({ commit }, refs) {
            const MyCollection = collection(db.state.Firestore, 'refs')
            const MyDocs = await doc(MyCollection, 'uidsPerPage')
            let Json = JSON.parse(JSON.stringify(refs))
            await setDoc(MyDocs, { data: Json });

        },
        async Set({ commit }) {
            onSnapshot(doc(db.state.Firestore, "menu", 'navigation'), async (doc) => {
                await commit('setMenu', this.state.navigationInit)
                await commit('pushMenu', doc.data().data)

            });
        },
        async Get({ commit }) {
            return onSnapshot(doc(db.state.Firestore, "menu", 'navigation'), async (doc) => {
                return doc.data().data

            });
        },
    },
    mutations: {
        setMenu: async (state, menu) => {
            state.navigation = []
            state.navigation.push(...menu)
        },
        pushMenu: async (state, menu) => {
            state.navigation.push(...menu)
        },
    },
    modules: {},
})

export default store