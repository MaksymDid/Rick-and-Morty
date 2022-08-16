<template>
  <div>
    <v-card
      class='ma-2'
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
            <v-row ref='wrapper' @scroll='loadMore'>
              <v-col
                cols='12'
                md='6'
                sm='12'
                v-for='character in characters'
                :key='character.id'
              >
                <CharactersCard :character='character'/>
              </v-col>
            </v-row>
        </v-list-item-content>
      </v-list-item>
      <LikeButton :btn-active='btnActive' :on-click='onClick' />
    </v-card>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
import CharactersCard from '@/components/CharactersCard'
import LikeButton from '@/components/LikeButton'

export default {
  name: 'EpisodeItemPage',
  components: {CharactersCard, LikeButton},
  data () {
    return {
      loading: false,
      slice: 6,
      btnActive: false
    }
  },
  computed: {
    ...mapState({
      episodeItem: s => s.episodeStore.episodeItem,
      characters: s => s.characterStore.characters,
      likedEpisodes: s => s.episodeStore.likedEpisodes
    }),
    ...mapGetters('episodeStore', ['charactersID'])
  },
  mounted() {
    document.addEventListener('scroll', this.loadMore)
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.loadMore)
  },
  watch: {
    '$route': {
      async handler() {
        this.loading = true
        await this.getEpisode(this.$route.params.id)
        this.CLEAR_CHARACTER_BY_IDS({})
        await this.getCharactersByIds(this.charactersID.slice(0, this.slice).join(','))
        this.btnActive = this.episodeItem.isLiked
        this.loading = false
      },
      deep: true,
      immediate: true
    },
    async slice() {
      if (this.charactersID.length > this.slice-6) {
        await this.getCharactersByIds(this.charactersID.slice(this.slice - 6, this.slice).join(','))
      }
    },
    likedEpisodes: {
      handler() {
        this.btnActive = this.episodeItem.isLiked
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      getEpisode: 'episodeStore/getEpisode',
      getCharactersByIds: 'characterStore/getCharactersByIds'
    }),
    ...mapMutations({
      CLEAR_CHARACTER_BY_IDS: 'characterStore/CLEAR_CHARACTER_BY_IDS',
      SET_EPISODES_LIKE: 'episodeStore/SET_EPISODES_LIKE',
      REMOVE_EPISODE_LIKE: 'episodeStore/REMOVE_EPISODE_LIKE'
    }),
    loadMore() {
      if (this.$refs.wrapper.getBoundingClientRect().bottom < document.documentElement.clientHeight + 10) {
        this.slice += 6
      }
    },
    onClick() {
      this.episodeItem.isLiked ? this.REMOVE_EPISODE_LIKE(this.episodeItem.id) : this.SET_EPISODES_LIKE(this.episodeItem)
    }
  }



}
</script>

<style scoped>

</style>