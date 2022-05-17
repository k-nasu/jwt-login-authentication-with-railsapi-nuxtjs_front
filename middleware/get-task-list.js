export default async ({ store, $axios }) => {
  if (!store.state.task.list.length) {
    await $axios.$get('/api/v1/tasks')
      .then(tasks => store.dispatch('getTaskList', tasks))
  }
}