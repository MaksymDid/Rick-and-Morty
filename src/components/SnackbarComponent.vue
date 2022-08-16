<template>
  <v-snackbar
    :timeout='timer'
    :value=snackbarParams.isOpen
    absolute
    :color='snackbarParams.color'
    top
    right
    class='snackbar'
  >
    {{ snackbarParams.message }}
    <template #action='{ attrs }'>
      <v-btn
        text
        v-bind='attrs'
        @click='closeSnackbar'
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import {mapMutations, mapState} from 'vuex'

export default {
  name: 'SnackbarComponent',
  data () {
    return{
      timer: 4000
    }
  },
  computed: mapState('snackbarStore', ['snackbarParams']),
  watch: {
    'snackbarParams.isOpen'() {
      if (this.snackbarParams.isOpen) setTimeout(() => this.closeSnackbar(), this.timer)
    }
  },
  methods: {
    ...mapMutations('snackbarStore', ['SET_SNACKBAR_PARAMS']),
    closeSnackbar() {
      this.SET_SNACKBAR_PARAMS({
        isOpen: false,
        color: '',
        message: ''
      })
    }
  }
}
</script>

<style scoped>
.snackbar {
  z-index: 10;
}
</style>