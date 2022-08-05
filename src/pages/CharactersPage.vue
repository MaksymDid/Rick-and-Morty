<template>
  <div>
    <v-container class='wrap lighten-5 pa-4'>
      <CharactersList :loading='loading' />
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
import CharactersList from '@/components/CharactersList'

export default {
  name: 'ContentPage',
  components: {CharactersList},
  data() {
    return {
      page: 0,
      loading: false
    }
  },
  computed: {
    ...mapState({
      charactersPages: state => state.characterStore.charactersPages
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
      SET_CHARACTERS_PAGES: 'characterStore/SET_CHARACTERS_PAGES'
    })
  }
}
</script>

<style scoped>
</style>