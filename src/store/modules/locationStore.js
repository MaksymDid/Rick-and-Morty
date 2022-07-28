import HTTP from '../../../http-common'

const userStore = {
  namespaced: true,
  state: {
    locations: [],
    locationItem: {},
  },
  getters: {
    charactersID: ({locationItem}) => {
      return locationItem.residents.map(item => {
        return item.split('/').pop()
      }).join(',')
    }
  },
  mutations: {
    SET_LOCATIONS: (state, locations) => state.locations = locations.results,
    SET_CLEAN_LOCATION: state => state.locationItem = {},
    SET_LOCATION: (state, location) => state.locationItem = location,
  },
  actions: {
    async getLocations({commit}) {
      try {
        const res = await HTTP.get('location', {
          params: {}
        })
        commit('SET_LOCATIONS', res.data)
        commit('SET_COUNT_INFO', {name: 'Location', count: res.data.info.count}, {root:true})
      } catch (error) {
        console.log(error)
      }
    },
    async getLocation({commit}, id) {
      try {
        const res = await HTTP.get(`location/${id}`)
        commit('SET_CLEAN_LOCATION')
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