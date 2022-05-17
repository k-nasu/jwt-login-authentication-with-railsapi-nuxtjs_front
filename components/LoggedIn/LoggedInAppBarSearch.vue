
<template>
  <v-menu
    app
    offset-x
    offset-y
    max-width="200"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        v-on="on"
      >
        <v-icon>
          mdi-magnify
        </v-icon>
      </v-btn>
    </template>
    <!-- <v-list>
      <template v-for="(menu, i) in menus">
        <v-divider
          v-if="menu.divider"
          :key="`menu-divider-${i}`"
        />

        <v-list-item
          :key="`menu-list-${i}`"
          :to="{ name: menu.name }"
        >
          <v-list-item-icon
            class="mr-2"
          >
            <v-icon
              size="22"
              v-text="menu.icon"
            />
          </v-list-item-icon>
          <v-list-item-title>
            {{ $injected.pageTitle(menu.name) }}
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list> -->
  </v-menu>
</template>

<script>
export default {
  data () {
    return {
      menus: [
        { name: 'account-settings', icon: 'mdi-account-cog' },
        { name: 'account-password', icon: 'mdi-lock-outline' },
        { name: 'logout', icon: 'mdi-logout-variant', divider: true }
      ]
    }
  }
}
</script>
