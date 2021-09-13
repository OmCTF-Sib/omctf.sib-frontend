export const state = () => ({
  competitionName: 'OmCTF.Sib',
  competitionStarted: false,
  maxParticipants: 3,
})
export const mutations = {
  SET_DATA (state, data) {
    state.competitionStarted = data.name
    state.maxParticipants = data.max_participants
    state.comptetitionStarted = data.is_started
  },
}
export const actions = {
  async nuxtServerInit ({ commit }, { axios }) {
    const { data } = await axios.get('/api/v1/settings/')
    commit('SET_DATA', data)
  },
}
export const getters = {
  competitionStarted: state => state.competitionStarted,
  comptetitionStarted: state => state.comptetitionStarted,
  maxParticipants: state => state.maxParticipants,
}
