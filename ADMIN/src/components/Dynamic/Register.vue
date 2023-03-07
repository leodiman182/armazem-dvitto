<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div class="mt-0">
        <form action="#" method="POST" @submit="send">
            <div>
                <div class=" bg-white sm:p-6">
                    <div v-if="dynamic.state.components" class="grid grid-cols-12 gap-6">
                        <div v-for="(component, index) in dynamic.state.components" :key="index"
                            :class="'col-span-12 sm:col-span-' + component.input.size">
                            <label :for="component.input.id" class="block text-sm font-medium text-gray-700">
                                <span v-if="component.input.required" class="text-red-500">*</span>
                                {{ component.label }}
                            </label>

                            
                            <!-- select -->
                            <select v-if="component.input.type == 'select'" :name="component.input.name"
                                :id="component.input.id" :autocomplete="component.input.autocomplete"
                                :required="component.input.required"
                                v-model="dynamic.state.bind[route.query.page][component.input.id]"
                                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option v-for="option in component.input.options" :key="option.value"
                                    :value="option.value">
                                    {{ option.label }}
                                </option>
                            </select>

                            <!-- CRIO ESSE SPAN PARA PODER CHAMAR A FUNC  -->
                            <!-- COLOQUEI ELE V-SHOW = FALSE PARA NÃO EXIBIR NA TELA E MESMO ASSIM PASSAR NA FUNC -->
                            <span v-show="false">
                                {{ List1to1(component) }}
                            </span>


                            <!-- 1to1 -->
                            <select v-if="component.input.type == '1to1'" :name="component.input.name"
                                :id="component.input.id" :autocomplete="component.input.autocomplete"
                                :required="component.input.required"
                                v-model="dynamic.state.bind[route.query.page][component.input.id]"
                                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option v-for="(option, index) in data" :key="index" :value="option">
                                    {{ option.name }}
                                </option>
                            </select>

                            

                            <!-- radio -->
                            <div v-else-if="component.input.type == 'radio'">
                                <div class="flex items-center" v-for="option in component.input.options"
                                    :key="option.value">
                                    <input :id="option.value" :name="component.input.name"
                                        v-model="dynamic.state.bind[route.query.page][component.input.id]"
                                        v-bind:value="option.value" :required="component.input.required" type="radio"
                                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                    <label :for="option.value" class="ml-3 block text-sm font-medium text-gray-700">
                                        {{ option.label }}
                                    </label>
                                </div>
                            </div>

                            <!-- check -->
                            <div v-else-if="component.input.type == 'check'" class="flex items-start"
                                v-for="option in component.input.options" :key="option.value">
                                <div class="flex items-center h-5">
                                    <input :id="option.value" :name="component.input.name"
                                        v-model="dynamic.state.bind[route.query.page][component.input.id + '|' + option.label]"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label :for="option.value" class="font-medium text-gray-700">{{
                                            option.label
                                    }}</label>
                                </div>
                            </div>

                            <!-- textarea -->
                            <div v-else-if="component.input.type == 'textarea'">
                                <div class="mt-1">
                                    <textarea :name="component.input.name" :id="component.input.id"
                                        :placeholder="component.input.placeholder" :required="component.input.required"
                                        v-model="dynamic.state.bind[route.query.page][component.input.id]" rows="3"
                                        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" />
                                </div>
                            </div>

                            <!-- number -->
                            <input v-else-if="component.input.type == 'number'" :type="component.input.type"
                                :name="component.input.name" :id="component.input.id"
                                :autocomplete="component.input.autocomplete" :placeholder="component.input.placeholder"
                                :required="component.input.required"
                                v-model="dynamic.state.bind[route.query.page][component.input.id]"
                                :step="component.input.step == 0 ? 0 : '0.' + '0'.repeat(component.input.step - 1) + '1'"
                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />

                            <!-- file -->
                            <div v-else-if="component.input.type == 'file'">

                                <div v-if="dynamic.state.bind[route.query.page][component.input.id]">
                                    <span v-show="component.input.type_file != '.xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf'">
                                        <div v-if="component.input.id !== undefined" class="m-1">
                                            <a :href="component.input.id.myURL" target="_blank"
                                                :download="component.input.id.name">
                                                <img :class="'inline-block h-16 w-16 rounded'" alt="" :src="
                                                    component.input.id !== undefined && getImage(dynamic.state.bind[route.query.page][component.input.id]) ?
                                                        dynamic.state.bind[route.query.page][component.input.id].myURL :
                                                        'https://www2.camara.leg.br/atividade-legislativa/comissoes/comissoes-permanentes/cindra/imagens/sem.jpg.gif/image'
                                                " />
                                            </a>
                                        </div>
                                    </span>
                                    <span
                                        v-show="component.input.type_file == '.xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf'">
                                        <div v-if="component.input.id !== undefined">
                                            <a :href="dynamic.state.bind[route.query.page][component.input.id].myURL" target="_blank"
                                                class="inline-flex items-center px-2 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                                                Download 
                                                <DownloadIcon class="h-4 w-4" aria-hidden="true" />
                                            </a>
                                        </div>
                                        <div v-else class="text-red-500 text-lg">
                                            <b>-</b>
                                        </div>
                                    </span>
                                    <button @click="oldImg = dynamic.state.bind[route.query.page][component.input.id]; dynamic.state.bind[route.query.page][component.input.id] = undefined;" type="button" class=" inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Trocar
                                    </button>
                                </div>

                                <div v-else>
                                    <input :type="component.input.type"
                                        :name="component.input.name" :id="component.input.id"
                                        :autocomplete="component.input.autocomplete" :placeholder="component.input.placeholder"
                                        :required="component.input.required"
                                        @change="phandleUpload($event.target.files, component.input.id)"
                                        :accept="component.input.type_file"
                                        class="mt-1 focus:ring-indigo-500 border focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
    
    
                                    <button v-if="oldImg != null" @click="dynamic.state.bind[route.query.page][component.input.id] = oldImg; oldImg = null;" type="button" class=" inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Desfazer
                                    </button>
                                </div>
                                
                            </div>
                            
                            <!-- others -->
                            <input v-else :type="component.input.type" :name="component.input.name"
                                :id="component.input.id" :autocomplete="component.input.autocomplete"
                                :placeholder="component.input.placeholder" :required="component.input.required"
                                v-model="dynamic.state.bind[route.query.page][component.input.id]"
                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        
                        
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="text-right mt-4">
                <button v-show="!loadingSender" @click="clear" type="reset" :disabled="loadingSender"
                    class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Cancelar
                </button>
                <button v-show="!loadingSender" type="submit" :disabled="loadingSender"
                    class=" ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Salvar
                </button>
                <p v-show="loadingSender" class="text-2xl text-blue-900">
                    <font-awesome-icon icon="spinner" class="h-10 w-10 animate-spin" />
                    Salvando...
                </p>
            </div>
        </form>
    </div>
