<template>
  <v-card
    class='ma-2'
  >
    <v-list-item three-line v-if='!loading'>
      <v-img
        max-width='400'
        class='mr-4 mb-2 mt-2'
        :src='characterItem.image'
      ></v-img>
      <v-list-item-content>
        <v-list-item-title class='text-h6 mb-1'>
          {{ characterItem.name }}
        </v-list-item-title>
        <div class='mb-2'>
          {{ characterItem.status }} - {{ characterItem.species }}
        </div>
        <div class='mb-2'>
          Gender: {{ characterItem.gender }}
        </div>
        <div class='mb-2'>
          Origin: {{ characterItem.origin.name }}
        </div>
        <div class='mb-1'>Last known location:
          <router-link
            class='link'
            :to="{ name: 'LocationItemPage', params: { id: +characterItem.location.url.split('/').pop() } }"
          >
            {{ characterItem.location.name }}
          </router-link>
        </div>
        <div class='mb-1'>First seen in:
          <template v-if='!episodesById.length'>
            <router-link class='link' :to="{ name: 'EpisodeItemPage', params: { id: episodesById.id } }">
              {{ episodesById.name }}
            </router-link>
          </template>
          <template v-else>
            <router-link class='link' :to="{ name: 'EpisodeItemPage', params: { id: episodesById[0].id } }">
              {{ episodesById[0].name }}
            </router-link>
          </template>
        </div>
        <div class='mb-1'>Created: {{ characterItem.created }}</div>
      </v-list-item-content>
    </v-list-item>
    <LikeButton :btn-active='btnActive' :on-click='onClick' />
  </v-card>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
import LikeButton from '@/components/LikeButton'

export default {
  name: 'CharacterItemPage',
  data() {
    return {
      loading: true,
      btnActive: false
    }
  },
  components: {LikeButton},
  computed: {
    ...mapState({
      characterItem: s => s.characterStore.characterItem,
      episodesById: s => s.episodeStore.episodesById,
      likedCharacters: s => s.characterStore.likedCharacters
    }),
    ...mapGetters('characterStore', ['episodesID'])
  },
  watch: {
    $route: {
      async handler() {
        this.loading = true
        await this.getCharacter(this.$route.params.id)
        await this.getEpisodeByIds(this.episodesID)
        this.btnActive = this.characterItem.isLiked
        this.loading = false
      },
      deep: true,
      immediate: true
    },
    likedCharacters: {
      handler() {
        this.btnActive = this.characterItem.isLiked
      },
      deep: true
    }
  },
  beforeDestroy() {
    this.SET_CHARACTER({})
  },
  methods: {
    ...mapMutations({
      SET_CHARACTER: 'characterStore/SET_CHARACTER',
      SET_CHARACTER_LIKE: 'characterStore/SET_CHARACTER_LIKE',
      REMOVE_CHARACTER_LIKE: 'characterStore/REMOVE_CHARACTER_LIKE'
    }),
    ...mapActions({
      getCharacter: 'characterStore/getCharacter',
      getEpisodeByIds: 'episodeStore/getEpisodeByIds'
    }),
    onClick() {
      this.characterItem.isLiked ? this.REMOVE_CHARACTER_LIKE(this.characterItem.id) : this.SET_CHARACTER_LIKE(this.characterItem)
    }
  }
}
</script>

<style scoped>
</style>