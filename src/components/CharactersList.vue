<template>
    <v-row>
      <v-col
        v-for='character in characters'
        :key='character.id'
        class='pa-0'
      >
        <v-skeleton-loader v-if='loading'
          max-width='400'
          min-width='400'
          type='card'
        ></v-skeleton-loader>
        <CharactersCard v-else
          :character='character'
          :loading='loading'
        />
      </v-col>
    </v-row>
</template>
<script>
import {mapMutations, mapState} from 'vuex'
import CharactersCard from '@/components/CharactersCard'

export default {
  name: 'CharactersList',
  inject: {
    theme: {
      default: {isDark: false}
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  components: {CharactersCard},
  beforeDestroy() {
    this.SET_CHARACTERS({})
  },
  computed: {
    ...mapState('characterStore', ['characters'])
  },
  methods: {
    ...mapMutations ({
      SET_CHARACTERS: 'characterStore/SET_CHARACTERS'
    })
  }
}
</script>
<style scoped>

h1 {
  font-size: 75px;
  padding: 100px 0;
  text-align: center;
  z-index: 0;
}

svg {
  width: auto;
  height: 75%;
  fill: rgb(245, 245, 245);
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: -1;
}


</style>