<template>
  <section class="cta">
    <h1>Ik loev het</h1>
    <img class="jannes" src="/jannes.png" alt="Jannes">
  </section>
</template>

<script setup>
import { onMounted, inject, watch } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const scrollReady = inject('scrollReady')

watch(scrollReady, (ready) => {
  if (ready) {
    gsap.to(".jannes", {
      yPercent: -92,
      ease: "none",
      scrollTrigger: {
        trigger: ".cta",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        // markers: true,
      }
    })
  }
})
</script>

<style scoped>
.cta {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #111;
}
.cta img {
  position: absolute;
  bottom: -50%;
  width: 60%;
  max-width: 800px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
h1 {
  font-size: 128px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  z-index: 2;
}
</style>