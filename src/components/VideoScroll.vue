<script setup>
import { onMounted } from 'vue'
import Lenis from 'lenis'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // --- Lenis smooth scroll setup ---
  const lenis = new Lenis({
    autoRaf: false,
  })

  function raf(time) {
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(raf)

  // --- Scroll-triggered video playback ---
  const vid = document.getElementById('v0')

  vid.addEventListener('loadedmetadata', () => {
    const duration = vid.duration

    ScrollTrigger.create({
      trigger: '.animation-wrapper',
      start: 'top top',
      end: '+=' + duration * 1000 + 'px',
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        vid.currentTime = duration * self.progress
      },
      onLeave: () => (vid.currentTime = duration),
      onEnterBack: () => (vid.currentTime = 0),
    });


  // 👉 Nu pas de .cta animatie registreren
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
  });

  // 👇 ScrollTrigger refreshen om alles opnieuw te berekenen
  ScrollTrigger.refresh();

  })
})
</script>

<template>
  <section class="banner">
    <div class="animation-wrapper">
      <div class="hero">
        <video id="v0" muted playsinline preload="auto">
          <source
            src="https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  </section>
</template>


<style scoped>
.banner {background: #000;}
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