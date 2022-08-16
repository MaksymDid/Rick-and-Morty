export default {
  namespaced: true,
  state: {
    snackbarParams: {
      isOpen: false,
      color: '',
      message: '',
    }
  },
  getters: {},
  mutations: {
    SET_SNACKBAR_PARAMS: (state, params) => state.snackbarParams = params
  },
  actions: {}
}