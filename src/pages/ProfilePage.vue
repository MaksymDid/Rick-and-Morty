<template>
  <v-container>
    <v-card class='ma-1 ma-sm-3 pa-2 pa-sm-6'>
      <EditUserDialogComponent />
      <v-row justify='center'>
        <v-col
          cols='12'
          sm='5'
        >
          <v-avatar
            width='100%'
            height='auto'
            class='mt-8 d-block'
            rounded
          >
            <img
              v-if='currentUser.imgSrc'
              :src='currentUser.imgSrc'
              alt=' '
            >
            <img
              v-else
              src='https://agile.yakubovsky.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
              alt=' '
            >
          </v-avatar>
        </v-col>
        <v-col
          cols='12'
          sm='7'
        >
          <v-card-text class='text-h5 text-sm-h4'>{{ fullName }}</v-card-text>
          <v-card-subtitle class='text-h6'>Phone Number</v-card-subtitle>
          <v-card-text>{{ currentUser.phone }}</v-card-text>
          <v-card-subtitle class='text-h6'>Email</v-card-subtitle>
          <v-card-text>{{ currentUser.email }}</v-card-text>
          <v-card-subtitle class='text-h6'>Birth Date</v-card-subtitle>
          <v-card-text>{{ currentUser.date }}</v-card-text>
        </v-col>
      </v-row>
    </v-card>
    <LikesTable />
  </v-container>
</template>
<script>
import {mapState} from 'vuex'
import EditUserDialogComponent from '@/components/EditUserDialogComponent'
import LikesTable from '@/components/LikesTable'

export default {
  name: 'ProfilePage',
  components: {LikesTable, EditUserDialogComponent},
  computed: {
    ...mapState('authStore', ['currentUser']),
    fullName() {
      return this.currentUser.firstName + ' ' + this.currentUser.lastName
    }
  }
}
</script>

