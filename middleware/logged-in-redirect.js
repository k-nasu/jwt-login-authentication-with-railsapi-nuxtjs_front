export default ({ $auth, store, route, redirect}) => {
  // ログイン済ユーザーをリダイレクト
  const redirectPath = store.state.loggedIn.redirectPath
  if ($auth.loggedIn() && redirectPath.includes(route.name)) {
    return redirect(store.state.loggedIn.homePath)
  }
}