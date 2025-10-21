<script setup>
import AlbumScroll from '../components/AlbumScroll.vue';
import BannerHero from '../components/BannerHero.vue';
import CounterSection from '../components/CounterSection.vue';
import JannesScroll from '../components/JannesScroll.vue';

import { provide, ref } from 'vue'

const scrollReady = ref(false);
provide('scrollReady', scrollReady);

</script>

<template>
  <BannerHero />
  <JannesScroll />
  <AlbumScroll />
  <CounterSection />
</template>

<style>

</style>
