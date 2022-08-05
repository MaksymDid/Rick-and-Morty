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
            Name: {{ locationItem.name }}
          </div>
          <div class='mb-2'>
            Type: {{ locationItem.type }}
          </div>
          <div class='mb-2'>
            Dimension: {{ locationItem.dimension }}
          </div>

          <div class='mb-2'>
            Created: {{ locationItem.created }}
          </div>
          <h3 class='text-center'>Residents:</h3>
          <template
            v-if='charactersById.length > 1'
          >
            <v-row ref='wrapper' @scroll='loadMore'>
              <v-col
                v-for='character in charactersById'
                :key='character.id'
              >
                <CharactersCard :character='character' />
              </v-col>
            </v-row>
          </template>
          <template v-else>
            <CharactersCard :character='charactersById' />
          </template>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import {mapActions, mapState, mapGetters, mapMutations} from 'vuex'
import CharactersCard from '@/components/CharactersCard'

export default {
  name: 'EpisodesPage',
  components: {CharactersCard},
  data() {
    return {
      loading: false,
      slice: 6
    }
  },
  computed: {
    ...mapState({
      locationItem: state => state.locationStore.locationItem,
      charactersById: state => state.characterStore.charactersById
    }),
    ...mapGetters('locationStore', ['charactersID'])
  },
  watch: {
    $route: {
      async handler() {
        this.loading = true
        await this.getLocation(this.$route.params.id)
        await this.getCharactersByIds(this.charactersID.slice(0, this.slice).join(','))
        this.loading = false
      },
      deep: true,
      immediate: true
    },
    async slice() {
      if (this.charactersID.length >= this.slice-6) {
        await this.getCharactersByIds(this.charactersID.slice(this.slice - 6, this.slice).join(','))
      }
    }
  },
  mounted() {
    document.addEventListener('scroll', this.loadMore)
  },
  beforeDestroy() {
    this.SET_LOCATION({})
    document.removeEventListener('scroll', this.loadMore)
    this.CLEAR_CHARACTER_BY_IDS([])
  },
  methods: {
    ...mapActions({
      getLocation: 'locationStore/getLocation',
      getCharactersByIds: 'characterStore/getCharactersByIds'
    }),
    ...mapMutations({
      SET_LOCATION: 'locationStore/SET_LOCATION',
      CLEAR_CHARACTER_BY_IDS: 'characterStore/CLEAR_CHARACTER_BY_IDS'
    }),
    loadMore() {
      if (this.$refs.wrapper.getBoundingClientRect().bottom < document.documentElement.clientHeight - 8) {
        this.slice += 6
      }
    }
  }
}
</script>

<style scoped>
</style>