<template>
  <v-container>
    <h1>{{ $store.state.project.current.name }}</h1>
    <v-divider class="mb-8" />
      <v-spacer></v-spacer>

    <!-- タスク追加 -->
    <v-dialog
      v-model="dialog"
      max-width="500px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="mainColor"
          dark
          class="mb-2"
          v-bind="attrs"
          v-on="on"
        >
          タスク追加
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-form
          @submit.prevent="save"
        >
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="editedItem.name"
                    label="タスク名"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="editedItem.in_charge"
                    label="担当者"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="editedItem.status"
                    label="状態"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="editedItem.started_at"
                    label="開始日"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="editedItem.completed_at"
                    label="終了日"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="mainColor"
              text
              class="mr-5"
              @click="close"
            >
              キャンセル
            </v-btn>
            <v-btn
              type="submit"
              class="mr-5"
              color="mainColor white--text"
            >
              保存
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- タスク削除 -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">本当に削除しますか？</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            color="mainColor"
            text
            class="mr-10"
            @click="closeDelete"
          >
            キャンセル
          </v-btn>
          <v-btn
            color="red white--text"
            @click="deleteItemConfirm"
          >
            削除する
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="recentTasks"
      sort-by="calories"
      item-key="id"
      class="elevation-2"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
          class="mr-6"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  middleware: ['get-task-list'],
  data () {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: '名前',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { 
          text: '担当者', 
          value: 'in_charge' 
        },
        {
          text: '状態',
          value: 'status'
        },
        {
          text: '開始日',
          value: 'started_at'
        },
        {
          text: '終了日',
          value: 'completed_at'
        },
        {
          text: '',
          value: 'actions',
          sortable: false
        },
      ],
      tasks: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        in_charge: '',
        status: 1,
        started_at: '',
        completed_at: '',
      },
      defaultItem: {
        name: '',
        in_charge: '',
        status: 1,
        started_at: '',
        completed_at: '',
      },
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'タスク追加' : 'タスク編集'
    },
    recentTasks () {
      const copyTasks = Array.from(this.$store.state.task.list)
      return copyTasks.sort((a, b) => {
        if (a.updatedAt > b.updatedAt) { return -1 }
        if (a.updatedAt < b.updatedAt) { return 1 }
        return 0
      })
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.tasks = [
        {
        name: '',
        in_charge: '',
        status: 1,
        started_at: '',
        completed_at: '',
        },
      ]
    },

    editItem (item) {
      this.editedIndex = this.tasks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.tasks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.tasks.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.tasks[this.editedIndex], this.editedItem)
      } else {
        this.tasks.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
