import Vue from 'vue'
import VueRouter from 'vue-router'

import AuthLayout from '@/views/AuthLayout'
import LoginPage from '@/pages/LoginPage'
import RegistrationPage from '@/pages/RegistrationPage'

import MainLayout from '@/views/MainLayout'
import OverviewPage from '@/pages/OverviewPage'
import CharactersPage from '@/pages/CharactersPage.vue'
import CharacterItemPage from '@/pages/CharacterItemPage'
import LocationsPage from '@/pages/LocationsPage'
import LocationItemPage from '@/pages/LocationItemPage'
import EpisodesPage from '@/pages/EpisodesPage'
import EpisodeItemPage from '@/pages/EpisodeItemPage'
// import store from '@/store'


Vue.use(VueRouter)

// const checkRoute = async (to, from, next) => {
//   if (!from.name) {
//     await store.dispatch('characterStore/getCharacter', to.params.id)
//     await store.dispatch('episodeStore/getEpisodeByIds', store.getters['characterStore/episodesID'])
//   }
//   next()
// }

const routes = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'LoginPage',
        component: LoginPage,
      },
      {
        path: 'registration',
        name: 'RegistrationPage',
        component: RegistrationPage,
      }
    ]
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '/',
        name: 'OverviewPage',
        component: OverviewPage
      },
      {
        path: 'characters',
        name: 'CharactersPage',
        component: CharactersPage
      },
      {
        path: 'characters/:id',
        name: 'CharacterItemPage',
        component: CharacterItemPage,
        // beforeEnter: checkRoute
      },
      {
        path: 'locations',
        name: 'LocationsPage',
        component: LocationsPage
      },
      {
        path: 'locations/:id',
        name: 'LocationItemPage',
        component: LocationItemPage
      },
      {
        path: 'episodes',
        name: 'EpisodesPage',
        component: EpisodesPage
      },
      {
        path: 'episodes/:id',
        name: 'EpisodeItemPage',
        component: EpisodeItemPage
      }
    ]
  },
  {
    path: '/*',
    redirect: {name: 'OverviewPage'}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
