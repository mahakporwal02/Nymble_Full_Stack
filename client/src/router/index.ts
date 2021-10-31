import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Details from '../components/Details.vue'
import HomePage from '../components/HomePage.vue'


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/:id',
    name: 'Details',
    component: Details
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
