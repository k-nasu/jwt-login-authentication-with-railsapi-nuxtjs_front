<template>
  <v-container>
    <v-form
      ref="form"
      v-model="isValid"
      @updatePassword.prevent="signup"
    >
      <h3>新しいパスワードを入力する</h3>
      <user-form-password
        :password.sync="params.user.password"
        set-validation
      />
      <!-- <v-btn
        type="submit"
        :disabled="!isValid || loading"
        :loading="loading"
        block
        color="mainColor"
        class="white--text"
      >
        更新する
      </v-btn> -->
      <v-btn
        type="submit"
        disabled
        :loading="loading"
        block
        color="mainColor"
        class="white--text"
      >
        更新する
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import UserFormPassword from '~/components/User/UserFormPassword.vue'

export default {
  components: {
    UserFormPassword
  },
  data () {
    return {
      isValid: false,
      loading: false,
      params: { user: { name: '', email: '', password: '' } }
    }
  },
  methods: {
    // updatePassword() {
    //   this.loading = true
    //   setTimeout(() => {
    //     this.formReset()
    //     this.loading = false
    //   }, 1500)
    // },
    // formReset() {
    //   this.$refs.form.reset()
    //   for (const key in this.params.user) {
    //     this.params.user[key] = ''
    //   }
    // }
  }
}
</script>