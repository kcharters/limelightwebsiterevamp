import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContentView from '../views/ContentView.vue'
import BlogView from '../views/BlogView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/content',
      name: 'content',
      component: ContentView
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView
    },
    {
      path: '/blog/:slug',
      name: 'BlogPost',
      component: () => import('@/views/BlogPost.vue'),
    }

  ]
})

export default router
