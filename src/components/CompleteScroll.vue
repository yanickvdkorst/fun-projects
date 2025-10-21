<template>
  <section class="hero">
    <video autoplay muted class="video" ref="video" loop>
      <source src="/video.mp4" type="video/mp4"/>
    </video>
    <div class="vertical-lines vertical-lines--white">
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
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const video = ref(null)

onMounted(() => {
  gsap.to(video.value, {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    duration: 2,  // tijd in seconden
    ease: 'power2.out',
    delay: 2
  })
})
</script>

<style scoped> 
@import url('https://fonts.cdnfonts.com/css/pp-neue-montreal');
.hero {
  font-family: 'PP Neue Montreal', sans-serif;

}

h1  {text-transform: uppercase; z-index: 1000; position: relative;}
  .video {
    clip-path: polygon(47% 42%, 53% 42%, 53% 58%, 47% 58%);
    height: 100%;
    left: 0;
    -o-object-fit: cover;
    object-fit: cover;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
  }

  .vertical-lines   {
    height: 100%;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    transform: translateZ(0);
    width: 100%;
    z-index: 100;
  }

  .vertical-lines__line   {
    background-color: white;
    display: block;
    height: 100%;
    opacity: .2;
    position: absolute;
    transform: translate(-50%);
    width: 1px;
  }

.vertical-lines__line.line_1 { left: 15%;}

.vertical-lines__line.line_2 {left: 50%;}

.vertical-lines__line.line_3 {left: 85%;}


.content            { 
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
  display: block;
  font-size: 182px;
  font-weight: 600;
  left: 0;
  letter-spacing: -.04em;
  line-height: .8524590164em;
  /* position: absolute; */
  text-align: center;
  top: 0;
  transform: translate(-.5%);
  width: 10%;
}
</style>