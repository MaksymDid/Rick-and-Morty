<template>
  <v-card
    class='ma-2 my-5 ma-sm-3 pa-0 pa-sm-3'
    :loading='loading'
  >
    <div
      class='px-0 d-flex flex-column flex-sm-row pb-0'
    >
      <router-link
        class='img-link'
        :to="{ name: 'CharacterItemPage', params: { id: character.id } }"
      >
        <v-img
          class='mr-0 mr-sm-4 img'
          :src='character.image'
        ></v-img>
      </router-link>
      <v-list-item-content
        class='px-4 px-sm-0'
      >
        <router-link
          class='text-h6 mb-4 link'
          :to="{ name: 'CharacterItemPage', params: { id: character.id } }"
        >
          {{ character.name }}
        </router-link>
        <div class='mb-3 d-flex align-start'>
          <v-icon
            class='mr-2'
            :color='color'
            small
          >mdi-brightness-1
          </v-icon>
          <div>
            {{ character.status }} - {{ character.species }}
          </div>
        </div>
        <div class='mb-2'>Last known location:</div>
        <router-link
          class='link'
          :to="{ name: 'LocationItemPage', params: { id: +character.location.url.split('/').pop() } }"
          active-class='mb-3'
        >
          {{ character.location.name }}
        </router-link>
      </v-list-item-content>
    </div>
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
    ...mapGetters('authStore', ['isLogged']),
    color() {
      switch (this.character.status) {
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
        this.$router.push({name: 'LoginPage'})
      }
    }
  }
}
</script>
<style scoped>
.img {
  width: 100% !important;
  height: auto;
}

.img-link {
  width: 100% !important;
}

@media (min-width: 600px) {
  .img {
    max-width: 170px;
    max-height: 170px;
  }

  .img-link {
    width: auto !important;
  }
}

</style>