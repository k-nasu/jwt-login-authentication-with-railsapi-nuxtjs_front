<template>
  <v-card
    class="mx-auto"
  >
    <v-navigation-drawer
      v-model="setDrawer"
      floating
      expand-on-hover
      clipped
      app
      :mobileBreakpoint="mobileBreakpoint"
      color="whiteColor"
    >
      <v-list>
        <!-- サイドバーの要素 -->
        <v-list-item
          class="px-2"
        >
          <v-badge
            bordered
            bottom
            color="deep-purple accent-4"
            dot
            offset-x="10"
            offset-y="10"
            v-on="on"
          >
            <v-avatar size="40">
              <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
            </v-avatar>
          </v-badge>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ $auth.user.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
        nav
      >
        <v-list-item-group
          v-model="selectedItem"
          color="mainColor"
        >
          <template
            v-if="$route.name !== 'projects' && $route.name !== 'account-password' && $route.name !== 'account-settings' "
          >
            <v-list-item
              :to="homePath"
            >
              <v-list-item-icon>
                <v-icon>
                  mdi-home
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>
                  ホーム
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              v-for="(nav, i) in navMenus"
              :key="`nav-${i}`"
              :to="$injected.projectLinkTo($route.params.id, nav.name)"
            >
              <v-list-item-icon>
                <v-icon v-text="nav.icon" />
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>
                  {{ $injected.pageTitle(nav.name) }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <div class="pa-3">
          <logged-in-app-bar-search />
        </div>
        <div class="pa-3">
          <logged-in-app-bar-account-menu />
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: null
    }
  },
  data ({ $store }) {
    return {
      messages: 2,
      mobileBreakpoint: 960,
      homePath: $store.state.loggedIn.homePath,
      navMenus: [
        { name: 'project-id-dashboard', icon: 'mdi-desktop-mac-dashboard' },
        { name: 'project-id-kanban', icon: 'mdi-view-dashboard-variant' },
        { name: 'project-id-gantt', icon: 'mdi-chart-timeline' },
        { name: 'project-id-wiki', icon: 'mdi-pencil' },
        { name: 'project-id-settings', icon: 'mdi-cog' },
        { name: 'project-id-help', icon: 'mdi-help-circle' }
      ]
    }
  },
  computed : {
    setDrawer: {
      get () { return this.drawer },
      set (newVal) { return this.$emit('update:drawer', newVal)}
    },
    isLessThanMobileBreakpoint () {
      const windowWidth = this.$vuetify.breakpoint.width
      return this.mobileBreakpoint > windowWidth
    }
  }
}
</script>