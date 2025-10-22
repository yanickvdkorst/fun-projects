<template>
    <section class="banner">
        <div class="content">
                <h1 ref="headline">JANNES</h1>
                <div class="content-bottom" ref="contentBottom">
                    <p>van het</p>
                    <p>platteland</p>
                </div>
        </div>
        <div class="image-container">
            <img src="/jannes.png" alt="">
        </div>
    </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap } from "gsap";

const headline = ref(null)
const contentBottom = ref(null)

function resizeHeadline() {
  const el = headline.value
  if (!el) return

  el.style.fontSize = '10rem'
  const parentWidth = el.parentElement.offsetWidth
  const scale = parentWidth / el.scrollWidth
  el.style.fontSize = `${10 * scale}rem`
}

onMounted(() => {
  resizeHeadline()
  window.addEventListener('resize', resizeHeadline)

  const elements = [headline.value, ...contentBottom.value.children]

  gsap.from(elements, {
    y: 100,           // start 100px lager
    opacity: 0,       // fade in
    duration: 1,
    ease: 'power2.out',
    stagger: 0.2,     // lichte delay per element
    scrollTrigger: {
      trigger: '.banner',
      start: 'top 80%',  // animatie start wanneer banner bijna in beeld
      toggleActions: 'play none none none'
    }
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHeadline)
})
</script>

<style scoped>

    .banner             {  background: #111; height: 100vh; max-width: 1420px; margin: auto; position: relative;}
    .image-container    {position: absolute; left: 50%; bottom: 0; transform: translateX(-50%);}

    .content h1         {font-size: 8rem; text-align: center; margin-bottom: 0; display: inline-block; line-height: 1.2;}
    .content-bottom     {display: flex; flex-direction: row; justify-content: space-between; align-items: center; margin: auto; max-width: 75%; z-index: 100; position: relative;}
    .content-bottom p    {font-size: clamp(2rem, 12vw, 3rem); margin-top: -2rem;}
</style>