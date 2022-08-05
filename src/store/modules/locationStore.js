import HTTP from '../../../http-common'

const userStore = {
  namespaced: true,
  state: {
    locations: [],
    locationItem: {},
    locationsPages: {}
  },
  getters: {
    charactersID: ({locationItem}) => {
      return locationItem.residents.map(item => {
        return item.split('/').pop()
      })
    }
  },
  mutations: {
    SET_LOCATIONS: (state, locations) => state.locations = locations.results,
    SET_LOCATION: (state, location) => state.locationItem = location,
    SET_LOCATIONS_PAGES: (state, pages) => state.locationsPages = pages,
  },
  actions: {
    async getLocations({commit}, params = null) {
      try {
        const res = await HTTP.get('location', {
          params: params
        })
        commit('SET_LOCATIONS', res.data)
        if (!params) {
          commit('SET_LOCATIONS_PAGES', {pages: res.data.info.pages})
          commit('SET_COUNT_INFO', {name: 'Location', count: res.data.info.count}, {root: true})
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getLocation({commit}, id) {
      try {
        const res = await HTTP.get(`location/${id}`)
        const location = {
          ...res.data,
          created: res.data.created.slice(0, 10)
        }
        commit('SET_LOCATION', location)
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export default userStore