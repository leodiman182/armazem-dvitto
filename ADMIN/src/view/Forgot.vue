<template>
    <div>
        <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <AuthHeader title="Recuperação de senha" />

                <form class="mt-8 space-y-6" @submit="forgot">
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
                    </div>

                    <Alerts :error="error" :message="errMsg" />

                    <div>
                        <button
                            :disabled="loading"
                            type="submit"
                            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon
                                    class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                    aria-hidden="true"
                                />
                            </span>
                            <span v-if="loading">
                                Enviando
                                <pulse-loader :loading="loading" color="#fff" size="12px"></pulse-loader>
                            </span>
                            <span v-else>Recuperar</span>
                        </button>
                    </div>
                    <p class="text-center">
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
import AuthHeader from '../components/AuthHeader.vue'
import Alerts from '../components/Alerts.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { LockClosedIcon } from '@heroicons/vue/solid'
import { ref } from "vue"
import store from '../store'

let errMsg = ref()
let error = ref(false)

let loading = ref(false)
const user = {
    email: ''
}

function forgot(ev) {
    ev.preventDefault()
    errMsg.value = null
    loading.value = true

    store.dispatch('forgot', user)
        .then((res) => {
            loading.value = false
            console.log(res);
            if (res) {
                error.value = false
                errMsg.value = 'Link de recuperação de senha enviado para seu e-mail.'
            } else {
                error.value = true
                errMsg.value = 'Não foi possível enviar o e-mail de recuperação de senha. Verifique se digitou seu e-mail corretamente.'
            }
        })
        .catch(err => {
            error.value = true
            errMsg.value = 'Não foi possível enviar o e-mail de recuperação de senha. Verifique se digitou seu e-mail corretamente.'
        })
}

</script>

<style>
</style>