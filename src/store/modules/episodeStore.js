import HTTP from '../../../http-common'

export default {
  namespaced: true,
  state: {
    episodes: [],
    episodeItem: {},
    episodesById: [],
    episodesPages: {},
    likedEpisodes: []
  },
  getters: {
    charactersID: ({episodeItem}) => {
      return episodeItem.characters.map(item => {
        return item.split('/').pop()
      })
    }
  },
  mutations: {
    SET_EPISODES: (state, episodes) => {
      state.episodes = episodes
      state.episodes.forEach(el => el.isLiked = false)
      if (state.likedEpisodes.length) state.episodes.forEach(el => {
        state.likedEpisodes.forEach(like => (el.id === like.id) && (el.isLiked = like.isLiked))
      })
    },
    SET_CLEAN_EPISODE: state => state.episodeItem = {},
    SET_EPISODE: (state, episode) => {
      state.episodeItem = {...episode, isLiked: false}
      state.likedEpisodes.find( item => item.id === episode?.id ) && (state.episodeItem.isLiked = true)
    },
    SET_EPISODES_BY_IDS: (state, characters) => state.episodesById = characters,
    SET_EPISODES_PAGES: (state, pages) => state.episodesPages = pages,
    SET_EPISODES_LIKE: (state, episode) => {
      state.episodes.forEach(el => {
        if (el.id === episode.id){
          (el.isLiked = true)
        }
      })
      if (Object.keys(state.episodeItem)?.length) {
        state.episodeItem.isLiked = true
      }
      state.likedEpisodes.push(episode)
    },
    REMOVE_EPISODE_LIKE: (state, id) => {
      state.episodes.forEach(el => {
        if (el.id === id) {
          (el.isLiked = false)
        }
      })
      if (Object.keys(state.episodeItem)?.length) {
        state.episodeItem.isLiked = false
      }
      state.likedEpisodes = state.likedEpisodes.filter(item => item.id !== id)
    }
  },
  actions: {
    async getEpisodes({commit}, params = null) {
      try {
        const res = await HTTP.get('episode', {
          params: params
        })
        commit('SET_EPISODES', res.data.results)
        if (!params) {
          commit('SET_COUNT_INFO', {name: 'Episode', count: res.data.info.count}, {root: true})
          commit('SET_EPISODES_PAGES', {pages: res.data.info.pages})
        }
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
    async getEpisode({commit}, id) {
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