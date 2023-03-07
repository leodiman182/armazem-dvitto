import { createStore } from 'vuex'
import { ref } from 'vue'
import {
    getDocs,
    getDoc,
    onSnapshot,
    addDoc,
    collection,
    setDoc,
    doc,
} from "firebase/firestore";
import { getStorage, ref as refStorage, getDownloadURL } from "firebase/storage";
import db from './db'
import user from './index'

// Create a new store instance.
const store = createStore({
    state: {
        bind: [],
        RemoveIndex: [],
        table: ref([]),
        components: ref([]),
        drawPage: ref([]),
        tabs: ref([]),
        openMount: ref(false),
        selectedComponent: ref([]),
        query: ref(""),
    },
    getters: {

    },
    actions: {
        GetBlankComponent({ commit }) {
            return {
                label: "",
                input: {
                    type: "text",
                    name: "",
                    id: '',
                    autocomplete: "",
                    size: 12,
                    options: [],
                },
                table: {
                    visible: true,
                },
            }
        },
        async SaveDB({ commit }, database) {
            const MyCollection = collection(db.state.Firestore, 'db')
            const MyDocs = await doc(MyCollection, database.page)
            let Json = JSON.parse(JSON.stringify(database.data))
            await setDoc(MyDocs, { data: Json });
            await this.dispatch('SaveDrawJson')
        },
        async SaveDrawJson({ commit }) {
            const docRef = doc(db.state.Firestore, "refs", "uidsPerPage");
            const docSnap = await getDoc(docRef);
            let Json = {}
            if (!docSnap.exists()) return
            const refs = docSnap.data().data

            for (let index = 0; index < refs.length; index++) {
                const element = refs[index];

                const docRef = doc(db.state.Firestore, "db", element.uid);
                const docSnap = await getDoc(docRef);
                if (!docSnap.exists()) continue;
                const document = docSnap.data().data

                Json[element.page] = {
                    uid: element.uid,
                    page: element.page,
                    field: []
                }

                for (let indexChieldren = 0; indexChieldren < document.length; indexChieldren++) {
                    const elementChieldren = document[indexChieldren];
                    const documentKeys = Object.keys(elementChieldren)

                    let FieldGroup = {}

                    for (let indexKeys = 0; indexKeys < documentKeys.length; indexKeys++) {
                        const elementKeys = documentKeys[indexKeys];
                        if (elementKeys == 'uid') continue

                        let value = elementChieldren[elementKeys]
                        if (elementChieldren[elementKeys].hasOwnProperty('fullPath')) {
                            const storage = getStorage();
                            value = await getDownloadURL(refStorage(storage, elementChieldren[elementKeys].fullPath)).then((url) => url)
                        } else if (elementChieldren[elementKeys].hasOwnProperty('name')) {
                            Json[element.page].HasLink = true
                            Json[element.page].NameLink = elementKeys
                            Json[element.page].FieldLink = elementChieldren
                        }

                        FieldGroup[elementKeys] = value
                    }

                    Json[element.page].field.push(FieldGroup)
                }
            }

            // console.log(Json)
            const documentKeys = Object.keys(Json)
            for (let index = 0; index < documentKeys.length; index++) {
                const elementKeys = documentKeys[index];
                let element = Json[elementKeys]
                if (!element.hasOwnProperty('HasLink')) continue
                console.log(element.NameLink);

                for (let index = 0; index < element.field.length; index++) {
                    const elementChieldren = element.field[index];
                    if (!elementChieldren[element.NameLink].hasOwnProperty('fieldName')) continue
                    let elementJson = Json[element.NameLink].field.find(field => field[elementChieldren[element.NameLink].fieldName] == elementChieldren[element.NameLink].name)
                    if (elementJson && !elementJson.hasOwnProperty('chieldren')) elementJson.chieldren = []

                    if (elementJson) delete elementChieldren[element.NameLink]
                    if (elementJson) elementJson.chieldren.push(elementChieldren)
                }
            }

            console.log(Json);

            const MyCollection = collection(db.state.Firestore, 'refs')
            const MyDocs = await doc(MyCollection, 'drawPages')
            // let Json = JSON.parse(JSON.stringify(database.data))
            await setDoc(MyDocs, { data: Json });


        },
        async GetDB({ commit }, to) {
            onSnapshot(doc(db.state.Firestore, "db", to.query.page), (doc) => {
                this.state.table[to.query.page] = doc.data().data;
            });
        },
        async Save({ commit }) {
            const MyCollection = collection(db.state.Firestore, 'dynamic')
            for (let index = 0; index < this.state.drawPage.length; index++) {
                const element = this.state.drawPage[index];
                const MyDocs = await doc(MyCollection, element.page)
                let Json = JSON.parse(JSON.stringify(element.comp))
                await setDoc(MyDocs, { page: Json });
            }

        },
        async GetAll({ commit }, to) {
            if (this.state.drawPage.length > 0) {
                await commit('loading', to)
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
            await commit('loading', to)
        }
    },
    mutations: {
        loading: (state, to) => {
            let callback = state.drawPage.find(element => element.page == to.query.page)

            if (callback === undefined) { // VALIDAÇÃO PARA A PAGINA QUE ACABEI DE CRIAR'
                state.drawPage.push({ page: to.query.page, comp: [] })
                callback = state.drawPage.find(element => element.page == to.query.page)
            }


            state.components = []
            state.components.push(...callback.comp)

            if (!state.table.hasOwnProperty(to.query.page)) state.table[to.query.page] = ref([])
            if (!state.bind.hasOwnProperty(to.query.page)) state.bind[to.query.page] = ref([])
            if (!state.RemoveIndex.hasOwnProperty(to.query.page)) state.RemoveIndex[to.query.page] = null
            if (!state.selectedComponent.hasOwnProperty(to.query.page)) state.selectedComponent[to.query.page] = ref()

            state.tabs[to.query.page] = []
            state.tabs[to.query.page].push(
                {
                    name: 'Cadastrar',
                    href: '/dynamic/register?page=' + to.query.page,
                    current: to.path == '/dynamic/register'
                },
                {
                    name: 'Listagem',
                    href: '/dynamic/list?page=' + to.query.page,
                    current: to.path == '/dynamic/list'
                }
            )
        },
    },
    modules: {},
})

export default store