<template>
  <section class="hero">
    <video autoplay muted class="video" ref="video" loop>
      <source src="/video.mp4" type="video/mp4" />
    </video>

    <div class="vertical-lines vertical-lines--white" ref="lines">
      <div class="vertical-lines__line line_1"></div>
      <div class="vertical-lines__line line_2"></div>
      <div class="vertical-lines__line line_3"></div>
    </div>

    <div class="content">
      <div>I</div>
      <div>C</div>
      <div>E</div>
      <div>B</div>
      <div>E</div>
      <div>R</div>
      <div>G</div>
    </div>

    <div class="overlay overlay--black intro__overlay" ref="overlay">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ✅ Eerst alle refs declareren
const video = ref(null)
const overlay = ref(null)
const lines = ref(null) // Deze regel ontbrak

onMounted(() => {
  gsap.to(video.value, {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    duration: 2,
    ease: 'power2.out',
    delay: 1,
  })

  const bars = overlay.value.querySelectorAll('.bar')
  const lineElements = lines.value.querySelectorAll('.vertical-lines__line')

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: '+=400',
      scrub: 2,
      pin: true,
      pinSpacer: false,
    },
  })

  tl.to(bars, {
    scaleX: 1,
    duration: 1,
    ease: 'power2.inOut',
    stagger: 0.15,
    transformOrigin: 'left center',
  })

  tl.to(lineElements, {
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    stagger: 0.1,
  }, '<')
})
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/pp-neue-montreal');

.hero {
  font-family: 'PP Neue Montreal', sans-serif;
  position: relative;
  height: 100vh; /* extra hoogte voor scrollruimte */
  overflow: hidden;
}

.video {
  clip-path: polygon(47% 42%, 53% 42%, 53% 58%, 47% 58%);
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.vertical-lines {
  height: 100%;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 100;
}

.vertical-lines__line {
  background-color: white;
  display: block;
  height: 100%;
  opacity: 0.2;
  position: absolute;
  transform: translate(-50%);
  width: 1px;
}

.vertical-lines__line.line_1 { left: 15%; }
.vertical-lines__line.line_2 { left: 50%; }
.vertical-lines__line.line_3 { left: 85%; }

.content {
  align-items: center;
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  z-index: 5;
}

.content div {
  color: white;
  font-size: 182px;
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 0.85em;
  text-align: center;
  width: 10%;
}

/* Overlay */
.intro__overlay {
  height: 100lvh;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
  display: flex;
}

.overlay--black > div {
  background-color: black;
  width: 16.6667%;
  transform: scaleX(0);
  transform-origin: left center;
}
</style>