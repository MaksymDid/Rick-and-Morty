<template>
  <v-app id='inspire'>
    <v-navigation-drawer
      v-model='drawer'
      app
    >
      <SidebarMenu/>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click='drawer = !drawer'></v-app-bar-nav-icon>

      <v-toolbar-title class='ma-auto name'>{{this.$route.path.slice(1) || namePage }}
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import SidebarMenu from '@/components/SidebarMenu'
import {mapActions} from 'vuex'

export default {
  components: {SidebarMenu},
  data: () => ({
    drawer: null,
    namePage: "The Rick and Morty API",
  }),
  async created() {
    await this.getCharacters()
    await this.getLocations();
    await this.getEpisodes();
  },
  methods: {
    ...mapActions({
      getCharacters: 'characterStore/getCharacters',
      getLocations: 'locationStore/getLocations',
      getEpisodes: 'episodeStore/getEpisodes',
    })
  }
}
</script>

<style scoped>
.name {
  text-transform: capitalize;
}
</style>

