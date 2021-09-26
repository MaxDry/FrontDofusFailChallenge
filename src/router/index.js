import Vue from 'vue'
import VueRouter from 'vue-router'
import Players from '../components/Players.vue'
import Challenge from '../components/Challenge.vue'
import Dashboard from '../components/Dashboard.vue'
import PlayerChallenges from '../components/PlayerChallenges.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/players',
    name: 'Players',
    component: Players
  },
  {
    path: '/challenges',
    name: 'Challenge',
    component: Challenge
  },
  {
    path: '/player/:playerId/challenges',
    name: 'PlayerChallenges',
    component: PlayerChallenges
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
