<template>
  <v-app-bar
    app
    :height="topAppBarHeight"
    color="$white-color"
  >
    <nuxt-link
      to="/"
      class="text-decoration-none"
    >
      <app-logo />
    </nuxt-link>

    <app-title
      class="hidden-mobile-and-down"
    />

    <v-spacer />

    <app-signup-button />
    <app-login-button />
  </v-app-bar>
</template>

<script>
import AppLoginButton from '../AppLoginButton.vue'
import AppSignupButton from '../AppSignupButton.vue'
export default {
  components: { AppSignupButton, AppLoginButton },
  data ({ $store }) {
    return {
      topAppBarHeight: $store.state.styles.topAppBarHeight
    }
  }
}
</script>

<style>

</style>