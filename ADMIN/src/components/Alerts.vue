<template>
    <div
        v-if="message != null"
        :class="'rounded-md ' + (error ? 'bg-red-50' : 'bg-green-50') + ' p-4'"
    >
        <div class="flex">
            <div class="flex-shrink-0">
                <XCircleIcon v-if="error" class="h-5 w-5 text-red-400" aria-hidden="true" />
                <CheckCircleIcon v-else class="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
                <h3
                    :class="'text-sm font-medium ' + (error ? 'text-red-800' : 'text-green-800')"
                >{{ message }}</h3>
            </div>
        </div>
    </div>
</template>

<script setup>
import { CheckCircleIcon } from '@heroicons/vue/solid'
import { XCircleIcon } from '@heroicons/vue/solid'
import { defineProps } from 'vue'

const props = defineProps({
    error: Boolean,
    message: String,
})

</script>
