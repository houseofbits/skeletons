import { createRouter, createWebHistory } from 'vue-router'
import Screen1 from '../views/Screen1.vue'
import Screen2 from '../views/Screen2.vue'
import Screen3 from '../views/Screen3.vue'

const routes = [
  {
    path: '/screen1',
    name: 'screen-1',
    component: Screen1,
  },
  {
    path: '/screen2',
    name: 'screen-2',
    component: Screen2,
  },
    {
    path: '/screen3',
    name: 'screen-3',
    component: Screen3,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router