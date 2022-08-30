<template>
    <div>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <AuthHeader title="Trocar senha" />

                <form class="mt-8 space-y-6" @submit="reset">
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
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
                    <Alerts :error="err" :message="errMsg" />
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
                            Trocar Senha
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
import inputValidation from '../components/input/Validation.vue'
import store from '../store';
import router from '../router'
import { ref } from "vue";

let arrParameter = []
let errMsg = ref()
let err = ref(false)

window.location.search
    .split('?')[1]
    .split('&')
    .forEach(element => {
        arrParameter.push(element.split("=")[1])
    });

const user = {
    password: '',
    mode: arrParameter[0],
    oobCode: arrParameter[1],
    apiKey: arrParameter[2]
}

function reset(ev) {
    ev.preventDefault()
    errMsg.value = null
    store.dispatch('reset', user)
        .then((res) => {
            err.value = res.error
            errMsg.value = res.msg
            setTimeout(() => {
                router.push({ name: 'Login' })
            }, 4000);
        })
        .catch(retErr => {
            err.value = retErr.error
            errMsg.value = retErr.msg
        })
}
</script>

<style>
</style>