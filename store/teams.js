export const state = () => ({
  teams: [],
})
export const mutations = {
  SET_TEAMS (state, teams) {
    state.teams = teams
  },
}
export const actions = {
  async GET_TEAMS ({ commit }, params) {
    const { data } = await this.$axios.get('/api/v1/notifications/', { params })
    commit('SET_TEAMS', data)
  },
}
export const getters = {
  teams: state => state.teams,
}