</template>

<script setup>
import { PencilAltIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon,DownloadIcon } from "@heroicons/vue/solid";
import index from "../../store";
import dynamic from "../../store/dynamic";
import menu from "../../store/menu";
import db from "../../store/db";
import swal from "../../store/swal";
import { useRoute } from "vue-router";
import { getStorage, list, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
    getDocs,
    onSnapshot,
    addDoc,
    collection,
    setDoc,
    getDoc,
    doc,
    deleteDoc,
    query,
    where,
    collectionGroup
} from "firebase/firestore";
import { ref as refVue, computed } from 'vue'
import router from "../../router";

const oldImg = refVue(null)
const route = useRoute();
const loadingSender = refVue(false)

if (dynamic.state.bind[route.query.page] === undefined) {
    router.push({ path: "/dynamic/list", query: { page: route.query.page, name: route.query.name } });
}

menu.dispatch('Get')
const navigation = computed(() =>
    {
        let permission = menu.state.navigation.filter(response => response.uid == route.query.page)
        
        if(permission.length > 0) return JSON.parse(permission[0].permission)

        for (let index = 0; index < menu.state.navigation.length; index++) {
            const element = menu.state.navigation[index];
            permission = element.children.filter(response => response.uid == route.query.page)
            if(permission.length > 0) return JSON.parse(permission[0].permission)
        }

        return permission
    }
);

const data = refVue([])
const COUNT = refVue(0)

