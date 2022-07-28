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
                <router-link class='link' :to="{ name: 'EpisodeItem', params: { id: episode.id } }">
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
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'EpisodesPage',
  computed: {
    ...mapState('episodeStore', ['episodes'])
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