export default async ({ store, $axios }) => {
  if (!store.state.project.list.length) {
    await $axios.$get('/api/v1/projects')
      .then(projects => store.dispatch('getProjectList', projects))
  }
}