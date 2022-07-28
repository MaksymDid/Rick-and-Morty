<template>
  <div>
    <v-card
      class='ma-2'
      outlined
      :loading='false'
    >
      <v-list-item three-line>
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
          <div class='mb-1'>Last known location: {{ characterItem.location.name }}</div>
          <div class='mb-1'>First seen in:
            <template v-if='!episodesById.length'>
              <router-link class='link' :to="{ name: 'EpisodeItem', params: { id: episodesById.id } }">
                {{ episodesById.name }}
              </router-link>
            </template>
            <template v-else>
              <router-link class='link' :to="{ name: 'EpisodeItem', params: { id: episodesById[0].id } }">
                {{ episodesById[0].name }}
              </router-link>
            </template>
          </div>
          <div class='mb-1'>Created: {{ characterItem.created }}</div>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

export default {
  name: 'CharacterItem',
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState({
      characterItem: state => state.characterStore.characterItem,
      episodesById: state => state.episodeStore.episodesById
    }),
    ...mapGetters('characterStore', ['episodesID'])
  },
  created() {
    this.SET_CLEAN_CHARACTER()
  },
  watch: {
    '$route': {
      async handler() {
        this.loading = true
        await this.getCharacter(this.$route.params.id)
        this.loading = false
        await this.getEpisodeByIds(this.episodesID)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      getCharacter: 'characterStore/getCharacter',
      getEpisodeByIds: 'episodeStore/getEpisodeByIds'
    }),
    ...mapMutations({
      SET_CLEAN_CHARACTER: 'characterStore/SET_CLEAN_CHARACTER'
    })
  }

}
</script>

<style scoped>

</style>