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

    <before-login-app-signup-button />
    <before-login-app-login-button />
  </v-app-bar>
</template>

<script>
export default {
  data ({ $store }) {
    return {
      topAppBarHeight: $store.state.styles.topAppBarHeight
    }
  }
}
</script>

<style>

</style>