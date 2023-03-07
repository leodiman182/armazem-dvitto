<template>
    <div>
        <div class="flex grid sm:grid-cols-3 sm:gap-4">
            <div class="m-1 relative rounded-md shadow-sm sm:col-span-2">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input type="text" name="search" id="search"
                    class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Filtro" v-model="query" />
            </div>
            <div class="m-1 sm:col-span-1">
                <div v-if="dynamic.state.table[route.query.page]">
                    <select id="fields" name="fields" autocomplete="fields-name" v-model="Field" class=" max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm
                        sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                        <option v-for="(item, index) in components" v-bind:value="item.input.id"
                            :key="index" v-show="item.table.visible && item.input.type != 'file'">{{ item.label }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
        <div class="mt-8 flex flex-col">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <!-- Desktop -->
                        <table v-if="!mobile()" class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th v-for="(component, index) in components" :key="index"
                                        v-show="component.table.visible && !component.excluded"
                                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 text-center">
                                        {{ component.label }}
                                    </th>
                                    <th
                                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 text-center">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white text-center">
                                <tr class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                                    v-for="(inf, index) in filteredcomponents" :key="index"
                                    v-show="index < (RowsPerPage * (Page + 1)) && index >= (Page * RowsPerPage)"
                                >

                                    <td v-for="(component, index) in dynamic.state.components" :key="index"
                                        v-show="component.table.visible && !component.excluded" 
                                        class="text-center"
                                    >
                                        <TamplateList :component="component" :inf="inf" :sizeImg="14" />  
                                        
                                    </td>
                                    <td v-if="navigation.length > 0" class="text-center">
                                        <button v-if="navigation.includes(2)" type="button" @click="edit(inf, index)"
                                            class="ml-5 mr-1 mt-1 mb-1 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            <PencilIcon class="h-4 w-4" aria-hidden="true" />
                                        </button>
                                        <button v-if="navigation.includes(3)" type="button" @click="del(index)"
                                            class=" mr-1 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                            <TrashIcon class="h-4 w-4" aria-hidden="true" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- Mobile -->
                        <div v-if="mobile()">
                            <div class="bg-white shadow overflow-hidden sm:rounded-md">
                                <ul role="list" class="divide-y divide-gray-200">
                                    <div
                                        v-for="(inf, index) in filteredcomponents" :key="index"
                                        v-show="index < (RowsPerPage * (Page + 1)) && index >= (Page * RowsPerPage)"
                                        class=" text-center relative bg-white py-2 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                                    >

                                        <li 
                                            v-for="(component, index) in dynamic.state.components" :key="index"
                                            v-show="component.table.visible && !component.excluded"  
                                        >
                                            <div>
                                                <TamplateList :component="component" :inf="inf" :sizeImg="64" />                                               
                                            </div>
                                        </li>  
                                        <div class="mt-2">
                                            <div class="mt-px flex divide-x divide-gray-200">
                                                <div v-if="navigation.includes(2)" class="rounded-l-lg  w-0 flex-1 flex  bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                    <button type="button" @click="edit(inf, index)"
                                                        class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-white font-medium border border-transparent rounded-br-lg"
                                                    >
                                                        <PencilIcon class="h-4 w-4 mr-2" aria-hidden="true" />
                                                        Editar
                                                    </button>
                                                </div>
                                                <div v-if="navigation.includes(3)" class="rounded-r-lg  w-0 flex-1 flex  bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                    <button type="button" @click="del(index)"
                                                        class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-white font-medium border border-transparent rounded-br-lg"
                                                    >
                                                        <TrashIcon class="h-4 w-4 mr-2" aria-hidden="true" />
                                                        Excluir
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>  
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <!-- paginação -->
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div class="flex-1 flex justify-between sm:hidden">
                <a href="#"
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous </a>
                <a href="#"
                    class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next </a>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p class="text-sm text-gray-700">
                        Página
                        {{ ' ' }}
                        <span class="font-medium">{{ Page + 1 }}</span>
                        {{ ' ' }}
                        de
                        {{ ' ' }}
                        <span class="font-medium">{{ NumPage }}</span>
                        {{ ' - ' }}

                        {{ ' ' }}
                        <span class="font-medium">{{ CountRows }}</span>
                        {{ ' ' }}
                        resultados
                    </p>
                </div>
                <div>
                    <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">

                        <a @click="pageBack()" href="#"
                            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span class="sr-only">Previous</span>
                            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
                        </a>

                        <a @click="Page = index" v-for="(item, index) in NumPage" :key="index" href="#"
                            aria-current="page"
                            :class="(index != Page ? 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50' : 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600') + 'relative inline-flex items-center px-4 py-2 border text-sm font-medium'">
                            {{ index + 1 }} </a>

                        <a href="#" @click="pageNext"
                            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span class="sr-only">Next</span>
                            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { SearchIcon, PencilIcon, TrashIcon } from "@heroicons/vue/solid";
import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon, EyeIcon, XIcon } from '@heroicons/vue/solid'
import dynamic from "../../store/dynamic";
import menu from "../../store/menu";
import router from "../../router";
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
import Swal from "sweetalert2";
import sotreSwal from "../../store/swal";
// import { getStorage, ref as refStorage, getDownloadURL } from "firebase/storage";
import mobile from 'is-mobile'
import TamplateList from "./TemplateList.vue"

