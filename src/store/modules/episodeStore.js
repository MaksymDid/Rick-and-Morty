import HTTP from '../../../http-common'

const userStore = {
  namespaced: true,
  state: {
    episodes: [],
    episodeItem: {},
    episodesById: []
  },
  getters: {
    charactersID: ({episodeItem}) => {
      return episodeItem.characters.map(item => {
       return item.split('/').pop()
      }).join(',')
    }
  },
  mutations: {
    SET_EPISODES: (state, episodes) => state.episodes = episodes.results,
    SET_CLEAN_EPISODE: state => state.episodeItem = {},
    SET_EPISODE: (state, episode) => state.episodeItem = episode,
    SET_EPISODES_BY_IDS: (state, characters) => state.episodesById = characters
  },
  actions: {
    async getEpisodes ({commit}) {
      try {
        const res = await HTTP.get('episode', {
          params: {}
        })
        commit('SET_EPISODES', res.data)
        commit('SET_COUNT_INFO', {name: 'Episode', count: res.data.info.count}, {root:true})
      } catch (error) {
        console.log(error)
      }
    },
    async getEpisodeByIds({commit}, ids) {
      try {
        const res = await HTTP.get(`episode/${ids}`)
        commit('SET_EPISODES_BY_IDS', res.data)
      } catch (error) {
        console.log(error)
      }
    },
    async getEpisode ({commit}, id) {
      try {
        const res = await HTTP.get(`episode/${id}`)
        commit('SET_CLEAN_EPISODE')
        const location = {
          ...res.data,
          created: res.data.created.slice(0, 10)
        }
        commit('SET_EPISODE', location)
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export default userStore