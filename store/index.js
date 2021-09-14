export const state = () => ({
  competitionName: 'OmCTF.Sib',
  competitionStarted: false,
  maxParticipants: 3,
})
export const mutations = {
  SET_DATA (state, data) {
    state.competitionName = data.name
    state.maxParticipants = data.max_participants
    state.comptetitionStarted = data.is_started
  },
}
export const actions = {
  async nuxtServerInit ({ commit }) {
    const { data } = await this.$axios.get('/api/v1/settings/')
    commit('SET_DATA', data)
  },
}
export const getters = {
  competitionStarted: state => state.competitionStarted,
  competitionName: state => state.competitionName,
  maxParticipants: state => state.maxParticipants,
}
