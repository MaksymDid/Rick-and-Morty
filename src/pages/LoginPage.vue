<template>
  <div>
    <h1 class='text-center mb-4'>Log In</h1>
    <v-card
      elevation='2'
      class='pa-5'
      max-width='500'
    >
      <v-form
        ref='form'
        v-model='valid'
        lazy-validation
      >
          <v-row class='ma-0'>
            <v-col
              cols='12'
              class='pa-0'
            >
              <v-card-title class='pa-0 mb-3'>
                Email
              </v-card-title>
              <v-text-field
                v-model='user.email'
                label='Email'
                type='email'
                outlined
                :rules='emailRules'
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols='12'
              class='pa-0'
            >
              <v-card-title class='pa-0 mb-3'>
                Password
              </v-card-title>
              <v-text-field
                v-model='user.password'
                label='Password'
                type='password'
                outlined
                :rules='passwordRules'
                required
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                hint="At least 8 characters"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
          </v-row>
        <v-row
          justify='space-between'
          class='ma-0'
        >
          <v-btn
            color="primary"
            plain
            :to="{ name: 'RegistrationPage' }"
          >
            Create account
          </v-btn>
          <v-btn
            width='150'
            color="primary"
            @click='logIn'
          >
            Log in
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'LoginPage',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      show1: false,
      valid: true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 8 || 'The password must contain at least 8 characters'
      ]
    }
  },
  computed: mapGetters('authStore', ['checkUser']),
  methods: {
    ...mapMutations({
      SET_USER: 'authStore/SET_USER',
      SET_SNACKBAR_PARAMS: 'snackbarStore/SET_SNACKBAR_PARAMS'
    }),
    async logIn() {
      if (this.checkUser(this.user)) {
        this.SET_USER(this.user)
       await this.$router.push( { name: 'OverviewPage' } )
        this.SET_SNACKBAR_PARAMS({
          isOpen: true,
          color: 'success',
          message: 'You have successfully logged in',
        })
      } else {
        this.SET_SNACKBAR_PARAMS({
          isOpen: true,
          color: 'error',
          message: 'Invalid email or password',
        })
      }
    },
  }
}
</script>

<style scoped>

</style>