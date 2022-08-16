<template>
  <v-card
    class='ma-5 '
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
    <LikeButton :btn-active='btnActive' :on-click='onClick' />
  </v-card>
</template>
<script>
import {mapMutations, mapState} from 'vuex'
import LikeButton from '@/components/LikeButton'

export default {
  name: 'LocationsCard',
  components: {LikeButton},
  data () {
    return{
      btnActive: this.location.isLiked
    }
  },
  props: {
    location: {},
  },
  computed: mapState('locationStore', ['likedLocations']),
  watch: {
    likedLocations: {
      handler() {
        this.btnActive = this.location.isLiked
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations({
      SET_LOCATIONS_LIKE: 'locationStore/SET_LOCATIONS_LIKE',
      REMOVE_LOCATION_LIKE: 'locationStore/REMOVE_LOCATION_LIKE'
    }),
    onClick() {
      this.location.isLiked ? this.REMOVE_LOCATION_LIKE(this.location.id) : this.SET_LOCATIONS_LIKE(this.location)
    }
  }
}
</script>
<style scoped>
</style>