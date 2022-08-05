import HTTP from '../../../http-common'
import router from '@/router'
import charactersList from '@/components/CharactersList'

const userStore = {
  namespaced: true,
  state: {
    characters: [],
    characterItem: {},
    charactersById: [],
    charactersPages: {},
    charactersLikes: []
  },
  getters: {
    episodesID: ({characterItem}) => {
      return characterItem.episode.map(item => {
        return item.split('/').pop()
      }).join(',')
    }
  },
  mutations: {
    SET_CHARACTERS: (state, characters) => {
      state.characters = characters
      state.characters.forEach(el => {
        el = el.isLiked = false
        if (state.charactersLikes.length) {
          state.charactersLikes.forEach(likedEl => (el.id === likedEl.id) && (el.isLiked = true))
        }
      })
    },
    SET_CHARACTER: (state, character) => state.characterItem = {...character, created: character.created.slice(0, 10)},
    SET_CHARACTER_BY_IDS: (state, characters) => {
      if (characters.length) {
        state.charactersById.push(...characters)
      } else {
        state.charactersById = characters
      }
    },
    CLEAR_CHARACTER_BY_IDS: (state, characters) => state.charactersById = characters,
    SET_CHARACTERS_PAGES: (state, pages) => state.charactersPages = pages,
    SET_CHARACTER_LIKE: (state, character) => {
      state.characters.forEach(el => (el.id === character.id) && (el.isLiked = true))
      state.charactersLikes.push(character)
    },
    REMOVE_LIKE: (state, id) => {
      state.characters.forEach(el => (el.id === id) && (el.isLiked = false))
      state.charactersLikes = state.charactersLikes.filter(item => item.id !== id)
    }
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

export default userStore