export default {
  namespaced: true,
  state: {
    users: [],
    currentUser: {}
  },
  getters: {
    checkUser: ({users}) => ({email, password}) => users.some(user => user.email === email && user.password === password),
    checkUserRegistration: ({users}) => (email) => users.some(user => user.email === email),
    isLogged: ({currentUser}) => !!Object.keys(currentUser).length
  },
  mutations: {
    SET_USERS: (state, user) => state.users.push(user),
    SET_USER: (state, userLog) => state.currentUser = state.users.find( user => user.email === userLog.email),
    LOG_OUT: state => state.currentUser = {},
    EDIT_USER: (state, editUser) => {
      state.currentUser = editUser
      state.users.forEach((item, index) => {
       if (item.email === editUser.email) {
         state.users[index] = editUser
       }
      })
    },
  },
  actions: {}
}