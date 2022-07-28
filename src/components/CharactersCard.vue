<template>
  <v-card
    max-width='500'
    min-width='400'
    class='ma-5 item'
    outlined
    :loading='false'
  >
    <v-list-item three-line>
      <router-link class='link' :to="{ name: 'CharacterItem', params: { id: character.id } }">
        <v-img
          max-width='170'
          max-height='170'
          class='mr-4 mb-2 mt-2 img'
          :src='character.image'
        ></v-img>
      </router-link>
      <v-list-item-content>
        <router-link class='link' :to="{ name: 'CharacterItem', params: { id: character.id } }">
          <div class='text-h6 mb-1'>
            {{ character.name }}
          </div>
        </router-link>
        <div class='mb-2'>
          {{ character.status }} - {{ character.species }}
        </div>
        <div>Last known location:</div>
        <div class='mb-1'>{{ character.location.name }}</div>
        <v-list-item-subtitle></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
export default {
  name: 'CharactersCard',
  props: {
    character: {
      required: true
    },
    loading: {
      required: true
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

.link {
  color: black;
}

</style>