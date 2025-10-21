<script setup>
import JannesScroll from './components/JannesScroll.vue';
import VideoScroll from './components/VideoScroll.vue';
import { provide, ref } from 'vue'

const scrollReady = ref(false);
provide('scrollReady', scrollReady);

</script>

<template>
  <VideoScroll />
  <JannesScroll />
</template>

<style>

</style>
