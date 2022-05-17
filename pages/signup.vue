<template>
  <user-form-card>
    <template v-slot:user-form-card-content>
      <v-form
        ref="form"
        v-model="isValid"
        @submit.prevent="signup"
      >
        <user-form-name
          :name.sync="params.user.name"
        />
        <user-form-email
          :email.sync="params.user.email"
          placeholder
        />
        <user-form-password
          :password.sync="params.user.password"
          set-validation
        />
        <v-btn
          type="submit"
          :disabled="!isValid || loading"
          :loading="loading"
          block
          color="mainColor"
          class="white--text"
        >
          登録する
        </v-btn>
      </v-form>
    </template>
  </user-form-card>
</template>

<script>
import UserFormName from '~/components/User/UserFormName.vue'
import UserFormEmail from '~/components/User/UserFormEmail.vue'
import UserFormPassword from '~/components/User/UserFormPassword.vue'

export default {
  components: {
    UserFormName,
    UserFormEmail,
    UserFormPassword
  },
  layout: 'before-login',
  data () {
    return {
      isValid: false,
      loading: false,
      params: { user: { name: '', email: '', password: '' } },
      msg: ''
    }
  },
  methods: {
    async signup() {
      this.loading = true
      if (this.isValid) {
        await this.$axios.$post('/api/v1/auth_token', this.params)
          .then(response => this.signupSuccessful(response))
          .catch(error => this.signupFailure(error))
      }
      // setTimeout(() => {
      //   this.formReset()
        this.loading = false
      // }, 1500)
    },
    signupSuccessful (response) {
      this.$router.push('/login')

      msg = '会員登録が成功しました'
      return this.$store.dispatch('getToast', { msg, color: 'info', timeout: 5000 })
    },
    signupFailure (error) {
      if (response && response.status === 404) {
        msg = '会員登録に失敗しました'
        return this.$store.dispatch('getToast', { msg, color: 'danger', timeout: 5000 })
      }
      return this.$injected.apiErrorHandler(response)
    },
    formReset() {
      this.$refs.form.reset()
      for (const key in this.params.user) {
        this.params.user[key] = ''
      }
    },
  }
}
</script>