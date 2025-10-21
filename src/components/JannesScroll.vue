<template>
  <section class="cta">
    <h1>Ik loev het</h1>
    <img class="jannes" src="/jannes.png" alt="Jannes">
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// onMounted(() => {
//   gsap.to(".jannes", {
//     yPercent: -120, // beweegt omhoog
//     ease: "none",
//     scrollTrigger: {
//       trigger: ".cta",
//       start: "top bottom",   // wanneer .cta in beeld komt
//       end: "bottom top",     // wanneer .cta uit beeld gaat
//       scrub: true,
//       markers: true,         // voor debug, kan uit
//     }
//   });
// });
</script>

<style scoped>
.cta {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #111;
  overflow: hidden;
}

.cta img {
  position: absolute;
  bottom: -50%;
  width: 60%;
  max-width: 800px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  margin-top: 3rem;
}

h1 {
  font-size: 128px;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  z-index: 2;
}
</style>