export const state = () => ({
  notifications: [],
})
export const mutations = {
  SET_NOTIFICATIONS (state, notifications) {
    state.notifications = notifications
  },
}
export const actions = {
  async GET_NOTIFICATIONS ({ commit }, params) {
    const { data } = await this.$axios.get('/api/v1/notifications/', { params })
    commit('SET_NOTIFICATIONS', data)
  },
}
export const getters = {
  notifications: state => state.notifications,
}
