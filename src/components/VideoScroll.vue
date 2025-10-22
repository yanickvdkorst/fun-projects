<template>
  <section class="banner">
    <div class="animation-wrapper" ref="wrapper">
      <div class="hero">
        <video ref="vid" muted playsinline preload="auto" class="vid">
          <source src="https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4" type="video/mp4"/>
        </video>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const vid = ref(null)
const wrapper = ref(null)
const scrollReady = inject('scrollReady')

onMounted(() => {
  vid.value.addEventListener('loadedmetadata', () => {
    const duration = vid.value.duration

  const scrollMultiplier = 300; // pixels per seconde video
  ScrollTrigger.create({
    trigger: wrapper.value,
    start: 'top top',
    end: '+=' + duration * scrollMultiplier + 'px', 
    scrub: true,
    pin: true,
    onUpdate: self => vid.value.currentTime = duration * self.progress
  })

    scrollReady.value = true;
    ScrollTrigger.refresh()
  })
})
</script>
<style scoped>
.banner { background: #000; }
.hero {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
video {
  position: relative;
  width: 70%;
  height: auto;
  object-fit: cover;
}
video::after  {content: ''; position: absolute; left: 0; top: 0; bottom: 0; right: 0; background-color: blue;}


</style>