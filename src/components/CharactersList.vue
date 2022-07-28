<template>
    <v-row>
      <v-col
        v-for='character in characters'
        :key='character.id'
      >
        <CharactersCard
          :character='character'
          :loading='loading'
        />
      </v-col>
    </v-row>

</template>
<script>
import {mapState} from 'vuex'
import CharactersCard from '@/components/CharactersCard'

export default {
  name: 'CharactersList',
  props: {
    loading: {
      required: true
    }
  },
  components: {CharactersCard},
  computed: {
    ...mapState('characterStore', ['characters'])
  },
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