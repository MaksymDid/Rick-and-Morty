<template>
  <div>
    <v-container class='wrap lighten-5 pa-4'>
      <v-row>
        <v-col
          v-for='location in locations'
          :key='location.id'
        >
          <v-card
            max-width='500'
            min-width='400'
            class='ma-5 item'
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <router-link class='link' :to="{ name: 'LocationItemPage', params: { id: location.id } }">
                  <div class='text-h6 mb-1'>
                    {{ location.name }}
                  </div>
                </router-link>
                <div class='mb-2'>
                  Type: {{ location.type }}
                </div>
                <div class='mb-2'>
                  Dimension: {{ location.dimension }}
                </div>
                <div class='mb-2'>
                  Created: {{ new Intl.DateTimeFormat('en-US').format(new Date(location.created)) }}
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
            :length='this.locationsPages.pages'
          ></v-pagination>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'LocationsPage',
  data() {
    return{
      page: 0,
      loading: false
    }
  },
  computed: {
    ...mapState(
      {
        locations: state => state.locationStore.locations,
        locationsPages: state => state.locationStore.locationsPages,
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
    ...mapActions({
      getLocations: 'locationStore/getLocations'
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