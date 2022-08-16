<template>
  <v-card class='ma-3 mt-5'>
    <v-tabs
      v-model='activeTab'
      color='deep-purple accent-4'
      right
    >
      <v-tab>Characters</v-tab>
      <v-tab>Locations</v-tab>
      <v-tab class='mr-3'>Episodes</v-tab>
      <v-tabs-items v-model='activeTab'>
        <v-tab-item
          v-for='n in 3'
          :key='n'
        >
          <v-container fluid>
            <v-card-title class='text-h4 mb-2 pt-1'>
              {{cardTitle}}
              <v-spacer></v-spacer>
              <v-text-field
                class='mt-0 pt-0'
                v-model='search'
                append-icon='mdi-magnify'
                label='Search'
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              v-model='selected'
              :headers='header'
              :items='item'
              :search="search"
              item-key='name'
              show-select
              class='elevation-1'
              single-select
            >
              <template #item.created={item}>
                {{ item.created.slice(0, 10) }}
              </template>
              <template #item.data-table-select={item}>
                <v-btn
                  icon
                  @click='onClick(item.id)'
                  :color="item.isLiked ? 'pink': 'gray'"
                  class='btn-like'
                >
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
    <LikesModal :is-open='isOpen' @isDialogOpen='isDialogOpen' />
  </v-card>
</template>
<script>
import {mapMutations, mapState} from 'vuex'
import LikesModal from '@/components/LikesModal'

export default {
  name: 'LikesTable',
  components: {LikesModal},
  data() {
    return {
      search: '',
      isOpen: false,
      itemId: null,
      selected: [],
      activeTab: 0,
      headersCharacters: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        {text: 'Gender', value: 'gender'},
        {text: 'Origin', value: 'origin.name'},
        {text: 'Last known location', value: 'location.name'},
        {text: 'Created', value: 'created'}
      ],
      headersLocations: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        {text: 'Type', value: 'type'},
        {text: 'Dimension', value: 'dimension'},
        {text: 'Created', value: 'created'}
      ],
      headersEpisodes: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        {text: 'Episode', value: 'episode'},
        {text: 'Air date', value: 'air_date'},
        {text: 'Created', value: 'created'}
      ]
    }
  },
  computed: {
    ...mapState({
      likedCharacters: s => s.characterStore.likedCharacters,
      likedLocations: s => s.locationStore.likedLocations,
      likedEpisodes: s => s.episodeStore.likedEpisodes
    }),
    header() {
      if (this.activeTab === 0) {
        return this.headersCharacters
      } else if (this.activeTab === 1) {
        return this.headersLocations
      } else {
        return this.headersEpisodes
      }
    },
    item() {
      if (this.activeTab === 0) {
        return this.likedCharacters
      } else if (this.activeTab === 1) {
        return this.likedLocations
      } else {
        return this.likedEpisodes
      }
    },
    cardTitle(){
      if (this.activeTab === 0) {
        return 'Characters'
      } else if (this.activeTab === 1) {
        return 'Locations'
      } else {
        return 'Episodes'
      }
    }
  },
  methods: {
    ...mapMutations({
      REMOVE_CHARACTER_LIKE: 'characterStore/REMOVE_CHARACTER_LIKE',
      REMOVE_LOCATION_LIKE: 'locationStore/REMOVE_LOCATION_LIKE',
      REMOVE_EPISODE_LIKE: 'episodeStore/REMOVE_EPISODE_LIKE'
    }),
    onClick(value) {
      this.isOpen = true
      this.itemId = value
    },
    isDialogOpen(value) {
      this.isOpen = false
      if (value) {
        if (this.activeTab === 0) {
          this.REMOVE_CHARACTER_LIKE(this.itemId)
        } else if (this.activeTab === 1) {
          this.REMOVE_LOCATION_LIKE(this.itemId)
        } else {
          this.REMOVE_EPISODE_LIKE(this.itemId)
        }
      }
    }
  }
}
</script>
