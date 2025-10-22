<template>
  <section class="counters">
    <div class="row">
      <div class="col first">
        <div class="counters-list">
          <div class="counter-item" v-for="(item, index) in counterData" :key="index">
            <h2 class="counter" :data-target="item.target">0</h2>
            <p>{{ item.label }}</p>
          </div>
        </div>
      </div>
      <div class="col second">
        <div class="image">
            <img src="/album_3.png" alt="">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

const counterData = [
  { target: 30000, label: 'exemplaren in Nederland verkocht' },
  { target: 14, label: 'Nummers' },
  { target: 45, label: 'minuten luisterplezier' },
]

onMounted(() => {
  const counters = document.querySelectorAll('.counter')

  const startCounting = (counter) => {
    const target = +counter.getAttribute('data-target')
    const count = +counter.innerText
    const increment = target / 200 // ⏩ snelheid

    const updateCount = () => {
      const current = +counter.innerText
      if (current < target) {
        counter.innerText = Math.ceil(current + increment)
        requestAnimationFrame(updateCount)
      } else {
        counter.innerText = target
      }
    }
    updateCount()
  }

  // ✅ Start animatie pas als de counters in beeld zijn
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          startCounting(counter)
          obs.unobserve(counter) // alleen één keer afspelen
        }
      })
    },
    { threshold: 0.3 } // 30% zichtbaar = trigger
  )

  counters.forEach((counter) => observer.observe(counter))
})
</script>

<style scoped>
.counters {
  background: #111;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.row {
  display: flex;
  flex-direction: row;
  max-width: 1240px;
  margin: auto;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.first        {flex: 1;}
.second       {flex: 2; display: flex; justify-content: flex-end;}

.counters * {
  color: #f1f1f1;
}

.counters-list { display: grid; gap: 2rem; flex: 1;}

.counter-item h2 {
  font-size: 3rem;
  margin: 0;
  border-bottom: solid .1rem rgb(255, 255, 255, .2);
  width: fit-content;
  line-height: 1; /* dichter op de tekst */
 margin-bottom: 1rem;
}

.counter-item p {
  margin: 0.5rem 0 0;
  font-size: 1.2rem;
}

.image { aspect-ratio: 1 / 1;  width: 75%; border-radius: .5rem; overflow: hidden;}
.image img {object-fit: cover; width: 100%; height: 100%;}
</style>