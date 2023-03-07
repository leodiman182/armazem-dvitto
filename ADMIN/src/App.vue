<template>
  <router-view></router-view>
</template>

  
<script setup>
import { onMounted, } from 'vue'
import store from './store';
// import dynamic from './store/dynamic';

onMounted(() => {
  store.dispatch('getUser')
  // dynamic.commit('setDrawPage')

})

</script>


<style>
</style>
