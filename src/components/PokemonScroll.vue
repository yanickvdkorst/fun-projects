<template>
  <section class="first">
    <div class="outer">
      <div class="inner">
        <div class="bg one">
        </div>
      </div>
    </div>
  </section>
  <section class="second">
    <div class="outer">
      <div class="inner">
        <div class="bg">
        </div>
      </div>
    </div>
  </section>
  <section class="third">
    <div class="outer">
      <div class="inner">
        <div class="bg">
        </div>
      </div>
    </div>
  </section>
  <section class="fourth">
    <div class="outer">
      <div class="inner">
        <div class="bg">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { gsap } from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from "gsap/Observer"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, Observer, SplitText)

onMounted(() => {
  const sections = document.querySelectorAll("section")
  const images = document.querySelectorAll(".bg")
  const outerWrappers = gsap.utils.toArray(".outer")
  const innerWrappers = gsap.utils.toArray(".inner")
  let currentIndex = -1
  const wrap = gsap.utils.wrap(0, sections.length)
  let animating = false

  gsap.set(outerWrappers, { yPercent: 100 })
  gsap.set(innerWrappers, { yPercent: -100 })

  function gotoSection(index, direction) {
    index = wrap(index)
    animating = true
    const fromTop = direction === -1
    const dFactor = fromTop ? -1 : 1
    const tl = gsap.timeline({
      defaults: { duration: 1.25, ease: "power1.inOut" },
      onComplete: () => animating = false
    })

    if (currentIndex >= 0) {
      gsap.set(sections[currentIndex], { zIndex: 0 })
      tl.to(images[currentIndex], { yPercent: -15 * dFactor })
        .set(sections[currentIndex], { autoAlpha: 0 })
    }

    gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 })

    tl.fromTo([outerWrappers[index], innerWrappers[index]], { 
        yPercent: i => i ? -100 * dFactor : 100 * dFactor
      }, { 
        yPercent: 0 
      }, 0)
      .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
    

    currentIndex = index
  }

  Observer.create({
    type: "wheel,touch,pointer",
    wheelSpeed: -1,
    onDown: () => !animating && gotoSection(currentIndex - 1, -1),
    onUp: () => !animating && gotoSection(currentIndex + 1, 1),
    tolerance: 10,
    preventDefault: true
  })

  gotoSection(0, 1)
})
</script>

<style scoped>


section {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  visibility: hidden;
}

.outer, .inner { width: 100%; height: 100%; overflow: hidden; }

.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.first .bg { background-image: url("/album_1.png"); }
.second .bg { background-image: url("/album_2.png"); }
.third .bg { background-image:  url("/album_3.png"); }
.fourth .bg { background-image:  url("/album_4.png"); }

</style>