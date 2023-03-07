<template>
    <div>
        <label :for="name" class="block text-sm font-medium text-gray-700">{{ label }}</label>
        <div :class="error != null ? 'mt-1 relative rounded-md shadow-sm' : ''">
            <!-- <slot></slot> -->
            <input :id="id" :name="name" :type="type" :autocomplete="id" required v-model="storeInput.state.field[id]"
                :class="inputClass(error)" />
            <div v-if="error != null" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
        </div>
        <p class="text-sm text-red-600 mb-2" id="name-error">{{ error }}</p>
    </div>
</template>

<script setup>
import { ExclamationCircleIcon } from '@heroicons/vue/solid'
import { defineProps } from 'vue'
import storeInput from '../../store/input';

const props = defineProps({
    error: String,
    label: String,
    id: String,
    name: String,
    type: String
})

function inputClass(error) {
    return error == null ?
        'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2 mt-1' :
        'block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md'
}

</script>

<style>
</style>