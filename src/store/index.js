import Vue from 'vue'
import Vuex from 'vuex'
import {createVuexPersistedState} from 'vue-persistedstate'

import characterStore from '@/store/modules/characterStore'
import locationStore from '@/store/modules/locationStore'
import episodeStore from '@/store/modules/episodeStore'
import authStore from '@/store/modules/authStore'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createVuexPersistedState({
      key: 'RickAndMorty',
      storage: window.localStorage
    })
  ],
  state: {
    allCountInfo: []
  },
  getters: {},
  mutations: {
    SET_COUNT_INFO: (state, info) =>{
      if (state.allCountInfo.length < 3){
        state.allCountInfo.push({
          name: info.name,
          count: info.count
        })
      }
    }
  },
  actions: {},
  modules: {
    characterStore,
    locationStore,
    episodeStore,
    authStore
  }
})
