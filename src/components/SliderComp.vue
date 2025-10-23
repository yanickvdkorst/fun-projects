<template>
  <section class="slider">

    <div class="controls">
      <button @click="prev">Prev</button>
      <button @click="next">Next</button>
    </div>
    <div class="slides-container">
      <div class="slides-inner">
        <div class="slide" style="background:red;">1</div>
        <div class="slide" style="background:black;">2</div>
        <div class="slide" style="background:yellow;">3</div>
        <div class="slide" style="background:green;">4</div>
        <div class="slide" style="background:orange;">5</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { gsap } from "gsap"

const current = ref(0)
let animation

onMounted(() => {
  const slides = gsap.utils.toArray(".slide")
  const total = slides.length

  // horizontale animatie
  animation = gsap.to(".slides-inner", {
    xPercent: -100 * (total - 1),
    ease: "none",
    paused: true,
  })

  const update = () => {
    gsap.to(animation, {
      progress: current.value / (total - 1),
      duration: 0.5,
      ease: "power2.out",
    })
  }

  // functies koppelen
  window.prev = () => {
    if (current.value > 0) current.value--
    update()
  }
  window.next = () => {
    if (current.value < total - 1) current.value++
    update()
  }
})

const prev = () => window.prev()
const next = () => window.next()
</script>

<style scoped>
.slider {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.slides-container {
  flex: 1;
  overflow: hidden;
}

.slides-inner {
  display: flex;
  height: 100%;
}

.slide {
  flex: 0 0 100%;
  height: 100%;
  font-size: 80px;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.controls {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 1rem;
}

button {
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: .5rem;
  border: none;
}
</style>