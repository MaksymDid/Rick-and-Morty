<template>
  <v-card
    class='ma-5 pa-3'
    :loading='loading'
  >
    <v-list-item
      class='px-0'
      three-line
    >
      <router-link
        class='link'
        :to="{ name: 'CharacterItemPage', params: { id: character.id } }"
      >
        <v-img
          max-width='170'
          max-height='170'
          class='mr-4 img'
          :src='character.image'
        ></v-img>
      </router-link>
      <v-list-item-content>
        <router-link
          class='link'
          :to="{ name: 'CharacterItemPage', params: { id: character.id } }"
        >
          <div class='text-h6 link'>
            {{ character.name }}
          </div>
        </router-link>
        <div class='mb-2'>
          {{ character.status }} - {{ character.species }}
        </div>
        <div>Last known location:</div>
        <router-link
          class='link'
          :to="{ name: 'LocationItemPage', params: { id: +character.location.url.split('/').pop() } }"
        >
          {{ character.location.name }}
        </router-link>
        <v-list-item-subtitle></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <LikeButton :btn-active='btnActive' :on-click='onClick' />
  </v-card>
</template>
<script>

import {mapGetters, mapMutations, mapState} from 'vuex'
import LikeButton from '@/components/LikeButton'

export default {
  name: 'CharactersCard',
  components: {LikeButton},
  props: {
    character: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      btnActive: this.character.isLiked
    }
  },
  computed: {
    ...mapState('characterStore', ['likedCharacters']),
    ...mapGetters('authStore', ['isLogged'])
  },
  watch: {
    likedCharacters: {
      handler() {
        this.btnActive = this.character.isLiked
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations({
      SET_CHARACTER_LIKE: 'characterStore/SET_CHARACTER_LIKE',
      REMOVE_CHARACTER_LIKE: 'characterStore/REMOVE_CHARACTER_LIKE'
    }),
    onClick() {
      if (this.isLogged) {
        this.character.isLiked ? this.REMOVE_CHARACTER_LIKE(this.character.id) : this.SET_CHARACTER_LIKE(this.character)
      } else {
        this.$router.push( {name: 'LoginPage'} )
      }
    }
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

.link:hover {
  color: orange;
}

</style>