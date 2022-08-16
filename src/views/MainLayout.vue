<template>
  <div>
    <v-navigation-drawer
      v-model='sidebarOpen'
      app
    >
      <SidebarMenu v-if='isLogged' />
    </v-navigation-drawer>
    <HeaderComponent
      :sidebarOpen='sidebarOpen'
      @isSidebarOpen='isSidebarOpen'
/>
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
import SidebarMenu from '@/components/SidebarMenu'
import {mapGetters} from 'vuex'
import HeaderComponent from '@/components/HeaderComponent'

export default {
  name: 'MainLayout',
  components: {HeaderComponent, SidebarMenu},
  data() {
    return {
      sidebarOpen: false,
    }
  },
  computed: {
    ...mapGetters('authStore', ['isLogged']),
  },
  created() {
    if (this.isLogged) {
      this.sidebarOpen = true
    }
  },
  methods:{
    isSidebarOpen(){
      this.sidebarOpen = !this.sidebarOpen
    }
  }
}
</script>

