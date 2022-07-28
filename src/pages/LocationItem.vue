<template>
  <div>
    <v-card
      class='ma-2'
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class='text-h6 mb-1'>
            Name: {{ locationItem.name }}
          </div>
          <div class='mb-2'>
            Type: {{ locationItem.type }}
          </div>
          <div class='mb-2'>
            Dimension: {{ locationItem.dimension }}
          </div>

          <div class='mb-2'>
            Created: {{ locationItem.created}}
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
import {mapActions, mapState, mapGetters} from 'vuex'
import CharactersCard from '@/components/CharactersCard'

export default {
  name: 'EpisodesPage',
  components: {CharactersCard},
  computed: {
    ...mapState({
      locationItem: state => state.locationStore.locationItem,
      charactersById: state => state.characterStore.charactersById
    }),
    ...mapGetters('locationStore', ['charactersID'])
  },
  created() {
    this.SET_CLEAN_CHARACTER_BY_IDS()
  },
  watch: {
    '$route': {
      async handler() {
        await this.getLocation(this.$route.params.id)
        await this.getCharactersByIds(this.charactersID)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      getLocation: 'locationStore/getLocation',
      getCharactersByIds: 'characterStore/getCharactersByIds'
    })
  }
}
</script>

<style scoped>

</style>