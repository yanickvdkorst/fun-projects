// composables/useScrollRefresh.js
import { onMounted } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useScrollRefresh() {
  onMounted(() => {
    ScrollTrigger.refresh()
  })
}
