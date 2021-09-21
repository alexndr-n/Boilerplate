export const state = () => ({
  notification: null,
  display: false,
  id: 0,
})

export const mutations = {
  setNotification(state, notification) {
    state.notification= {
    id: state.id,
    type: notification.type,
    text: notification.text
    }
    state.display = true
    state.id++
  },

  resetNotification(state) {
    state.notification= null
    state.display = false
    state.id = 0
    }
}

export const actions = {
  setNotification({commit, dispatch, state}, notification){
    commit('setNotification', notification)

    setTimeout(() => {
      commit('resetNotification')
    }, 10000);
  }
}