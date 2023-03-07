<template>
    <div class="mt-0">
        <hr>
        <form action="#" method="POST" @submit="send">
            <div class="bg-white sm:p-6">
                <div class="grid grid-cols-12 gap-6">
                    <div class="col-span-12 sm:col-span-6">
                        <label for="region" class="block text-sm font-medium text-gray-700">Logo</label>
                        <input type="file" name="region" id="region" autocomplete="address-level1" class="mt-1 focus:ring-indigo-500 border focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                    <div class="col-span-12 sm:col-span-6">
                        <label for="region" class="block text-sm font-medium text-gray-700">Background do Login</label>
                        <input type="file" name="region" id="region" autocomplete="address-level1" class="mt-1 focus:ring-indigo-500 border focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>

</script>

<style>

</style>