<template>
    <div>
        <TransitionRoot as="template" :show="sidebarOpen.state.sidebarOpen">
            <Dialog as="div" class="fixed inset-0 flex z-40 md:hidden" @close="sidebarOpen.state.sidebarOpen = false">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100" leave-to="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
                </TransitionChild>
                <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                    enter-from="-translate-x-full" enter-to="translate-x-0"
                    leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                    leave-to="-translate-x-full">
                    <div class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                        <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                            enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100"
                            leave-to="opacity-0">
                            <div class="absolute top-0 right-0 -mr-12 pt-2">
                                <button type="button"
                                    class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    @click="sidebarOpen.state.sidebarOpen = false">
                                    <span class="sr-only">Close sidebar</span>
                                    <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                </button>
                            </div>
                        </TransitionChild>
                        <div class="flex-shrink-0 flex items-center px-4">
                            <img class="h-20 w-auto" src="../../assets/logo-branco.png" alt="Workflow" />
                        </div>
                        <div class="mt-5 flex-1 h-0 overflow-y-auto">
                            <DefaualtMenu></DefaualtMenu>
                        </div>
                    </div>
                </TransitionChild>
                <div class="flex-shrink-0 w-14" aria-hidden="true">
                    <!-- Dummy element to force sidebar to shrink to fit close icon -->
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Static sidebar for desktop -->
        <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div class="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
                <div class="flex items-center flex-shrink-0 px-4">
                    <img class="h-32 w-auto" src="../../assets/logo-branco.png" alt="Imobiliária" />
                </div>
                <div class="mt-5 flex-grow flex flex-col">
                    <DefaualtMenu></DefaualtMenu>
                </div>
            </div>
        </div>
        <div class="md:pl-64 flex flex-col flex-1 teste">
            <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
                <button type="button"
                    class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                    @click="sidebarOpen.state.sidebarOpen = true">
                    <span class="sr-only">Open sidebar</span>
                    <MenuAlt2Icon class="h-6 w-6" aria-hidden="true" />
                </button>
                <div class="flex-1 px-4 flex justify-between">
                    <div class="flex-1 flex">
                        <!-- <Search></Search> -->
                    </div>
                    <div class="ml-4 flex items-center md:ml-6">
                        <!-- Profile dropdown -->
                        <UserNav></UserNav>
                    </div>
                </div>
            </div>
            <default-header class="teste" :title="router.currentRoute.value.meta.name">
                <router-view></router-view>
            </default-header>
        </div>
    </div>
</template>

<script setup>
import DefaultHeader from './Header.vue'
import DefaualtMenu from './Menu.vue'
import UserNav from './UserNav.vue'
import Search from './Search.vue'
import sidebarOpen from '../../store/menu'
import router from '../../router'
import { ref } from 'vue'

import {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

import {
    MenuAlt2Icon,
    XIcon,
} from '@heroicons/vue/outline'

sidebarOpen.dispatch('Set')
</script>

<style scoped>
.teste {
    height: 100vh !important;
}
</style>
