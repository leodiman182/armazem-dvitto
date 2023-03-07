<template>
    <div>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <AuthHeader title="Crie sua conta" />

                <form class="mt-8 space-y-6" @submit="register">
                    <div class="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700">Nome</label>
                            <div class="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autocomplete="name"
                                    required
                                    v-model="user.name"
                                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                for="email"
                                class="block text-sm font-medium text-gray-700"
                            >E-mail</label>
                            <div class="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
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
                                    autocomplete="password"
                                    required
                                    v-model="user.password"
                                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
                                />
                            </div>
                        </div>
                    </div>
                    <Alerts :error="true" :message="store.state.error" />

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
                            Cadastrar
                        </button>
                    </div>

                    <p class="text-center">
                        Já tem conta?
                        <router-link
                            :to="{ name: 'Login' }"
                            class="font-medium text-indigo-600 hover:text-indigo-500"
                        >Acesse sua conta</router-link>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { LockClosedIcon } from '@heroicons/vue/solid'
import AuthHeader from '../components/AuthHeader.vue'

import Alerts from '../components/Alerts.vue'
import store from '../store';
import router from '../router';

const user = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
}

store.state.error = null
function register(ev) {
    ev.preventDefault()

    store.state.error = null
    store.dispatch('register', user)
        .then((res) => {
            if (store.state.error == null) router.push({ name: 'Dashboard' })
        })
        .catch(err => {
            // setErrors(err.response.data.errors)
        })
}


</script>