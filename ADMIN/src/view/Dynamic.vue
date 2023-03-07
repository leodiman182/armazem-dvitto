<template>
    <div>
        <mount></mount>

        <div
            :class="'pb-5 ' + ((tabss.length > 0 && route.path == '/dynamic/register') ? ' ' : 'border-b border-gray-200') + ' sm:flex sm:items-center sm:justify-between'">

            <h3 class="text-3xl leading-6 font-medium text-gray-900">
                {{ route.query.name[0].toUpperCase() + route.query.name.substr(1) }}

                <PencilAltIcon v-if="store.state.user.data.email == 'admin@agatecnologia.com'" style="cursor: pointer" @click="dynamic.state.openMount = true"
                    class="h-4 w-4 inline-flex items-center text-sky-900" aria-hidden="true" />
            </h3>

            <div class="mt-3 flex sm:mt-0 sm:ml-4">

                <button v-if="route.path == '/dynamic/list' && navigation.includes(1)"
                    @click="router.push({ path: '/dynamic/register', query: { page: route.query.page, name: route.query.name } });"
                    type="button"
                    class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Cadastrar
                </button>
                <button v-if="route.path == '/dynamic/register'"
                    @click="router.push({ path: '/dynamic/list', query: { page: route.query.page, name: route.query.name } });"
                    type="button"
                    class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Listar
                </button>

            </div>
        </div>

        

        <!-- PENSAR COMO DESENHAR AS ABAS -->
        <div v-if="route.path == '/dynamic/register' && tabss.length > 0">
            <div>
                <div class="sm:hidden mb-4">
                    <label for="tabs" class="sr-only">Select a tab</label>
                    <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
                    <select id="tabs" name="tabs"
                        class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option v-for="tab in tabss" :key="tab.name" :selected="tab.current">{{ tab.name }}</option>
                    </select>
                </div>
                <div class="hidden sm:block">
                    <div class="border-b border-gray-200">
                        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                            <a v-for="tab in tabss" :key="tab.name" :href="tab.href"
                                :class="[tab.current ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm']"
                                :aria-current="tab.current ? 'page' : undefined">
                                {{ tab.name }}
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>

        <!-- DRAW PAGE PER ROUTE -->
        <router-view class="mt-6"></router-view>
    </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { DotsVerticalIcon, PencilAltIcon } from '@heroicons/vue/solid'
import { useRoute } from "vue-router";
import router from "../router";
import { computed, ref } from "vue";
import dynamic from "../store/dynamic";
import menu from "../store/menu";
import store from "../store";
import mount from "../components/Dynamic/Mount.vue";
const route = useRoute();
const to = ref(route.path);
let href = ref(route.path + "?page=" + route.query.page);

const tabs = computed(() => dynamic.state.tabs[route.query.page]);
// const tabs = computed(() => dynamic.state.tabs[route.query.page]);

dynamic.dispatch('GetDB', route)
function changeCurrent(name) {
    setTimeout(() => {
        dynamic.state.tabs[route.query.page].forEach((element) => {
            element.current = element.name == name;
        });
    }, 100);
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

function changeSelect() {
    router.push({ path: href.value, query: { page: route.query.page } });
}

// teste
const tabss = [
    // { name: 'My Account', href: '#', current: false },
    // { name: 'Company', href: '#', current: false },
    // { name: 'Team Members', href: '#', current: true },
    // { name: 'Billing', href: '#', current: false },
]
</script>