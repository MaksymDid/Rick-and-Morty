import HTTP from '../../../http-common'
import router from '@/router'
import loginPage from '@/pages/LoginPage'

export default {
  namespaced: true,
  state: {
    characters: [],
    characterItem: {},
    charactersPages: {},
    charactersCount: '',
    likedCharacters: [],
  },
  getters: {
    episodesID: ({characterItem}) => {
      return characterItem.episode.map(item => {
        return item.split('/').pop()
      })
    }
  },
  mutations: {
    SET_CHARACTERS: (state, characters) => {
      state.characters = characters
      state.characters.forEach(el => el.isLiked = false)
      if (state.likedCharacters.length) state.characters.forEach(el => {
        state.likedCharacters.forEach(like => (el.id === like.id) && (el.isLiked = like.isLiked))
      })
    },
    SET_CHARACTER: (state, character) => {
      character?.id
        ? state.characterItem = {...character, created: character.created.slice(0, 10), isLiked: false}
        : state.characterItem = {}
      state.likedCharacters.find(item => item.id === character?.id) && (state.characterItem.isLiked = true)
    },
    SET_CHARACTER_BY_IDS: (state, characters) => {
      if (state.characters.length && Array.isArray(characters)) {
        state.characters.push(...characters)
        state.characters.forEach(el => el.isLiked = false)
        if (state.likedCharacters.length) state.characters.forEach(el => {
          state.likedCharacters.forEach(like => (el.id === like.id) && (el.isLiked = like.isLiked))
        })
      } else if (state.characters.length && !Array.isArray(characters)) {
        state.characters.push(characters)
        state.characters.forEach(el => el.isLiked = false)
        if (state.likedCharacters.length) state.characters.forEach(el => {
          state.likedCharacters.forEach(like => (el.id === like.id) && (el.isLiked = like.isLiked))
        })
      } else if (!state.characters.length && !Array.isArray(characters)) {
        state.characters = [characters]
        state.characters.forEach(el => el.isLiked = false)
        if (state.likedCharacters.length) state.characters.forEach(el => {
          state.likedCharacters.forEach(like => (el.id === like.id) && (el.isLiked = like.isLiked))
        })
      } else state.characters = characters
      state.characters.forEach(el => el.isLiked = false)
      if (state.likedCharacters.length) state.characters.forEach(el => {
        state.likedCharacters.forEach(like => (el.id === like.id) && (el.isLiked = like.isLiked))
      })
    },
    CLEAR_CHARACTER_BY_IDS: state => state.characters = [],
    SET_CHARACTERS_PAGES: (state, pages) => state.charactersPages = pages,
    SET_CHARACTERS_COUNT: (state, count) => state.charactersCount = count,
    SET_CHARACTER_LIKE: (state, character) => {
      state.characters.forEach(el => {
        if (el.id === character.id) {
          (el.isLiked = true)
        }
      })
      if (Object.keys(state.characterItem)?.length) {
        state.characterItem.isLiked = true
      }
      state.likedCharacters.push(character)
    },
    REMOVE_CHARACTER_LIKE: (state, id) => {
      state.characters.forEach(el => {
        if (el.id === id) {
          (el.isLiked = false)
        }
      })
      if (Object.keys(state.characterItem)?.length) {
        state.characterItem.isLiked = false
      }
      state.likedCharacters = state.likedCharacters.filter(item => item.id !== id)
    },
    CLEAR_CHARACTER_LIKE: state => state.likedCharacters = [],
  },
  actions: {
    async getCharacters({commit}, params = null) {
      try {
        const res = await HTTP.get('character', {
          params: params
        })
        commit('SET_CHARACTERS', res.data.results)
        if (!params) {
          commit('SET_COUNT_INFO', {name: 'Characters', count: res.data.info.count}, {root: true})
          commit('SET_CHARACTERS_PAGES', {pages: res.data.info.pages})
          commit('SET_CHARACTERS_COUNT', res.data.info.count)
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
    async getRandomCharacters({state, commit}) {
      try {
        commit('SET_CHARACTERS', [])
        let randomTenCharacters = []
        for (let i = 0; i < 10; i++) {
          let character = Math.floor(Math.random() * state.charactersCount) + 1
          randomTenCharacters.push(character)
        }
        randomTenCharacters = randomTenCharacters.toString()
        const res = await HTTP.get(`character/${randomTenCharacters}`)
        commit('SET_CHARACTERS', res.data)
      } catch (e) {
        console.log(e)
      }
    },
    async getCharacter({commit}, id) {
      try {
        commit('SET_CHARACTER', {})
        const res = await HTTP.get(`character/${id}`)
        commit('SET_CHARACTER', res.data)
      } catch (error) {
        await router.replace({name: 'CharactersPage'})
        console.log(error)
      }
    }
  }
}
