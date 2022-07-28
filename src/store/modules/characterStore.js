import HTTP from '../../../http-common'

const userStore = {
  namespaced: true,
  state: {
    characters: [],
    characterItem: {},
    charactersById: []
  },
  getters: {
    episodesID: ({characterItem}) => {
      return characterItem.episode.map(item => {
        return item.split('/').pop()
      }).join(',')
    }
  },
  mutations: {
    SET_CHARACTERS: (state, characters) => state.characters = characters.results,
    SET_CLEAN_CHARACTER: state => state.characterItem = {},
    SET_CHARACTER: (state, character) => state.characterItem = character,
    SET_CLEAN_CHARACTER_BY_IDS: state => state.charactersById = [],
    SET_CHARACTER_BY_IDS: (state, characters) => state.charactersById = characters
  },
  actions: {
    async getCharacters({commit}, params = null) {
      try {
        const res = await HTTP.get('character', {
          params: params
          // params: {page : Math.floor(Math.random() * 41) + 1}
        })
        commit('SET_CHARACTERS', res.data)
        if (!params) {
          commit('SET_COUNT_INFO', {name: 'Characters', count: res.data.info.count}, {root: true})
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getCharactersByIds({commit}, ids) {
      try {
        const res = await HTTP.get(`character/${ids}`)
        commit('SET_CHARACTER_BY_IDS', res.data)
      } catch (error) {
        console.log(error)
      }
    },
    async getCharacter({commit}, id) {
      try {
        const res = await HTTP.get(`character/${id}`)
        const location = {
          ...res.data,
          created: res.data.created.slice(0, 10)
        }
        commit('SET_CHARACTER', location)
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export default userStore