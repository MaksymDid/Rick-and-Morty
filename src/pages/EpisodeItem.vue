<template>
  <div>
    <v-card
      class='ma-2'
      outlined
    >
      <v-list-item three-line>
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
            <v-row>
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
  name: 'EpisodeItem',
  components: {CharactersCard},
  computed: {
    ...mapState({
      episodeItem: state => state.episodeStore.episodeItem,
      charactersById: state => state.characterStore.charactersById
    }),
    ...mapGetters('episodeStore', ['charactersID'])
  },
  created() {
    this.SET_CLEAN_CHARACTER_BY_IDS()
  },
  watch: {
    '$route': {
      async handler() {
        await this.getEpisode(this.$route.params.id)
        await this.getCharactersByIds(this.charactersID)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      getEpisode: 'episodeStore/getEpisode',
      getCharactersByIds: 'characterStore/getCharactersByIds'
    }),
    ...mapMutations({
      SET_CLEAN_CHARACTER_BY_IDS: 'characterStore/SET_CHARACTER_BY_IDS',
    })
  }



}
</script>

<style scoped>

</style>