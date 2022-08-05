const userStore = {
  namespaced: true,
  state: {
    users: [],
    currentUser: {}
  },
  getters: {
    checkUser: ({users}) => ({email, password}) => users.some(user => user.email === email && user.password === password)
  },
  mutations: {
    SET_USERS: (state, user) => state.users.push(user),
    SET_USER: (state, userLog) => state.currentUser = state.users.find( user => user.email === userLog.email),
  },
  actions: {}
}

export default userStore