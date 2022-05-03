<template>
  <user-form-card>
    <template v-slot:user-form-card-content>
      <v-form
        ref="form"
        v-model="isValid"
      >
        <user-form-email
          :email.sync="params.user.email"
        />
        <user-form-password
          :password.sync="params.user.password"
        />
        <v-card-actions>
          <nuxt-link
            to="#"
            class="body-2 text-decoration-none"
          >
            パスワードを忘れた場合
          </nuxt-link>
        </v-card-actions>
        <v-card-text
          class="px-0"
        >
          <v-btn
            :disabled="!isValid || loading"
            :loading="loading"
            block
            color="mainColor"
            class="white--text"
            @click="login"
          >
            ログインする
          </v-btn>
        </v-card-text>
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
      params: { user: { email: '', password: '' } }
    }
  },
  methods: {
    login () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1500)
    }
  }
}
</script>