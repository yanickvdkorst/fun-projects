<template>
  <section class="albums">
    <div class="album-track">
      <div class="album"><img src="/album_1.png" alt="Album 1" /></div>
      <div class="album"><img src="/album_2.png" alt="Album 2" /></div>
      <div class="album"><img src="/album_3.png" alt="Album 3" /></div>
      <div class="album"><img src="/album_4.png" alt="Album 4" /></div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  const track = document.querySelector(".album-track")
  const albums = gsap.utils.toArray(".album")

  // Zorg dat de breedte van de track exact klopt
  const trackWidth = albums.length * window.innerWidth
  track.style.width = `${trackWidth}px`

  // Bereken hoe ver je moet scrollen
  const scrollDistance = trackWidth - window.innerWidth

  // Maak de horizontale scroll
  gsap.to(track, {
    x: -scrollDistance,
    ease: "none",
    scrollTrigger: {
      trigger: ".albums",
      start: "top top",
      end: `+=${scrollDistance}`, // scroll exact over de breedte van de track
      scrub: true,
      pin: true,
    },
  })
})
</script>

<style scoped>
.albums {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.album-track {
  display: flex;
  height: 100%;
  width: 100%;
}

.album {
  width: 100vw;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.album img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>