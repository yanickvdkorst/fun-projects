<template>
    <section class="albums">
        <div class="image-container image-1">
            <img src="/album_1.png" alt="">
        </div>
         <div class="image-container image-2">
            <img src="/album_2.png" alt="">
        </div>
         <div class="image-container image-3">
            <img src="/album_3.png" alt="">
        </div>
         <div class="image-container image-4">
            <img src="/album_4.png" alt="">
        </div>

        <div class="jannes-image">
            <img src="/jannes.png" alt="">
        </div>
        <div class="background-layer"></div>
    </section>
</template>

<script setup>
import { onMounted, inject, watch } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const scrollReady = inject('scrollReady')

onMounted(() => {
//   watch(scrollReady, (ready) => {
//     if (ready) {
      // Jannes blijft gepind in het midden
      ScrollTrigger.create({
        trigger: ".albums",
        start: "top top",
        end: "bottom top",
        pin: ".jannes-image",
        scrub: true,
        // markers: true,
      });

      // Album-afbeeldingen komen één voor één in beeld
      gsap.utils.toArray(".albums .image-container").forEach((container, i) => {
        gsap.from(container, {
          opacity: 0,
          scale: 0.8,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        });
      });
//     }
//   });
});
</script>


<style scoped>
    .albums { position: relative; height: 200vh; overflow: hidden; } 

.image-container {
  aspect-ratio: 1 / 1;
  width: 25%;
  position: absolute;
  opacity: 1; /* start onzichtbaar */
  z-index: 1;
}

.image-container img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.image-1 { left: 20px; top: 20vh; }
.image-2 { right: 20px; top: 60vh; }
.image-3 { left: 20px; bottom: 60vh; }
.image-4 { right: 20px; bottom: 20vh; }

.jannes-image { position: absolute; top: 0; left: 50%; transform: translate(-50%); z-index: 10;width: 200px; display: none;}

.background-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200vh;
  background-image: url('/jannes_optreden.png');
  background-size: cover;
  background-position: center;
  z-index: 0;
}
</style>