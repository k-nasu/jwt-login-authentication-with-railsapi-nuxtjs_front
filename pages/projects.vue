<template>
  <div>
    <v-container>
      <v-row
        class="mt-4 mb-10"
      >

        <!-- プロジェクト追加 -->
        <v-col
          :sm="smallCard.sm"
          :md="smallCard.md"
        >
          <v-btn
            block
            :height="smallCard.height"
            :elevation="smallCard.elevation"
            @click="snackbar = true"
          >
            <div>
              <v-icon
                size="24"
                color="main-color"
                class="my-2"
              >
                mdi-plus
              </v-icon>
              <div
                class="caption $main-color--text"
              >
                プロジェクトを追加
              </div>
            </div>
          </v-btn>

          <!-- to-do 機能未開発のため、アラート -->
          <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            color="red accent-2"
            top
          >
            <strong>{{ text }}</strong>

            <template v-slot:action="{ attrs }">
              <v-btn
                text
                v-bind="attrs"
                @click="snackbar = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-col>

        <!-- 最近のプロジェクト表示 -->
        <v-col
          v-for="(project, i) in recentProjects.slice(0, 3)"
          :key="`card-project-${i}`"
          :sm="smallCard.sm"
          :md="smallCard.md"
        >
          <v-card
            block
            :height="smallCard.height"
            :elevation="smallCard.elevation"
            :to="$injected.projectLinkTo(project.id)"
            class="v-btn text-capitalize"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="subtitle-1 mb-2">
                  {{ project.name }}
                </div>
                <v-list-item-title class="text-h4">
                  <strong>遅れなし</strong>
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-avatar
                rounded
                size="60"
                color="mainColor"
              ></v-list-item-avatar>
            </v-list-item>
            <!-- {{ $injected.dateFormat(project.updatedAt) }} -->
          </v-card>
        </v-col>
      </v-row>

    <!-- 全てのプロジェクト表示 -->
      <v-row
        class="mb-10"
      >
        <v-col
          :sm="largeCard.sm"
          :md="largeCard.md"
        >
          <v-data-table
            :headers="tableHeaders"
            :items="recentProjects"
            item-key="id"
            class="elevation-1"
          >
            <template
              v-slot:item.name="{ item }"
            >
              <nuxt-link
                :to="$injected.projectLinkTo(item.id)"
                class="text-decoration-none"
              >
                {{ item.name }}
              </nuxt-link>
            </template>
            <template
              v-slot:item.budget="{ item }"
            >
              {{ item.budget.toLocaleString() }}円
            </template>
            <template
              v-slot:item.members="{ item }"
            >
              <v-badge
                bordered
                bottom
                color="deep-purple accent-4"
                dot
                offset-x="10"
                offset-y="10"
              >
                <v-avatar size="40">
                  <v-img src="https://cdn.vuetifyjs.com/images/lists/3.jpg"></v-img>
                </v-avatar>
              </v-badge>
            </template>
            <template
              v-slot:item.status="{ item }"
            >
              <v-progress-linear
                rounded
                :value="item.status"
                height="20"
                color="success"
              >
                <strong>{{ item.status }}%</strong>
              </v-progress-linear>
            </template>
            <!-- {{ $injected.dateFormat(item.updatedAt) }} -->
          </v-data-table>
        </v-col>

        <!-- タイムライン -->
        <!-- <v-col
          :sm="middleCard.sm"
          :md="middleCard.md"
        >
          <v-card>
            <v-container style="max-width: 600px;">
              <v-timeline
                dense
                clipped
              >
                <v-timeline-item
                  class="white--text mb-12"
                  large
                >
                  <template v-slot:icon>
                    <v-avatar size="40">
                      <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                    </v-avatar>
                  </template>
                  <v-text-field
                    v-model="input"
                    hide-details
                    flat
                    label="Leave a comment..."
                    solo
                    @keydown.enter="comment"
                  >
                    <template v-slot:append>
                      <v-btn
                        class="mx-0"
                        depressed
                        @click="comment"
                      >
                        まだ使用できません
                      </v-btn>
                    </template>
                  </v-text-field>
                </v-timeline-item>

                <v-slide-x-transition
                  group
                >
                  <v-timeline-item
                    v-for="event in timeline"
                    :key="event.id"
                    class="mb-4"
                    color="pink"
                    small
                  >
                    <v-row justify="space-between">
                      <v-col
                        cols="7"
                        v-text="event.text"
                      ></v-col>
                      <v-col
                        class="text-right"
                        cols="5"
                        v-text="event.time"
                      ></v-col>
                    </v-row>
                  </v-timeline-item>
                </v-slide-x-transition>

                <v-timeline-item
                  class="mb-6"
                  hide-dot
                >
                  <span>TODAY</span>
                </v-timeline-item>

                <v-timeline-item
                  class="mb-4"
                  color="grey"
                  icon-color="grey lighten-2"
                  small
                >
                  <v-row justify="space-between">
                    <v-col cols="12">
                      <div>
                        予定
                      </div>
                      <div>
                        15:26 EDT
                      </div>
                    </v-col>
                  </v-row>
                </v-timeline-item>

                <v-timeline-item
                  class="mb-4"
                  small
                >
                  <v-row justify="space-between">
                    <v-col cols="12">
                      <div>
                        <v-chip
                          class="white--text ml-0"
                          color="red"
                          label
                          small
                        >
                          重要
                        </v-chip>
                        予定
                      </div>
                      <div>
                        15:25 EDT
                      </div>
                    </v-col>
                  </v-row>
                </v-timeline-item>

                <v-timeline-item
                  class="mb-4"
                  color="grey"
                  small
                >
                  <v-row justify="space-between">
                    <v-col cols="12">
                      <div>
                        予定
                      </div>
                      <div>
                        15:26 EDT
                      </div>
                    </v-col>
                  </v-row>
                </v-timeline-item>

                <v-timeline-item
                  class="mb-4"
                  hide-dot
                >
                  <v-btn
                    class="mx-0"
                  >
                    まだ使用できません
                  </v-btn>
                </v-timeline-item>

                <v-timeline-item
                  class="mb-4"
                  color="grey"
                  small
                >
                  <v-row justify="space-between">
                    <v-col cols="12">
                      <div>
                        予定
                      </div>
                      <div>
                        15:26 EDT
                      </div>
                    </v-col>
                  </v-row>
                </v-timeline-item>

                <v-timeline-item
                  color="grey"
                  small
                >
                  <v-row justify="space-between">
                    <v-col cols="12">
                     <div>
                        予定
                      </div>
                      <div>
                        15:26 EDT
                      </div>
                    </v-col>
                  </v-row>
                </v-timeline-item>
              </v-timeline>
            </v-container>
          </v-card>
        </v-col> -->
      </v-row>

      <!-- 円グラフ -->
      <!-- <v-row>
        <v-cols
          cols="12"
          v-for="(project, i) in recentProjects.slice(0, 1)"
          :key="`card-project-${i}`"
        >
          <h4 class="mb-2">
            {{ project.name }}
          </h4>
          <v-progress-circular
            :rotate="-90"
            :size="150"
            :width="20"
            :value="value"
            color="primary"
          >
            {{ value }}
          </v-progress-circular>
        </v-cols>
      </v-row> -->
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'logged-in',
  middleware: ['get-project-list'],
  data () {
    return {
      largeCard: {
        sm: 12,
        md: 9
      },
      middleCard: {
        sm: 12,
        md: 3
      },
      smallCard: {
        sm: 6,
        md: 3,
        height: 110,
        elevation: 4
      },
      tableHeaders: [
        {
          text: '名前',
          value: 'name'
        },
        {
          text: '予算',
          value: 'budget'
        },
        {
          text: 'PM',
          value: 'owner'
        },
        {
          text: 'メンバー',
          value: 'members'
        },
        {
          text: '進捗',
          value: 'status'
        },
      ],
      value: 68,
      snackbar: false,
      text: "この機能は、まだ使用できません",
      timeout: 2000
    }
  },
  methods: {
    getColor (progress) {
      if (progress > 400) return 'red'
      else if (progress > 200) return 'orange'
      else return 'green'
    },
  },
  computed: {
    recentProjects () {
      const copyProjects = Array.from(this.$store.state.project.list)
      return copyProjects.sort((a, b) => {
        if (a.updatedAt > b.updatedAt) { return -1 }
        if (a.updatedAt < b.updatedAt) { return 1 }
        return 0
      })
    }
  }
}
</script>

<style lang="scss">

</style>