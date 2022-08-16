import Vue from 'vue'
import VueRouter from 'vue-router'

const AuthLayout = () => import(/* webpackChunkName: "auth-layout" */ '../views/AuthLayout')
const LoginPage = () => import(/* webpackChunkName: "login-page" */ '@/pages/LoginPage')
const RegistrationPage = () => import(/* webpackChunkName: "registration-page" */ '@/pages/RegistrationPage')

const MainLayout = () => import(/* webpackChunkName: "main-layout" */ '@/views/MainLayout')
const OverviewPage = () => import(/* webpackChunkName: "overview-page" */ '@/pages/OverviewPage')
const CharactersPage = () => import(/* webpackChunkName: "characters-page" */ '@/pages/CharactersPage.vue')
const CharacterItemPage = () => import(/* webpackChunkName: "character-item-page" */ '@/pages/CharacterItemPage')
const LocationsPage = () => import(/* webpackChunkName: "locations-page" */ '@/pages/LocationsPage')
const LocationItemPage = () => import(/* webpackChunkName: "location-item-page" */ '@/pages/LocationItemPage')
const EpisodesPage = () => import(/* webpackChunkName: "episodes-page" */ '@/pages/EpisodesPage')
const EpisodeItemPage = () => import(/* webpackChunkName: "episode-item-page" */ '@/pages/EpisodeItemPage')
const ProfilePage = () => import(/* webpackChunkName: "profile-page" */ '@/pages/ProfilePage')
import store from '@/store'

Vue.use(VueRouter)

// const ifAuthenticated = (to, from, next) => {
//   store.getters['authStore/isLogged']
//     ? next()
//     : next({name: 'LoginPage'})
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
        meta: {
          hideForAuth: true
        }
      },
      {
        path: 'registration',
        name: 'RegistrationPage',
        component: RegistrationPage,
        meta: {
          hideForAuth: true
        }
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
        component: CharactersPage,
        meta: {
          authRequired: true
        }
      },
      {
        path: 'characters/:id',
        name: 'CharacterItemPage',
        component: CharacterItemPage,
        meta: {
          authRequired: true
        }
      },
      {
        path: 'locations',
        name: 'LocationsPage',
        component: LocationsPage,
        meta: {
          authRequired: true
        }
      },
      {
        path: 'locations/:id',
        name: 'LocationItemPage',
        component: LocationItemPage,
        meta: {
          authRequired: true
        }
      },
      {
        path: 'episodes',
        name: 'EpisodesPage',
        component: EpisodesPage,
        meta: {
          authRequired: true
        }
      },
      {
        path: 'episodes/:id',
        name: 'EpisodeItemPage',
        component: EpisodeItemPage,
        meta: {
          authRequired: true
        }
      },
      {
        path: '/profile',
        name: 'ProfilePage',
        component: ProfilePage,
        meta: {
          authRequired: true
        }
      }
    ]
  },
  {
    path: '/*',
    redirect: {name: 'OverviewPage'}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((routeTo, routeFrom, next) => {
  // Check if auth is required on this route
  // (including nested routes).
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired)
  const hideForAuth = routeTo.matched.some((route) => route.meta.hideForAuth)
  
  // If auth isn't required for the route, just continue.
  if (!authRequired) next()
  
  // If auth is required and the user is NOT currently logged in...
  if (!store.getters['authStore/isLogged'] && authRequired) {
    next({ name: 'LoginPage' })
  }
  
  if (store.getters['authStore/isLogged'] && hideForAuth) {
    next({ name: 'OverviewPage' })
  }
  
  next()
})

export default router
