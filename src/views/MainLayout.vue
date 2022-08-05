<template>
  <div>
    <v-navigation-drawer
      v-model='drawer'
      app
    >
      <SidebarMenu />
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click='drawer = !drawer'></v-app-bar-nav-icon>

      <v-toolbar-title class='ma-auto name'>{{ this.$route.path.slice(1) || namePage }}
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
import SidebarMenu from '@/components/SidebarMenu'

export default {
  name: 'MainLayout',
  components: {SidebarMenu},
  data() {
    return {
      drawer: null,
      namePage: 'The Rick and Morty API'
    }
  }
}
</script>

<style scoped>
.name {
  text-transform: capitalize;
}
</style>