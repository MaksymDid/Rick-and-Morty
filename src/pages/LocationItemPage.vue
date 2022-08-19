<template>
  <div>
    <v-card
      class='ma-2 my-5 ma-sm-5 pa-0 pa-sm-3'
    >
        <v-list-item-content v-if='!loading'>
          <div class='text-h6 mb-3'>
            Name: {{ locationItem.name }}
          </div>
          <div class='mb-4'>
            Type: {{ locationItem.type }}
          </div>
          <div class='mb-4'>
            Dimension: {{ locationItem.dimension }}
          </div>

          <div class='mb-4'>
            Created: {{ locationItem.created }}
          </div>
          <h3 class='text-center py-4 py-sm-2'>Residents:</h3>
          <v-row ref='wrapper' @scroll='loadMore'>
            <v-col
              cols='12'
              md='6'
              sm='12'
              v-for='character in characters'
              :key='character.id'
              class='pa-0'
            >
              <CharactersCard :character='character' />
            </v-col>
          </v-row>
        </v-list-item-content>
      <LikeButton :btn-active='btnActive' :on-click='onClick' />
    </v-card>
  </div>
</template>

<script>
import {mapActions, mapState, mapGetters, mapMutations} from 'vuex'
import CharactersCard from '@/components/CharactersCard'
import LikeButton from '@/components/LikeButton'

export default {
  name: 'EpisodesPage',
  components: {CharactersCard, LikeButton},
  data() {
    return {
      loading: false,
      slice: 6,
      btnActive: false
    }
  },
  computed: {
    ...mapState({
      locationItem: s => s.locationStore.locationItem,
      characters: s => s.characterStore.characters,
      likedLocations: s => s.locationStore.likedLocations
    }),
    ...mapGetters('locationStore', ['charactersID'])
  },
  watch: {
    $route: {
      async handler() {
        this.loading = true
        await this.getLocation(this.$route.params.id)
        this.CLEAR_CHARACTER_BY_IDS()
        await this.getCharactersByIds(this.charactersID.slice(0, this.slice).join(','))
        this.btnActive = this.locationItem.isLiked
        this.loading = false
      },
      deep: true,
      immediate: true
    },
    async slice() {
      if (this.charactersID.length > this.slice - 6) {
        await this.getCharactersByIds(this.charactersID.slice(this.slice - 6, this.slice).join(','))
      }
    },
    likedLocations: {
      handler() {
        this.btnActive = this.locationItem.isLiked
      },
      deep: true
    }
  },
  mounted() {
    document.addEventListener('scroll', this.loadMore)
  },
  beforeDestroy() {
    this.SET_LOCATION({})
    document.removeEventListener('scroll', this.loadMore)
  },
  methods: {
    ...mapActions({
      getLocation: 'locationStore/getLocation',
      getCharactersByIds: 'characterStore/getCharactersByIds'
    }),
    ...mapMutations({
      SET_LOCATION: 'locationStore/SET_LOCATION',
      CLEAR_CHARACTER_BY_IDS: 'characterStore/CLEAR_CHARACTER_BY_IDS',
      SET_LOCATIONS_LIKE: 'locationStore/SET_LOCATIONS_LIKE',
      REMOVE_LOCATION_LIKE: 'locationStore/REMOVE_LOCATION_LIKE'
    }),
    loadMore() {
      if (this.$refs.wrapper.getBoundingClientRect().bottom < document.documentElement.clientHeight + 10) {
        this.slice += 6
      }
    },
    onClick() {
      this.locationItem.isLiked ? this.REMOVE_LOCATION_LIKE(this.locationItem.id) : this.SET_LOCATIONS_LIKE(this.locationItem)
    }
  }
}
</script>

<style scoped>
.btn-like {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>