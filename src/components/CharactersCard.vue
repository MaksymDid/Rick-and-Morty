<template>
  <v-card
    max-width='500'
    min-width='400'
    class='ma-5 pa-3'
    outlined
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
          :to="{ name: 'LocationItemPage', params: { id: character.location.url.split('/').pop() } }"
        >
          {{ character.location.name }}
        </router-link>
        <v-list-item-subtitle></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-btn
      icon
      @click='onClick'
      :color="btnActive ? 'pink': 'gray'"
      class='btn-like'
    >
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </v-card>
</template>
<script>

import {mapMutations, mapState} from 'vuex'

export default {
  name: 'CharactersCard',
  props: {
    character: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      btnActive: false
    }
  },
  computed: {
    ...mapState({
      charactersLikes: s => s.characterStore.charactersLikes
    })
  },
  watch: {
    character: {
      handler() {
        console.log(this.character.isLiked)
        this.btnActive = this.character.isLiked
      },
      deep: true,
      
    }
  },
  mounted() {
    console.log(this.character)
  },
  methods: {
    ...mapMutations({
      SET_CHARACTER_LIKE: 'characterStore/SET_CHARACTER_LIKE',
      REMOVE_LIKE: 'characterStore/REMOVE_LIKE'
    }),
    onClick() {
      this.character.isLiked ? this.REMOVE_LIKE(this.character.id) : this.SET_CHARACTER_LIKE(this.character)
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

.btn-like {
  position: absolute;
  top: 5px;
  right: 5px;
}

</style>