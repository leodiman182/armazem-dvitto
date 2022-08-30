<template>
    <main class="flex-1">
        <div class="py-6 ">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 class="text-2xl font-semibold text-gray-900">{{ title }}</h1>
            </div>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <!-- <hr class="mt-1" /> -->

                <!-- Replace with your content -->
                <div class="py-4">
                    <slot></slot>
                </div>
                <!-- /End replace -->
            </div>
        </div>
    </main>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    title: String,
})

</script>

<style>
</style>