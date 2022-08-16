<template>
  <v-dialog
    v-model='isOpen'
    persistent
    max-width='290'
  >
    <v-card>
      <v-card-title class='subtitle-1 text-center'>
        Are you sure you want to delete?
      </v-card-title>
      <v-card-actions class='justify-space-between'>
        <v-btn
          color='primary'
          text
          @click="$emit('isDialogOpen', false)"
        >
          Disagree
        </v-btn>
        <v-btn
          color='primary'
          text
          @click="$emit('isDialogOpen', true)"
        >
          Agree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'LikesModal',
  data() {
    return {}
  },
  props: {
    isOpen: {}
  }
}
</script>