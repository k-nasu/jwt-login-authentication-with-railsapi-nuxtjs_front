<template>
  <v-app>
    <!-- tool bar -->
    <logged-in-app-bar
      #navigation-toggle-button
      clippedLeft
    >
        <v-app-bar-nav-icon
          @click="drawer = !drawer"
        />
    </logged-in-app-bar>

    <!-- navigation drawer -->
    <project-navigation-drawer
      :drawer.sync="drawer"
    />
    
    <!-- main content -->
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: ['get-project-list', 'get-current-project'],
  data () {
    return {
      drawer: false
    }
  }
}
</script>
