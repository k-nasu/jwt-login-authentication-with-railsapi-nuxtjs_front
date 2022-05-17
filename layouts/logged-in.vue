<template>
  <v-app>
    <project-navigation-drawer
      :drawer.sync="drawer"
    />
    <v-main
      class="pa-0"
    >
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: ['authentication']
}
</script>
