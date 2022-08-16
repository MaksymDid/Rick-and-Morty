<template>
  <v-dialog
    v-model='dialog'
    persistent
    max-width='800px'
  >
    <template #activator='{ on, attrs }'>
      <v-btn
        class='v-btn--absolute'
        right
        color='primary'
        fab
        small
        dark
        v-bind='attrs'
        v-on='on'
        @click='isConfirmPassword = false'
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card class='pa-4'>
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
            md='12'
            sm='12'
            xs='12'
          >
            <div class='avatar'>
              <v-avatar
                color='pink'
                class='mb-3'
                size='100'
              >
                <img
                  v-if='imgSrc'
                  :src='imgSrc'
                  alt=' '
                >
                <span
                  v-else
                  class='white--text text-h4'
                >
            {{ initials }}
          </span>
              </v-avatar>
              <div class='upload-photo'>
                <v-file-input
                  v-model='img'
                  accept='image/png, image/jpeg, image/bmp'
                  hide-input
                  prepend-icon='mdi-pencil'
                ></v-file-input>
              </div>
            </div>
          </v-col>
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
              v-model='editedUser.firstName'
              outlined
              :rules='emptyRule'
              label='First name'
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
              Last name
            </v-card-title>
            <v-text-field
              v-model='editedUser.lastName'
              outlined
              :rules='emptyRule'
              label='First name'
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
              Phone number
            </v-card-title>
            <v-text-field
              v-model='editedUser.phone'
              outlined
              label='Phone number'
              required
              :rules='emptyRule'
              v-mask="'+380-##-###-##-##'"
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
              :return-value.sync='editedUser.date'
              transition='scale-transition'
              offset-y
              min-width='auto'
            >
              <template v-slot:activator='{ on, attrs }'>
                <v-card-title class='pa-0 mb-3'>
                  Birth date
                </v-card-title>
                <v-text-field
                  v-model='currentUser.date'
                  outlined
                  label='Birth date'
                  required
                  :rules='emptyRule'
                  append-icon='mdi-calendar'
                  v-bind='attrs'
                  v-on='on'
                ></v-text-field>
              </template>
              <v-date-picker
                v-model='currentUser.date'
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
                  @click='$refs.menu.save(currentUser.date)'
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
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
              v-model='editedUser.password'
              label='Password'
              type='password'
              @focus='focus'
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
            v-if='isConfirmPassword'
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
              v-model='confirmPassword'
              required
              :rules='confirmPasswordRules'
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              hint='At least 8 characters'
              @click:append='show2 = !show2'
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card-actions class='justify-space-between'>
          <v-btn
            color='primary'
            @click='cancel'
          >
            Cancel
          </v-btn>
          <v-btn
            color='primary'
            type='submit'
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import {mapMutations, mapState} from 'vuex'

export default {
  name: 'EditUserDialogComponent',
  data() {
    return {
      menu: false,
      modal: false,
      show1: false,
      show2: false,
      dialog: false,
      isValid: true,
      isConfirmPassword: false,
      confirmPassword: '',
      img: null,
      imgSrc: '',
      emptyRule: [
        v => !!v || 'Field is required'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'The password must contain at least 8 characters'
      ],
      confirmPasswordRules: [
        v => !!v || 'Confirm password is required',
        v => v === this.editedUser.password || 'Invalid password'
      ],
      editedUser: {}
    }
  },
  computed: {
    ...mapState('authStore', ['currentUser']),
    initials() {
      return this.currentUser.firstName.slice(0, 1) + this.currentUser.lastName.slice(0, 1)
    },
    fullName() {
      return this.currentUser.firstName + ' ' + this.currentUser.lastName
    }
  },
  created() {
    this.editedUser = {...this.currentUser}
    this.imgSrc = this.currentUser.imgSrc
  },
  methods: {
    ...mapMutations({
      EDIT_USER: 'authStore/EDIT_USER',
      SET_SNACKBAR_PARAMS: 'snackbarStore/SET_SNACKBAR_PARAMS'
    }),
    submitUser() {
      this.isValid = this.$refs.form2.validate()
      if (this.isValid) {
        this.EDIT_USER({...this.editedUser, imgSrc: this.imgSrc})
        this.dialog = false
        this.SET_SNACKBAR_PARAMS({
          isOpen: true,
          color: 'success',
          message: 'Data is changed successfully'
        })
      }
    },
    cancel() {
      this.editedUser = {...this.currentUser}
      this.imgSrc = this.currentUser.imgSrc
      this.confirmPassword = ''
      this.isConfirmPassword = false
      this.dialog = false
      this.img = null
    },
    focus() {
      this.isConfirmPassword = true
    },
    uploadPhoto(img) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        this.imgSrc = reader.result
      })
      reader.readAsDataURL(img)
    }
  },
  watch: {
    img() {
      if (this.img) {
        this.uploadPhoto(this.img)
      }

    }
  }
}
</script>
<style lang='scss'>
.avatar {
  position: relative;
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;

  .upload-photo {
    position: absolute;
    bottom: 15px;
    left: 65px;
    border-radius: 50%;
    background-color: cornflowerblue;

    .v-text-field {
      padding: 0;
      margin: 0;
    }

    .v-input__prepend-outer {
      margin: 0;
      padding: 5px;
    }
  }
}
.v-card__title {
  font-size: 1rem !important;
  line-height: 1rem !important;
}
</style>