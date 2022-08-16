<template>
  <div>
    <v-container class='wrap lighten-5 pa-4'>
      <v-row>
        <template v-if='loading'>
          <v-col
            cols='12'
            md='6'
            sm='12'
            v-for='n in 10'
            class='pa-0'
          >
            <v-skeleton-loader
              type='list-item-avatar, card-heading, list-item-three-line'
            ></v-skeleton-loader>
          </v-col>
        </template>
        <template v-else>
          <v-col
            cols='12'
            md='6'
            sm='12'
            v-for='character in characters'
            :key='character.id'
            class='pa-0'
          >
            <CharactersCard
              :character='character'
            />
          </v-col>
        </template>
      </v-row>
      <v-row justify='center' v-if='!loading'>
        <v-col cols='8'>
          <v-container class='max-width'>
            <v-pagination
              v-model='page'
              class='my-3'
              :length='charactersPages.pages'
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'
import CharactersCard from '@/components/CharactersCard'

export default {
  name: 'ContentPage',
  components: {CharactersCard},
  data() {
    return {
      page: 0,
      loading: false
    }
  },
  beforeDestroy() {
    this.SET_CHARACTERS([])
  },
  computed: {
    ...mapState({
      characters: s => s.characterStore.characters,
      charactersPages: s => s.characterStore.charactersPages
    })
  },
  watch: {
    page: {
      async handler() {
        this.loading = true
        await this.getCharacters({page: this.page})
        this.loading = false
      },
      deep: true
    }
  },
  created() {
    this.page = 1
  },
  methods: {
    ...mapActions('characterStore', ['getCharacters']),
    ...mapMutations({
      SET_CHARACTERS: 'characterStore/SET_CHARACTERS',
      SET_CHARACTERS_PAGES: 'characterStore/SET_CHARACTERS_PAGES'
    })
  }
}
</script>

<style scoped>
</style>