<template>
    <nav class="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
        <div 
            v-for="(item) in navigation" 
            :key="item.name" 
            v-show="(item.name != 'Configurações' || store.state.user.data.email == 'admin@agatecnologia.com')"
        >
            <div v-if="!item.children || item.children.length == 0">
                <router-link :to="item.to" @click="menu.state.sidebarOpen = false"
                    :class="[activeMenu(item) ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md']">
                    <component :is="HIcons[item.icon]"
                        :class="[activeMenu(item) ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-3 flex-shrink-0 h-6 w-6']"
                        aria-hidden="true" />
                    {{ item.name }}
                </router-link>
            </div>
            <Disclosure as="div" v-else class="space-y-1" v-slot="{ open }" >
                <DisclosureButton
                    :class="[activeMenu(item) ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500']">
                    <component :is="HIcons[item.icon]"
                        class="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                    <span class="flex-1">{{ item.name }}</span>
                    <svg :class="[open ? 'text-gray-400 rotate-90' : 'text-gray-300', 'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150']"
                        viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                    </svg>
                </DisclosureButton>
                <DisclosurePanel class="space-y-1">
                    <DisclosureButton v-for="subItem in item.children" :key="subItem.name" as="a"
                        class="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50">
                        <router-link @click="menu.state.sidebarOpen = false" :to="subItem.to" class="w-full">{{
                                subItem.name
                        }}</router-link>
                    </DisclosureButton>
                </DisclosurePanel>
            </Disclosure>
        </div>
        <div>
            <router-link to="#" @click="logout(); menu.state.sidebarOpen = false; "
                class="bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md">
                <component :is="LogoutIcon" class="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true" />Sair
            </router-link>
        </div>
    </nav>
</template>

<script setup>
import router from '../../router';
import store from '../../store';
import menu from '../../store/menu'
import * as HIcons from '@heroicons/vue/outline'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { LogoutIcon } from '@heroicons/vue/outline'
import { computed } from '@vue/runtime-core';

const navigation = computed(() => menu.state.navigation)
const routerName = computed(() => router.currentRoute.value)
// console.log();
//Retorno qual dos menus deve aparecer selecionado de acordo com as rotas
function activeMenu(item) {
    if (item.hasOwnProperty('children')) {
        for (let index = 0; index < item.children.length; index++) {
            const element = item.children[index];
            if (element.to == routerName.value.path) return true
            if (element.to == routerName.value.href) return true
        }
    }
    if(item.to != routerName.value.path)  item.to == routerName.value.href
    return item.to == routerName.value.path
}

function logout() {
    store.dispatch('logout')
        .then((res) => {
            router.push({ name: 'Login' })
        })
}
</script>

<style>
</style>