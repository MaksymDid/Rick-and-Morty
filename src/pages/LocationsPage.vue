<template>
    <v-container class='wrap lighten-5 pa-4'>
      <v-row>
        <v-col
          cols='12'
          md='6'
          sm='12'
          v-for='location in locations'
          :key='location.id'
          class='pa-0'
        >
          <v-skeleton-loader
            v-if='loading'
            type='card-heading, list-item-three-line'
          ></v-skeleton-loader>
          <LocationsCard v-else :location='location' />
        </v-col>
      </v-row>
    <v-row
      justify='center'
      width='100%'
      v-if='!loading'
    >
      <v-col cols='10'>
        <v-container class='max-width'>
          <v-pagination
            v-model='page'
            :total-visible='7'
            class='my-3'
            :length='this.locationsPages.pages'
          ></v-pagination>
        </v-container>
      </v-col>
    </v-row>
    </v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import LocationsCard from '@/components/LocationsCard'

export default {
  name: 'LocationsPage',
  components: {LocationsCard},
  data() {
    return {
      page: 0,
      loading: false
    }
  },
  computed: {
    ...mapState({
      locations: s => s.locationStore.locations,
      locationsPages: s => s.locationStore.locationsPages
    })
  },
  created() {
    this.page = 1
  },
  watch: {
    page: {
      async handler() {
        this.loading = true
        await this.getLocations({page: this.page})
        this.loading = false
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('locationStore', ['getLocations'])
  }
}
</script>

<style scoped>
.wrap {
  display: flex;
  flex-wrap: wrap;
}

</style>