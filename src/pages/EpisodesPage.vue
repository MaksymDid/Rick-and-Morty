<template>
  <div>
    <v-container class='wrap lighten-5 pa-4'>
      <v-row>
        <v-col
          v-for='episode in episodes'
          :key='episode.id'
        >
          <v-card
            max-width='500'
            min-width='400'
            class='ma-5 item'
            outlined
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
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-row justify='center'>
      <v-col cols='8'>
        <v-container class='max-width'>
          <v-pagination
            v-model='page'
            class='my-3'
            :length='this.episodesPages.pages'
          ></v-pagination>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'EpisodesPage',
  data() {
    return {
      page: 0
    }
  },
  computed: {
    ...mapState({
      episodes: state => state.episodeStore.episodes,
      episodesPages: state => state.episodeStore.episodesPages,
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
    ...mapActions({
      getEpisodes: 'episodeStore/getEpisodes'
    })
  }
}
</script>

<style scoped>
.wrap {
  display: flex;
  flex-wrap: wrap;
}

.item {
  width: 100%;
}
</style>