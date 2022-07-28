import Vue from 'vue'
import VueRouter from 'vue-router'

import OverviewPage from '@/pages/OverviewPage'
import CharactersPage from '@/pages/CharactersPage.vue'
import CharacterItem from '@/pages/CharacterItem'
import LocationsPage from '@/pages/LocationsPage'
import LocationItem from '@/pages/LocationItem'
import EpisodesPage from '@/pages/EpisodesPage'
import EpisodeItem from '@/pages/EpisodeItem'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'OverviewPage',
    component: OverviewPage
  },
  {
    path: '/characters',
    name: 'CharactersPage',
    component: CharactersPage
  },
  {
    path: '/character/:id',
    name: 'CharacterItem',
    component: CharacterItem
  },
  {
    path: '/locations',
    name: 'LocationsPage',
    component: LocationsPage
  },
  {
    path: '/locations/:id',
    name: 'LocationItem',
    component: LocationItem
  },
  {
    path: '/episodes',
    name: 'EpisodesPage',
    component: EpisodesPage
  },
  {
    path: '/episode/:id',
    name: 'EpisodeItem',
    component: EpisodeItem
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