const route = useRoute();

const RowsPerPage = 10
const Page = ref(0)
const CountRows = computed(() => filteredcomponents.value === undefined ? 1 : filteredcomponents.value.length)
const NumPage = computed(() => Math.ceil(CountRows.value / RowsPerPage));
const components = computed(() => dynamic.state.components);
const Field = ref(null);


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


const query = ref("");
const filteredcomponents = computed(() =>
    query.value === ""
        ? dynamic.state.table[route.query.page]
        : dynamic.state.table[route.query.page].filter((Component) => {

            if (Component[Field.value] === undefined || Component[Field.value] == null)
                return query.value === undefined || query.value == null;
            else if (Number.isInteger(Component[Field.value]))
                return Component[Field.value] == query.value;
            else
                return Component[Field.value].toLowerCase().includes(query.value.toLowerCase());
        })
);

// function Get1to1(Component) {
//     return Component != undefined && Component.hasOwnProperty("name") ? Component.name : ''
// }

function pageBack() {
    if (Page.value <= 0) return
    Page.value--
}
function pageNext() {
    if (Page.value + 1 >= NumPage.value) return
    Page.value++
}

// function getImage(params) {
//     if (params === undefined) return false
//     // if (params.hasOwnProperty('fullPath')) return ''
//     const storage = getStorage();
//     return getDownloadURL(refStorage(storage, params.fullPath))
//         .then((url) => {
//             params.myURL = url
//             return true
//         })
//         .catch(() => {
//             return false
//         });
// }


function edit(params, index) {

    dynamic.state.bind[route.query.page] = { ...params }

    //Faço a engenaria reversa para converter a CHECKBOX LIST EM CHECKBOX REGISTER
    for (let index = 0; index < Object.keys(dynamic.state.bind[route.query.page]).length; index++) {
        const element = Object.keys(dynamic.state.bind[route.query.page])[index];
        const obj = dynamic.state.bind[route.query.page][element]
        if (Array.isArray(obj)) {
            for (let index = 0; index < obj.length; index++) {
                const option = obj[index];
                dynamic.state.bind[route.query.page][element + "|" + option.name] = option.value
            }
        }
    }
    // console.log(dynamic.state.bind[route.query.page]);
    dynamic.state.RemoveIndex[route.query.page] = index
    router.push({ path: "/dynamic/register", query: { page: route.query.page, name: route.query.name } });
}
async function del(index) {
    await Swal.fire({
        title: "Você deseja realmente excluir esse item?",
        text: "Essa operação não poderá ser revertida.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
    }).then((result) => {
        if (result.isConfirmed) {
            dynamic.state.table[route.query.page].splice(index, 1)
            dynamic.dispatch('SaveDB', { page: route.query.page, data: dynamic.state.table[route.query.page] })
            sotreSwal.commit('notification', { icon: 'success', title: 'Item excluido com sucesso.' })
        }
    });
}


// function convertDate(params) {
//     if (params === undefined) return ''
//     var date = new Date(params);
//     date.setHours(date.getHours() + 3); // PRECISO ADD 3 HORAS POR COMO O TIMEZONE ESTÁ greenwich QUANDO CONVERTO ELE TIRA ESSAS 3h E ZOA A DATA
//     return date.toLocaleDateString("pt-BR");
// }
// function convertDatetime(params) {
//     if (params === undefined) return ''
//     var date = new Date(params);
//     // date.setHours(date.getHours() + 3); // PRECISO ADD 3 HORAS POR COMO O TIMEZONE ESTÁ greenwich QUANDO CONVERTO ELE TIRA ESSAS 3h E ZOA A DATA
//     return date.toLocaleDateString("pt-BR") + ' <br>' + date.toLocaleTimeString("pt-BR");;
// }
</script>

<style>
</style>
