import { createStore } from 'vuex'

export default createStore({
  state: {
    reminders: [],
  },
  mutations: {
    getAllMutation: (state, payload) => state.reminders = payload.data,

  },
  actions: {
    getAll: async ({ commit }) => {
      const response = await fetch(
        "https://crudcrud.com/api/17a479f9c35d4d58ba4d494b12926472/reminders"
      );

      const result = await response.json();

      commit('getAllMutation', { data: result });

    },

  },
  // modules: {
  // }
})
