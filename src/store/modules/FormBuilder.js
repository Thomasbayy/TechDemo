export default {
  state: () => ({
    form: [],
  }),
  mutations: {
    setForm(state, payload) {
      state.form = (payload);
    },
  },
  getters: {
    getForm: (state) => state.form,
  },
  namespaced: true,
};
