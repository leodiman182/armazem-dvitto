
<template>
    <div>
        <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <AuthHeader title="Acesse sua conta" redirect="regisger" />

                <form class="mt-8 space-y-6" @submit="login">
                    <input type="hidden" name="remember" value="true" />
                    <div class="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label
                                for="email-address"
                                class="block text-sm font-medium text-gray-700"
                            >E-mail</label>
                            <div class="mt-1">
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autocomplete="email"
                                    required
                                    v-model="user.email"
                                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                for="password"
                                class="block text-sm font-medium text-gray-700"
                            >Senha</label>
                            <div class="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autocomplete="current-password"
                                    required
                                    v-model="user.password"
                                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
                                />
                            </div>
                        </div>
                    </div>
                    <Alerts :error="true" :message="store.state.error" />
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                v-model="user.remember"
                            />
                            <label
                                for="remember-me"
                                class="ml-2 block text-sm text-gray-900"
                            >Manter conta conectada</label>
                        </div>

                        <div class="text-sm">
                            <router-link
                                :to="{ name: 'Forgot' }"
                                class="font-medium text-indigo-600 hover:text-indigo-500"
                            >Esqueceu sua senha?</router-link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon
                                    class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                    aria-hidden="true"
                                />
                            </span>
                            Acessar
                        </button>
                    </div>

                    <!-- <p class="text-center">
                        Ainda não tem conta?
                        <router-link
                            :to="{ name: 'Register' }"
                            class="font-larger text-indigo-600 hover:text-indigo-500 label-link"
                        >Cadastre-se</router-link>
                    </p> -->
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>

import Alerts from '../components/Alerts.vue'
import { LockClosedIcon } from '@heroicons/vue/solid'
import AuthHeader from '../components/AuthHeader.vue'
import store from '../store'
import router from '../router';

const user = {
    email: '',
    password: '',
    remember: false
}

store.state.error = null
function login(ev) {
    ev.preventDefault()
    store.state.error = null
    store.dispatch('login', user)
        .then((res) => {
            router.push({ name: 'Dashboard' })
        })
}
</script>
