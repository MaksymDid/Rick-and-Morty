<template>
  <div>
    <v-card
      class='ma-2'
      outlined
      :loading='loading'
    >
      <v-list-item three-line v-if='!loading'>
        <v-list-item-content>
          <div class='text-h6 mb-1'>
            {{ episodeItem.name }}
          </div>
          <div class='mb-2'>
            Episode: {{ episodeItem.episode }}
          </div>
          <div class='mb-2'>
            Air date: {{ episodeItem.air_date }}
          </div>
          <div class='mb-2'>
            Created: {{episodeItem.created}}
          </div>
          <h3 class='text-center'>Residents:</h3>
          <template v-if='charactersById.length'>
            <v-row ref='wrapper' @scroll='loadMore'>
              <v-col
                v-for='character in charactersById'
                :key='character.id'
              >
                <CharactersCard :character='character'/>
              </v-col>
            </v-row>
          </template>
          <template v-else>
            <CharactersCard :character='charactersById'/>
          </template>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
import CharactersCard from '@/components/CharactersCard'

export default {
  name: 'EpisodeItemPage',
  data () {
    return {
      loading: false,
      slice: 6
    }
  },
  components: {CharactersCard},
  computed: {
    ...mapState({
      episodeItem: state => state.episodeStore.episodeItem,
      charactersById: state => state.characterStore.charactersById
    }),
    ...mapGetters('episodeStore', ['charactersID'])
  },
  mounted() {
    document.addEventListener('scroll', this.loadMore)
  },
  beforeDestroy() {
    this.SET_CHARACTER_BY_IDS({})
    document.removeEventListener('scroll', this.loadMore)
  },
  watch: {
    '$route': {
      async handler() {
        this.loading = true
        await this.getEpisode(this.$route.params.id)
        await this.getCharactersByIds(this.charactersID.slice(0, this.slice).join(','))
        this.loading = false
      },
      deep: true,
      immediate: true
    },
    async slice() {
      await this.getCharactersByIds(this.charactersID.slice(0, this.slice).join(','))
    },
  },
  methods: {
    ...mapActions({
      getEpisode: 'episodeStore/getEpisode',
      getCharactersByIds: 'characterStore/getCharactersByIds'
    }),
    ...mapMutations({
      SET_CHARACTER_BY_IDS: 'characterStore/SET_CHARACTER_BY_IDS',
    }),
    loadMore() {
      if (this.$refs.wrapper.getBoundingClientRect().bottom < document.documentElement.clientHeight + 20) {
        this.slice += 6
      }
    }
  }



}
</script>

<style scoped>

</style>