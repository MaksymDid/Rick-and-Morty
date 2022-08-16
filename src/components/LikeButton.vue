<template>
  <v-btn
    icon
    @click='onClick'
    :color="btnActive ? 'pink': 'gray'"
    class='btn-like'
  >
    <v-icon>mdi-heart</v-icon>
  </v-btn>
</template>
<script>
export default {
  name: 'LikeButton',
  props: {
    btnActive: {},
    onClick: {}
  }
}
</script>
<style scoped>

.btn-like {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>