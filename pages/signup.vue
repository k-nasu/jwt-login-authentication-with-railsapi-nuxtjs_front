<template>
  <user-form-card>
    <template v-slot:user-form-card-content>
      <v-form
        v-model="isValid"
      >
        <user-form-name />
        <user-form-email />
        <user-form-password />
        <v-btn
          :disabled="!isValid"
          block
          dark
          color="mainColor"
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
      isValid: false
    }
  }
}
</script>