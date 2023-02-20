import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/task',
    name: 'Task',
    component: () => import(/* webpackChunkName: "about" */ '../views/Task.vue')
  },
  {
    path: '/comment',
    name: 'Comment',
    component: () => import(/* webpackChunkName: "about" */ '../views/Comment.vue')
  },
  {
    path: '/abmTask/:taskId',
    name: 'ABM Task',
    component: () => import('../views/ABMTask.vue')
  },  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
