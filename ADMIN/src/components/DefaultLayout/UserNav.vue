<template>
    <Menu as="div" class="ml-3 relative">
        <div>
            <MenuButton
                class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <!-- <span class="sr-only">Open user menu</span> -->
                <img class="h-8 w-8 rounded-full"
                    src="https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png"
                    alt />
                <span class="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                    <span class="sr-only">Open user menu for</span>
                    {{ store.state.user.data.displayName }}
                </span>
                <ChevronDownIcon class="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block" aria-hidden="true" />
            </MenuButton>
        </div>
        <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                <router-link :to="item.to"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{ item.name }}
                </router-link>
                </MenuItem>

                <MenuItem v-slot="{ active }">
                <a href="#" @click="logout"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Sair</a>
                </MenuItem>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup>
import store from '../../store'
import menu from '../../store/menu'
import router from '../../router'
import { ref } from 'vue'

import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/vue'

import {
    ChevronDownIcon,
} from '@heroicons/vue/solid'

const userNavigation = menu.state.userNavigation

function logout() {
    store.dispatch('logout')
        .then((res) => {
            router.push({ name: 'Login' })
        })
}

// setInterval(() => {
// store.dispatch('getUser')
// }, 10000);

</script>

<style>
</style>