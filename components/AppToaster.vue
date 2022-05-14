<template>
  <v-snackbar
    v-model="setSnackbar"
    top
    text
    :timeout="toast.timeout"
    :color="toast.color"
  >
    {{ toast.msg }}
    <template v-slot:action="{ attrs }">
      <v-btn
        v-bind="attrs"
        text
        :color="toast.color"
        @click="resetToast"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    // Vuexのtoastオブジェクトを呼び出し & 監視
    toast () {
      return this.$store.state.toast
    },
    setSnackbar: {
      get () { return !!this.toast.msg },
      set (val) { return this.resetToast() && val }
    }
  },
  // Vueインスタンスが破棄される直前にVuexのtoast.msgを削除する
  beforeDestroy () {
    this.resetToast()
  },
  methods: {
    resetToast() {
      return this.$store.dispatch('getToast', {msg: null})
    }
  }
}
</script>