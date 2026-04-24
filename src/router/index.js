// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Help from '../views/Help.vue'

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/about', component: About, name: 'About' },
  { path: '/help', component: Help, name: 'Help' },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