async function List1to1(component) {
    if (!component.hasOwnProperty("SelectPagePKey")) return
    if (!component.hasOwnProperty("SelectFieldPKey")) return

    setTimeout(async () => {
        
        if (COUNT.value > 0) return
        const uid = component.SelectPagePKey.uid.replaceAll(' ', '').replace("+", " ").trim()
        const name = component.SelectFieldPKey.name.toLowerCase()
    
        data.value = []
    
        data.value.push({ name: 'aaa' })
    
        const docRef = doc(db.state.Firestore, "db", uid);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
            let callback = []
            if (COUNT.value > 0) return
            COUNT.value++
            for (let index = 0; index < docSnap.data().data.length; index++) {
                const element = docSnap.data().data[index];
                callback.push({ name: element[name], uid: uid, fieldName: name})
            }
            data.value = callback
            // console.log("Document data:", docSnap.data().data);
    
        } else {
            console.log("No such document!");
        }
    }, 100);
   
    return data.value
}

async function send(ev) {
    ev.preventDefault();
    loadingSender.value = true
    let values = {};
    for (let index = 0; index < dynamic.state.components.length; index++) {
        const element = dynamic.state.components[index];
        if (element.input.type == "check") {
            values[element.input.id] = [];
            for (let index = 0; index < element.input.options.length; index++) {
                const element2 = element.input.options[index];
                values[element.input.id].push({
                    name: element2.label,
                    value: dynamic.state.bind[route.query.page][element.input.id + "|" + element2.label],
                });
            }
        } else if (element.input.type == "file" && dynamic.state.bind[route.query.page][element.input.id] !== undefined) {
            // console.log(dynamic.state.bind[route.query.page][element.input.id]);
            if (!dynamic.state.bind[route.query.page][element.input.id].hasOwnProperty('fullPath')) {
                
                const storage = getStorage();
                //SET EXTENCION AND NAME FILE
                let Extencion = dynamic.state.bind[route.query.page][element.input.id].name.split(".")
                Extencion = Extencion[Extencion.length - 1]
                const NameFile = btoa(dynamic.state.bind[route.query.page][element.input.id].name + new Date())
                const storageRef = ref(storage, Extencion + '/' + NameFile + '.' + Extencion);
                //UPLOAD
                await uploadBytes(storageRef, dynamic.state.bind[route.query.page][element.input.id]).then((snapshot) => {
                    values[element.input.id] = snapshot.metadata
                });
            } else {
                values[element.input.id] = dynamic.state.bind[route.query.page][element.input.id];
            }
        } else {
            // console.log(element.input.id,dynamic.state.bind[route.query.page][element.input.id]);
            values[element.input.id] = dynamic.state.bind[route.query.page][element.input.id];
        }


    }
    if (dynamic.state.RemoveIndex[route.query.page] != null) {
        dynamic.state.table[route.query.page].splice(dynamic.state.RemoveIndex[route.query.page], 1)
    } else {
        values.uid = btoa(new Date() + index.state.user.data.uid)
    }
    dynamic.state.table[route.query.page].push(values);

    dynamic.dispatch('SaveDB', { page: route.query.page, data: dynamic.state.table[route.query.page] }).then(() => {
        clear()
        swal.commit('notification', { icon: 'success', title: 'Operação realizada com sucesso.' })
        router.push({ path: "/dynamic/list", query: { page: route.query.page, name: route.query.name } });
    })

    // console.log(dynamic.state.table[route.query.page]);
}

function phandleUpload(files, index) {
    dynamic.state.bind[route.query.page][index] = files[0]
}

function clear() {
    if(navigation.value.includes(2) && !navigation.value.includes(1)) router.push({ path: "/dynamic/list", query: { page: route.query.page, name: route.query.name } });
    loadingSender.value = false
    dynamic.state.RemoveIndex[route.query.page] = null
    Object.getOwnPropertyNames(dynamic.state.bind[route.query.page]).forEach(
        (element) => {
            dynamic.state.bind[route.query.page][element] = "";
        }
    );

    oldImg.value = null

    router.push({ path: "/dynamic/list", query: { page: route.query.page, name: route.query.name } });
}



function getImage(params) {
    if (params === undefined) return false
    // if (params.hasOwnProperty('fullPath')) return ''
    const storage = getStorage();
    return getDownloadURL(ref(storage, params.fullPath))
        .then((url) => {
            params.myURL = url
            return true
        })
        .catch(() => {
            return false
        });
}

</script>

