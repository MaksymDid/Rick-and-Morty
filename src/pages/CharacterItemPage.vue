<template>
  <v-card
    class='ma-2'
    outlined
    :loading='loading'
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
          <router-link class='link' :to="{ name: 'LocationItemPage', params: { id: url } }">
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
        <v-list-item-subtitle></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

export default {
  name: 'CharacterItemPage',
  computed: {
    ...mapState({
      characterItem: s => s.characterStore.characterItem,
      episodesById: s => s.episodeStore.episodesById
    }),
    ...mapGetters('characterStore', ['episodesID']),
    url() {
      return this.characterItem.location.url.split('/').pop()
    }
  },
  data() {
    return {
      loading: true
    }
  },
  watch: {
    $route: {
      async handler() {
        this.loading = true
        await this.getCharacter(this.$route.params.id)
        await this.getEpisodeByIds(this.episodesID)
        this.loading = false
      },
      deep: true,
      immediate: true
    }
  },
  beforeDestroy() {
    this.SET_CHARACTER({})
  },
  methods: {
    ...mapMutations({
      SET_CHARACTER: 'characterStore/SET_CHARACTER'
    }),
    ...mapActions({
      getCharacter: 'characterStore/getCharacter',
      getEpisodeByIds: 'episodeStore/getEpisodeByIds'
    })
  }
}
</script>

<style scoped>

</style>