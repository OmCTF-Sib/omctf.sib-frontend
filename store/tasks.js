export const state = () => ({
  categories: [],
  tasks: [],
  task: {},
})
export const mutations = {
  SET_CATEGORIES (state, data) {
    state.categories = data
  },
  SET_TASKS (state, data) {
    state.tasks = data
  },
  SET_TASK (state, data) {
    state.task = data
  },
}
export const actions = {
  async GET_CATEGORIES ({ commit }) {
    const { data } = await this.$axios.get('/api/v1/tasks/categories/')
    commit('SET_CATEGORIES', data)
  },
  async GET_TASKS ({ commit }, params) {
    const { data } = await this.$axios.get('/api/v1/tasks/', { params })
    commit('SET_TASKS', data)
  },
  async GET_TASK ({ commit }, id) {
    const { data } = await this.$axios.get(`/api/v1/tasks/${id}/`)
    commit('SET_TASK', data)
  },
}
export const getters = {
  categories: state => state.categories,
  tasks: state => state.tasks,
  task: state => state.task,
}
