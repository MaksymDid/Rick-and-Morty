import HTTP from '../../../http-common'

export default {
  namespaced: true,
  state: {
    locations: [],
    locationItem: {},
    locationsPages: {},
    likedLocations: []
  },
  getters: {
    charactersID: ({locationItem}) => {
      return locationItem.residents.map(item => {
        return item.split('/').pop()
      })
    }
  },
  mutations: {
    SET_LOCATIONS: (state, locations) => {
      state.locations = locations
      state.locations.forEach(el => el.isLiked = false)
      if (state.likedLocations.length) state.locations.forEach(el => {
        state.likedLocations.forEach(like => (el.id === like.id) && (el.isLiked = like.isLiked))
      })
    },
    SET_LOCATION: (state, location) => {
      state.locationItem = {...location, isLiked: false}
      state.likedLocations.find( item => item.id === location?.id ) && (state.locationItem.isLiked = true)
    },
    SET_LOCATIONS_PAGES: (state, pages) => state.locationsPages = pages,
    SET_LOCATIONS_LIKE: (state, location) => {
      state.locations.forEach(el => {
        if (el.id === location.id){
          (el.isLiked = true)
        }
      })
      if (Object.keys(state.locationItem)?.length) {
        state.locationItem.isLiked = true
      }
      state.likedLocations.push(location)
    },
    REMOVE_LOCATION_LIKE: (state, id) => {
      state.locations.forEach(el => {
        if (el.id === id) {
          (el.isLiked = false)
        }
      })
      if (Object.keys(state.locationItem)?.length) {
        state.locationItem.isLiked = false
      }
      state.likedLocations = state.likedLocations.filter(item => item.id !== id)
    }
  },
  actions: {
    async getLocations({commit}, params = null) {
      try {
        const res = await HTTP.get('location', {
          params: params
        })
        commit('SET_LOCATIONS', res.data.results)
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
