import Vue from 'vue'
import Vuex from 'vuex'
import characterStore from './modules/characterStore'
import locationStore from '@/store/modules/locationStore'
import episodeStore from '@/store/modules/episodeStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allCountInfo: []
  },
  getters: {},
  mutations: {
    SET_COUNT_INFO: (state, info) => state.allCountInfo.push({
      name: info.name,
      count: info.count
    }),
  },
  actions: {},
  modules: {
    characterStore,
    locationStore,
    episodeStore
  }
})
