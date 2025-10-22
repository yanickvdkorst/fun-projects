<template>
    <section class="concurentie">

        <h1>Who needs...</h1>
        <div class="concurenten">
            <div class="svg-container">
                <svg width="2" height="1276" viewBox="0 0 2 1276" fill="none" xmlns="http://www.w3.org/2000/svg" ref="lineSvg">
                <line x1="1" x2="1" y2="1276" stroke="white" stroke-opacity="0.2" stroke-width="2"/>
                </svg>
            </div>
            <div class="concurent">
                <div class="image-container">
                    <img src="/marco.avif" alt="marco">
                </div>
                <h2>Marco Schuitmaker</h2>
            </div>
             <div class="concurent">
                <h2>Frans Duijts</h2>
                <div class="image-container">
                    <img src="/frans.jpg" alt="Snollebollekes">
                </div>
            </div>
            <div class="concurent">
                <div class="image-container">
                    <img src="/willem.jpeg" alt="Willem">
                </div>
                <h2>willem alexander</h2>
            </div>
        </div>
        <h1 class="title">If you have</h1>
        <div class="jannes-container">
            <div class="image-cover">
               <img src="/box.png" alt="cover">
            </div>
            <div class="image-container">
               <img src="/jannes.png" alt="Jannes">
           </div>
           <h2>Gewoon Jannes</h2>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Draggable } from "gsap/Draggable";
import { Physics2DPlugin } from "gsap/Physics2DPlugin"

gsap.registerPlugin(Physics2DPlugin)

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, Draggable)

const lineSvg = ref(null)
onMounted(() => {
  // Maak de images draggable
Draggable.create(".jannes-container .image-cover", {
  type: "x",
  bounds: ".concurentie",

  onPress: function() {
    this._last = { time: performance.now(), x: this.x };
  },

  onDrag: function() {
    const now = performance.now();
    if (now - this._last.time > 30) {
      this._last = { time: now, x: this.x };
    }
  },

  onRelease: function() {
    const now = performance.now();
    const last = this._last || { time: now, x: this.x };
    const dt = Math.max(now - last.time, 1);
    const dx = this.x - last.x;
    let vx = dx / (dt / 1000);

    // Forceer harde snelheid, ook bij kleine beweging
    const minSpeed = 1500;        // minimum snelheid
    const maxSpeed = 4000;        // cap
    const direction = vx >= 0 ? 0 : 180;
    const speed = Math.min(Math.max(Math.abs(vx) * 5, minSpeed), maxSpeed); // vermenigvuldig voor kracht

    gsap.killTweensOf(this.target);

    gsap.to(this.target, {
      duration: 2,
      physics2D: {
        velocity: speed,
        angle: direction,
        gravity: 800,
      },
      ease: "power1.out"
    });
  }
});

  // Selecteer de line
  const line = lineSvg.value.querySelector('line')
  gsap.set(line, { drawSVG: "0%" })

  // drawSVG animatie gekoppeld aan scroll
  gsap.to(line, {
    drawSVG: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: ".concurentie",
      start: "top center",
      end: "bottom bottom",
      scrub: true,
      // markers: true
    }
  })

  // Fade-in animatie voor elk .concurent element
  const concurents = document.querySelectorAll(".concurent")
  concurents.forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 50,                // iets naar beneden starten
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",   // wanneer element bijna in beeld
        toggleActions: "play none none none", // animatie speelt 1 keer
      }
    })
  })

  // Optioneel: fade-in voor h2 onder images
  const h2s = document.querySelectorAll(".concurent h2")
  h2s.forEach((h2) => {
    gsap.from(h2, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: h2,
        start: "top 90%",
        toggleActions: "play none none none",
      }
    })
  })

})
</script>

<style scoped>
    .concurentie                {display: flex; flex-direction: column; align-items: center; padding: 5rem 0; position: relative;}
    .concurenten                {display: flex; flex-direction: column; max-width: 1200px; align-items: center; gap: 2rem; margin: 2.5rem; position: relative; overflow: hidden;}
    .concurenten .concurent     {display: flex; flex-direction: row; justify-content: space-between; align-items: center;} 
    .image-container            {aspect-ratio: 1 / 1; width: 30%;}
    .svg-container              {position: absolute; top: 0; left: 50%; transform: translateX(-50%);}
    .jannes-container           {position: relative; display: flex; align-items: center; flex-direction: column;}
    .title                      {margin-top: 2.5rem;}
    .jannes-container .image-container  {width: 50%;}
    .image-cover                {position: absolute; top: 0; left: 50%; bottom: 0; right: 0; width: 60%; aspect-ratio: 1 / 1; transform: translateX(-50%); border: white 1px solid; box-shadow: 0 0 15px rgba(255, 255, 255, 0.2); }
</style> 