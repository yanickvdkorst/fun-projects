<template>
    <section class="banner">
        <div class="content">
                <h1 ref="headline">JANNES</h1>
                <div class="content-bottom">
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

const headline = ref(null)

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
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHeadline)
})
</script>

<style scoped>

    .banner             {  background: #111; height: 100vh; max-width: 1420px; margin: auto;}
    .image-container    {position: absolute; left: 50%; bottom: 0; transform: translateX(-50%);}

    .content h1         {font-size: 8rem; text-align: center; margin-bottom: 0; display: inline-block; line-height: 1.2;}
    .content-bottom     {display: flex; flex-direction: row; justify-content: space-between; align-items: center; margin: auto; max-width: 75%; z-index: 100; position: relative;}
    .content-bottom p    {font-size: clamp(2rem, 12vw, 3rem); margin-top: -2rem;}
</style>