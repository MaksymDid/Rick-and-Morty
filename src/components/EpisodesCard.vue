<template>
  <v-card
    class='ma-2 my-5 ma-sm-5 pa-1 pa-sm-3'
  >
    <v-list-item three-line>
      <v-list-item-content>
        <router-link class='link' :to="{ name: 'EpisodeItemPage', params: { id: episode.id } }">
          <div class='text-h6 mb-1'>
            {{ episode.name }}
          </div>
        </router-link>
        <div class='mb-2'>
          Episode: {{ episode.episode }}
        </div>
        <div class='mb-2'>
          Air date: {{ episode.air_date }}
        </div>
      </v-list-item-content>
    </v-list-item>
    <LikeButton :btn-active='btnActive' :on-click='onClick' />
  </v-card>
</template>
<script>
import {mapMutations, mapState} from 'vuex'
import LikeButton from '@/components/LikeButton'

export default {
  name: 'EpisodesCard',
  components: {LikeButton},
  data() {
    return {
      btnActive: this.episode.isLiked
    }
  },
  props: {
    episode: {}
  },
  computed: mapState('episodeStore', ['likedEpisodes']),
  watch: {
    likedEpisodes: {
      handler() {
        this.btnActive = this.episode.isLiked
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations({
      SET_EPISODES_LIKE: 'episodeStore/SET_EPISODES_LIKE',
      REMOVE_EPISODE_LIKE: 'episodeStore/REMOVE_EPISODE_LIKE'
    }),
    onClick() {
      this.episode.isLiked ? this.REMOVE_EPISODE_LIKE(this.episode.id) : this.SET_EPISODES_LIKE(this.episode)
    }
  }
}
</script>
<style scoped>
</style>