<template>
  <section class="banner">
    <div class="animation-wrapper" ref="wrapper">
      <div class="hero">
        <video ref="vid" muted playsinline preload="auto">
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

    ScrollTrigger.create({
      trigger: wrapper.value,
      start: 'top top',
      end: '+=' + duration * 1000 + 'px',
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        vid.value.currentTime = duration * self.progress
      },
    })

    scrollReady.value = true // ✅ geef aan dat ScrollTrigger klaar is
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
  width: 70%;
  height: auto;
  object-fit: cover;
}
</style>