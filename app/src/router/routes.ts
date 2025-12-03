import { createRouter, createWebHistory } from 'vue-router'
import Screen1 from '@src/views/Screen1.vue'
import Screen2 from '@src/views/Screen2.vue'
import Screen3 from '@src/views/Screen3.vue'
import AnimationTest from '@src/views/AnimationTest.vue'

const routes = [
  {
    path: '/',
    name: 'default',
    component: Screen1,
  },  
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
  {
    path: '/animation',
    name: 'animation',
    component: AnimationTest,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router