<template>
  <v-app >
    <router-view />
  </v-app>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  async created() {
    await this.getCharacters()
    await this.getLocations()
    await this.getEpisodes()
  },
  methods: {
    ...mapActions({
      getCharacters: 'characterStore/getCharacters',
      getLocations: 'locationStore/getLocations',
      getEpisodes: 'episodeStore/getEpisodes'
    })
  }
}
</script>

<style scoped>

</style>

