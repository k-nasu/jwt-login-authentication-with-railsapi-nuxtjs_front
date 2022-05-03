<template>
  <user-form-card>
    <template v-slot:user-form-card-content>
      <v-form
        ref="form"
        v-model="isValid"
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
          :disabled="!isValid || loading"
          :loading="loading"
          block
          color="mainColor"
          class="white--text"
          @click="signup"
        >
          登録する
        </v-btn>
      </v-form>
    </template>
  </user-form-card>
</template>

<script>
import UserFormName from '~/components/atom/UserFormName.vue'
import UserFormEmail from '~/components/atom/UserFormEmail.vue'
import UserFormPassword from '~/components/atom/UserFormPassword.vue'

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
      params: { user: { name: '', email: '', password: '' } }
    }
  },
  methods: {
    signup() {
      this.loading = true
      setTimeout(() => {
        this.formReset()
        this.loading = false
      }, 1500)
    },
    formReset() {
      this.$refs.form.reset()
      for (const key in this.params.user) {
        this.params.user[key] = ''
      }
    }
  }
}
</script>