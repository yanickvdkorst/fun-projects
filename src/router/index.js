import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/homepage.vue'
import Jannes from '../pages/jannes.vue'
import Video from '../pages/video.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/jannes', component: Jannes },
  { path: '/video', component: Video },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router