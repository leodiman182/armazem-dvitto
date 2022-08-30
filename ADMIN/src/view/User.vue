<template>
    <div>
        <hr>
        <form class="mt-4 space-y-6" @submit="register">
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

            <hr>
            <div class="flex flex-shrink-0 justify-end px-4 py-4">
                <button
                    type="submit"
                    class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <!-- <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                        <LockClosedIcon
                            class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                            aria-hidden="true"
                        />
                    </span> -->
                    Cadastrar
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { LockClosedIcon } from '@heroicons/vue/solid'
import AuthHeader from '../components/AuthHeader.vue'
import swal from "../store/swal";
import Alerts from '../components/Alerts.vue'
import store from '../store';
import router from '../router';
import { ref } from 'vue'

const user = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

store.state.error = null
function register(ev) {
    ev.preventDefault()

    store.state.error = null
    store.dispatch('register', user.value)
        .then((res) => {
            if (store.state.error == null) {
                swal.commit('notification', { icon: 'success', title: 'Usuário cadastrado com sucesso.' })
                user.value.name = ''
                user.value.email = ''
                user.value.password = ''
                user.value.password_confirmation = ''
            }
        })
        .catch(err => {
            // setErrors(err.response.data.errors)
        })
}


</script>