<template>
  <div class="story-container">
    <section class="scene scene-1">
      <video autoplay muted loop src="/video.mp4"></video>
      <div class="text">Welkom bij scène 1</div>
    </section>
    <section class="scene scene-2">
      <video autoplay muted loop src="/video.mp4"></video>
      <div class="text">Scène 2: meer info</div>
    </section>
    <section class="scene scene-3">
      <video autoplay muted loop src="/video.mp4"></video>
      <div class="text">Laatste scène</div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  const scenes = document.querySelectorAll(".scene");

  scenes.forEach((scene, i) => {
    gsap.fromTo(
      scene,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: scene,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true, // houdt de section vast
        },
      }
    );
  });
});
</script>

<style scoped>
.story-container {
  width: 100%;
  overflow: hidden;
}

.scene {
  position: relative;
  width: 100%;
  height: 100vh; /* fullscreen */
}

.scene video {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.scene .text {
  position: absolute;
  bottom: 10%;
  left: 10%;
  color: white;
  font-size: 2rem;
}
</style>