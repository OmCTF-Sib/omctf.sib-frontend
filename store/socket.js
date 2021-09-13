export const state = () => ({
  socket: null,
})
export const mutations = {
  SET_SOCKET (state, socket) {
    state.socket = socket
  },
  CLOSE_SOCKET (state) {
    if (state.socket) {
      state.socket.close()
    }
  },
}
export const actions = {
  CREATE_SOCKET ({ commit }) {
    const socket = new WebSocket(`wss://${process.env.BASE_WSS_URL}/ws/notifications/`)
    socket.onopen = () => {}
    socket.onclose = () => {}
    socket.onmessage = event => {
      const res = JSON.parse(event.data)
      if (res.method === 'news') {
        this.$notify({
          width: 500,
          type: 'warning',
          classes: 'notification',
          group: 'notifcations',
          title: event.title,
          text: event.description,
          position: 'top right',
          duration: 5000,
        })
      }
      commit('SET_SOCKET', socket)
    }
  },
}
export const getters = {
  socket: state => state.socket,
}
