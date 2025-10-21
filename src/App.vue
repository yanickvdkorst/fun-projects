<script setup>
import AlbumScroll from './components/AlbumScroll.vue';
import JannesScroll from './components/JannesScroll.vue';
import VideoScroll from './components/VideoScroll.vue';

import { provide, ref } from 'vue'

const scrollReady = ref(false);
provide('scrollReady', scrollReady);

</script>

<template>
  <VideoScroll />
  <JannesScroll />
  <AlbumScroll />
</template>

<style>

</style>
