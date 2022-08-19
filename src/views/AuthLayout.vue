<template>
  <div class='wrapper d-flex flex-column justify-center align-center'>
    <v-btn
      plain
      class='btn-home'
      :to="{ name: 'OverviewPage' }"
    >
      <v-icon small>mdi-home</v-icon>
      home
    </v-btn>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'AuthLayout'
}
</script>

<style scoped>
.wrapper {
  height: 100%;
  background-color: rgba(91, 140, 232, .25);
  position: relative;
}

@media (min-width: 600px) {
  .wrapper {
    height: 100vh;
  }
}

.btn-home {
  position: absolute;
  top: 10px;
  left: 0;
}

@media (min-width: 600px) {
  .btn-home {
    top: 20px;
    left: 20px;
  }
}
</style>