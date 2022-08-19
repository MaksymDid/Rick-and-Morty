<template>
    <v-container class='wrap lighten-5 pa-4'>
      <v-row>
        <v-col
          cols='12'
          md='6'
          sm='12'
          class='pa-0'
          v-for='episode in episodes'
          :key='episode.id'
        >
          <v-skeleton-loader
            v-if='loading'
            max-width='500'
            min-width='420'
            type='card-heading, list-item-three-line'
          ></v-skeleton-loader>
          <EpisodesCard v-else :episode='episode' />
        </v-col>
      </v-row>
    <v-row justify='center'>
      <v-col cols='10'>
        <v-container class='max-width'>
          <v-pagination
            v-model='page'
            :total-visible='7'
            class='my-3'
            :length='this.episodesPages.pages'
          ></v-pagination>
        </v-container>
      </v-col>
    </v-row>
    </v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import EpisodesCard from '@/components/EpisodesCard'

export default {
  name: 'EpisodesPage',
  components: {EpisodesCard},
  data() {
    return {
      loading: false,
      page: 0
    }
  },
  computed: {
    ...mapState({
      episodes: s => s.episodeStore.episodes,
      episodesPages: s => s.episodeStore.episodesPages,
    })
  },
  created() {
    this.page = 1
  },
  watch: {
    page: {
      async handler() {
        this.loading = true
        await this.getEpisodes({page: this.page})
        this.loading = false
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('episodeStore', ['getEpisodes']),
  }
}
</script>

<style scoped>
.wrap {
  display: flex;
  flex-wrap: wrap;
}

</style>