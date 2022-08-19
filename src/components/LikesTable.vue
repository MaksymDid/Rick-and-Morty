<template>
  <v-card class='mx-1 my-3 ma-sm-3 pa-2 pa-sm-6'>
    <v-tabs
      v-model='activeTab'
      color='deep-purple accent-4'
      right
    >
      <v-tab>Characters</v-tab>
      <v-tab>Locations</v-tab>
      <v-tab class='mr-0 mr-sm-3'>Episodes</v-tab>
      <v-tabs-items v-model='activeTab'>
        <v-tab-item
          v-for='n in 3'
          :key='n'
        >
          <v-container fluid>
            <v-card-title class='text-h4 mb-2 pt-4 pt-sm-1'>
              {{ cardTitle }}
              <v-spacer></v-spacer>
              <v-text-field
                class='mt-3 mt-sm-0 pt-3 pt-sm-0'
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
              :search='search'
              item-key='name'
              show-select
              class='elevation-1'
              single-select
            >
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
              <template #item.image={item}>
                <v-avatar>
                  <img
                    :src='item.image'
                    alt=""
                  >
                </v-avatar>
              </template>
              <template #item.name={item}>
                <router-link
                  class='link'
                  :to='{ name: `${link}`, params: { id: item.id } }'
                >
                  {{ item.name }}
                </router-link>
              </template>
              <template #item.origin={item}>
                <router-link
                  v-if='item.origin.url'
                  class='link'
                  :to="{ name: 'LocationItemPage', params: { id: +item.origin.url.split('/').pop() } }"
                >
                  {{ item.origin.name }}
                </router-link>
                <template v-else>
                  {{ item.origin.name }}
                </template>
              </template>
              <template #item.location={item}>
                <router-link
                  class='link'
                  :to="{ name: 'LocationItemPage', params: { id: +item.location.url.split('/').pop() } }"
                >
                  {{ item.location.name }}
                </router-link>
              </template>
              <template #item.created={item}>
                {{ item.created.slice(0, 10) }}
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
import {mapActions, mapMutations, mapState} from 'vuex'
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
        {text: '', value: 'image'},
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        {text: 'Gender', value: 'gender'},
        {text: 'Status', value: 'status'},
        {text: 'Origin', value: 'origin'},
        {text: 'Last known location', value: 'location'},
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
      switch (this.activeTab) {
        case 0:
          return this.headersCharacters
        case 1:
          return this.headersLocations
        case 2:
          return this.headersEpisodes
      }
    },
    item() {
      switch (this.activeTab) {
        case 0:
          return this.likedCharacters
        case 1:
          return this.likedLocations
        case 2:
          return this.likedEpisodes
      }
    },
    cardTitle() {
      switch (this.activeTab) {
        case 0:
          return 'Characters'
        case 1:
          return 'Locations'
        case 2:
          return 'Episodes'
      }
    },
    link() {
      switch (this.activeTab) {
        case 0:
          return 'CharacterItemPage'
        case 1:
          return 'LocationItemPage'
        case 2:
          return 'EpisodeItemPage'
      }
    }
  },
  methods: {
    ...mapMutations({
      REMOVE_CHARACTER_LIKE: 'characterStore/REMOVE_CHARACTER_LIKE',
      REMOVE_LOCATION_LIKE: 'locationStore/REMOVE_LOCATION_LIKE',
      REMOVE_EPISODE_LIKE: 'episodeStore/REMOVE_EPISODE_LIKE'
    }),
    ...mapActions('episodeStore', ['getEpisodeById']),
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
