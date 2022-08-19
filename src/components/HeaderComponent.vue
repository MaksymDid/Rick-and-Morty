<template>
  <v-app-bar app>
    <v-app-bar-nav-icon
      v-if='isLogged'
      @click="$emit('isSidebarOpen')"
    ></v-app-bar-nav-icon>
    <v-toolbar-title class='ma-auto name'>
      {{ this.$route.path.slice(1) || namePage }}
    </v-toolbar-title>
    <div
      v-if='isLogged'
      class='pl-6 pl-sm-4'
    >
      <v-row justify='center'>
        <v-menu
          bottom
          min-width='200px'
          rounded
          offset-y
        >
          <template #activator='{ on }'>
            <v-btn
              icon
              x-medium
              v-on='on'
            >
              <v-avatar
                color='pink'
                size='36'
              >
                <img
                  v-if='currentUser.imgSrc'
                  :src='currentUser.imgSrc'
                  alt=' '
                >
                <span
                  v-else
                  class='white--text'
                >
                    {{ initials }}
                  </span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class='justify-center'>
              <div class='mx-auto text-center'>
                <v-avatar
                  color='pink'
                >
                  <img
                    v-if='currentUser.imgSrc'
                    :src='currentUser.imgSrc'
                    alt=' '
                  >
                  <span
                    v-else
                    class='white--text text-h6'
                  >
                    {{ initials }}
                  </span>
                </v-avatar>
                <h4 class='my-1'>{{ fullName }}</h4>
                <p class='text-caption'>
                  {{ currentUser.email }}
                </p>
                <v-divider class='my-2'></v-divider>
                <v-btn
                  depressed
                  rounded
                  text
                  :to="{name: 'ProfilePage'}"
                >
                  Go To Profile
                </v-btn>
                <v-divider class='my-2'></v-divider>
                <v-btn
                  @click='logOut'
                  depressed
                  rounded
                  text
                >
                  Log-Out
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </v-row>
    </div>
    <v-btn
      v-if='!isLogged'
      class='ma-2'
      color='indigo'
      icon
      @click='logOut'
    >
      <v-icon>mdi-login-variant</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
import {mapGetters, mapMutations, mapState} from 'vuex'

export default {
  name: 'HeaderComponent',
  props: {
    sidebarOpen: {}
  },
  data() {
    return {
      namePage: 'The Rick and Morty API'
    }
  },
  computed: {
    ...mapGetters('authStore', ['isLogged']),
    ...mapState('authStore', ['currentUser']),
    fullName() {
      return this.currentUser.firstName + ' ' + this.currentUser.lastName
    },
    initials() {
      return this.currentUser.firstName.slice(0, 1) + this.currentUser.lastName.slice(0, 1)
    }
  },
  methods: {
    ...mapMutations({
      LOG_OUT: 'authStore/LOG_OUT',
      CLEAR_CHARACTER_LIKE: 'characterStore/CLEAR_CHARACTER_LIKE',
      CLEAR_LOCATION_LIKE: 'locationStore/CLEAR_LOCATION_LIKE',
      CLEAR_EPISODE_LIKE: 'episodeStore/CLEAR_EPISODE_LIKE'
    }),
    logOut() {
      this.LOG_OUT()
      this.CLEAR_CHARACTER_LIKE()
      this.CLEAR_LOCATION_LIKE()
      this.CLEAR_EPISODE_LIKE()
      this.$router.push({name: 'LoginPage'})
    }
  }
}
</script>
<style scoped>
.name {
  text-transform: capitalize;
}
</style>