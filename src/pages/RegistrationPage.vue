<template>
  <div>
    <h1 class='text-center mb-3'>Registration</h1>
    <v-card
      elevation='2'
      class='pa-2'
      max-width='800'
    >
      <v-form
        ref='form2'
        v-model='isValid'
        lazy-validation
        @submit.prevent='submitUser'
      >
        <v-row class='ma-0'>
          <v-col
            cols='12'
            class='pa-2'
            md='6'
            sm='6'
            xs='6'
          >
            <v-card-title class='pa-0 mb-3'>
              First name
            </v-card-title>
            <v-text-field
              v-model='user.firstName'
              outlined
              label='First name'
              required
              :rules='emptyRule'
            ></v-text-field>
          </v-col>
          <v-col
            cols='12'
            class='pa-2'
            md='6'
            sm='6'
            xs='6'
          >
            <v-card-title class='pa-0 mb-3'>
              Last name
            </v-card-title>
            <v-text-field
              v-model='user.lastName'
              outlined
              label='First name'
              required
              :rules='emptyRule'
            ></v-text-field>
          </v-col>
          <v-col
            cols='12'
            class='pa-2'
            md='6'
            sm='6'
            xs='6'
          >
            <v-card-title class='pa-0 mb-3'>
              Phone number
            </v-card-title>
            <v-text-field
              v-model='user.phone'
              outlined
              label='Phone number'
              required
              v-mask="'+380-##-###-##-##'"
              :rules='emptyRule'
            ></v-text-field>
          </v-col>
          <v-col
            cols='12'
            class='pa-2'
            md='6'
            sm='6'
            xs='6'
          >
            <v-menu
              ref='menu'
              v-model='menu'
              :close-on-content-click='false'
              :return-value.sync='user.date'
              transition='scale-transition'
              offset-y
              min-width='auto'
            >
              <template v-slot:activator='{ on, attrs }'>
                <v-card-title class='pa-0 mb-3'>
                  Birth date
                </v-card-title>
                <v-text-field
                  v-model='user.date'
                  outlined
                  label='Birth date'
                  required
                  append-icon='mdi-calendar'
                  v-bind='attrs'
                  v-on='on'
                  :rules='emptyRule'
                ></v-text-field>
              </template>
              <v-date-picker
                v-model='user.date'
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color='primary'
                  @click='menu = false'
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color='primary'
                  @click='$refs.menu.save(user.date)'
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col
            cols='12'
            class='pa-2'
            md='12'
            sm='12'
            xs='12'
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
            class='pa-2'
            md='6'
            sm='6'
            xs='6'
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
              hint='At least 8 characters'
              @click:append='show1 = !show1'
            ></v-text-field>
          </v-col>
          <v-col
            cols='12'
            class='pa-2'
            md='6'
            sm='6'
            xs='6'
          >
            <v-card-title class='pa-0 mb-3'>
              Confirm password
            </v-card-title>
            <v-text-field
              label='Confirm password'
              type='password'
              outlined
              :rules='confirmPasswordRules'
              required
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              hint='At least 8 characters'
              @click:append='show2 = !show2'
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row
          justify='space-between'
          class='ma-0'
        >
          <v-btn
            color='primary'
            plain
            :to="{ name: 'LoginPage' }"
          >
            have account?
          </v-btn>
          <v-btn
            width='150'
            color='primary'
            type='submit'
          >
            Submit
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: 'RegistrationPage',
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        phone: '',
        date: '',
        email: '',
        password: '',
      },
      isValid: true,
      menu: false,
      modal: false,
      show1: false,
      show2: false,
      emptyRule: [
        v => !!v || 'Field is required'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'The password must contain at least 8 characters'
      ],
      confirmPasswordRules: [
        v => !!v || 'Confirm password is required',
        v => v === this.user.password || 'Invalid password'
      ]
    }
  },
  methods: {
    ...mapMutations({
      SET_USERS: 'authStore/SET_USERS'
    }),
    async submitUser() {
      this.isValid = this.$refs.form2.validate()
      if (this.isValid) {
        this.SET_USERS(this.user)
        await this.$router.push({name: 'LoginPage'})
      }
    },
  }
}
</script>

<style scoped>
.v-card__title {
  font-size: 1rem !important;
  line-height: 1rem !important;
}
</style>