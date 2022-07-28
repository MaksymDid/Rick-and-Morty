<template>
  <div>
    <v-container class='wrap lighten-5 pa-4'>
      <CharactersList/>
    </v-container>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import CharactersList from '@/components/CharactersList'

export default {
  name: 'ContentPage',
  components: {CharactersList},
  async created() {
    await this.getCharacters({page: 10})
  },
  methods: {
    ...mapActions('characterStore', ['getCharacters'])
  }
}
</script>

<style scoped>
</style>