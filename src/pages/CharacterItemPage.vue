<template>
  <v-card
    class='ma-2 my-5 ma-sm-5 pa-0 pa-sm-3'
  >
    <div
      v-if='!loading'
      class='px-0 d-flex flex-column flex-sm-row pb-0'
    >
      <v-img
        max-width='400'
        class='mr-0 mr-sm-4'
        :src='characterItem.image'
      ></v-img>
      <v-list-item-content class='px-4 px-sm-0'>
        <v-list-item-title class='text-h6 mb-6'>
          {{ characterItem.name }}
        </v-list-item-title>
        <div class='mb-6 d-flex align-start'>
          <v-icon
            class='mr-2'
            :color='color'
            small
          >mdi-brightness-1
          </v-icon>
          <div>
          {{ characterItem.status }} - {{ characterItem.species }}
          </div>
        </div>
        <div class='mb-6'>
          Gender: {{ characterItem.gender }}
        </div>
        <div class='mb-6'>Origin:
          <router-link
            v-if='characterItem.origin.url'
            class='link'
            :to="{ name: 'LocationItemPage', params: { id: +characterItem.origin.url.split('/').pop() } }"
          >
          {{ characterItem.origin.name }}
          </router-link>
          <template v-else>
            {{ characterItem.origin.name }}
          </template>
        </div>
        <div class='mb-6'>Last known location:
          <router-link
            class='link'
            :to="{ name: 'LocationItemPage', params: { id: +characterItem.location.url.split('/').pop() } }"
          >
            {{ characterItem.location.name }}
          </router-link>
        </div>
        <div class='mb-6'>First seen in:
          <template v-if='!episodes.length'>
            <router-link class='link' :to="{ name: 'EpisodeItemPage', params: { id: episodes.id } }">
              {{ episodes.name }}
            </router-link>
          </template>
          <template v-else>
            <router-link class='link' :to="{ name: 'EpisodeItemPage', params: { id: episodes[0].id } }">
              {{ episodes[0].name }}
            </router-link>
          </template>
        </div>
        <div class='mb-1'>Created: {{ characterItem.created }}</div>
      </v-list-item-content>
    </div>
    <h3 class='text-center py-4'>Episodes with {{ characterItem.name }}:</h3>
    <v-row ref='wrapper' @scroll='loadMore'>
      <v-col
        cols='12'
        md='6'
        sm='12'
        v-for='episode in episodes'
        :key='episode.id'
        class='pa-0'
      >
        <EpisodesCard :episode='episode' />
      </v-col>
    </v-row>
    <LikeButton :btn-active='btnActive' :on-click='onClick' />
  </v-card>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
import LikeButton from '@/components/LikeButton'
import EpisodesCard from '@/components/EpisodesCard'

export default {
  name: 'CharacterItemPage',
  data() {
    return {
      loading: true,
      slice: 6,
      btnActive: false
    }
  },
  components: {LikeButton, EpisodesCard},
  computed: {
    ...mapState({
      characterItem: s => s.characterStore.characterItem,
      episodes: s => s.episodeStore.episodes,
      likedCharacters: s => s.characterStore.likedCharacters
    }),
    ...mapGetters('characterStore', ['episodesID']),
    color() {
      switch (this.characterItem.status) {
        case 'unknown':
          return 'gray'
        case 'Alive' :
          return 'green'
        case 'Dead' :
          return 'red'
      }
    }
  },
  watch: {
    $route: {
      async handler() {
        this.loading = true
        await this.getCharacter(this.$route.params.id)
        this.CLEAR_EPISODES_BY_IDS()
        await this.getEpisodeByIds(this.episodesID.slice(0, this.slice).join(','))
        this.btnActive = this.characterItem.isLiked
        this.loading = false
      },
      deep: true,
      immediate: true
    },
    async slice() {
      if (this.episodesID.length > this.slice - 6) {
        await this.getEpisodeByIds(this.episodesID.slice(this.slice - 6, this.slice).join(','))
      }
    },
    likedCharacters: {
      handler() {
        this.btnActive = this.characterItem.isLiked
      },
      deep: true
    }
  },
  mounted() {
    document.addEventListener('scroll', this.loadMore)
  },
  beforeDestroy() {
    this.CLEAR_EPISODES_BY_IDS()
    this.SET_CHARACTER({})
    document.removeEventListener('scroll', this.loadMore)
  },
  methods: {
    ...mapMutations({
      SET_CHARACTER: 'characterStore/SET_CHARACTER',
      SET_CHARACTER_LIKE: 'characterStore/SET_CHARACTER_LIKE',
      REMOVE_CHARACTER_LIKE: 'characterStore/REMOVE_CHARACTER_LIKE',
      CLEAR_EPISODES_BY_IDS: 'episodeStore/CLEAR_EPISODES_BY_IDS'
    }),
    ...mapActions({
      getCharacter: 'characterStore/getCharacter',
      getEpisodeByIds: 'episodeStore/getEpisodeByIds'
    }),
    loadMore() {
      if (this.$refs.wrapper.getBoundingClientRect().bottom < document.documentElement.clientHeight + 10) {
        this.slice += 6
      }
    },
    onClick() {
      this.characterItem.isLiked ? this.REMOVE_CHARACTER_LIKE(this.characterItem.id) : this.SET_CHARACTER_LIKE(this.characterItem)
    }
  }
}
</script>

<style scoped>
</style>