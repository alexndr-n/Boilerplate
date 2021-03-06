import api from '~/api'
import { setAuthToken, resetAuthToken } from '~/utils/auth'
import cookies from 'js-cookie'

export const state = () => ({
    user: null
})

export const mutations = {
    set_user(store, data) {
        store.user = data
    },
    reset_user(store) {
        store.user = null
    }
}

export const actions = {

    fetch({ commit }, data) {
        return api.auth.verifyToken()
            .then(response => {
                commit('set_user', JSON.parse(data).auth.user)
                return response
            })
            .catch(error => {
                commit('reset_user')
                error
            })
    },
    
    login({ commit }, data) {
        return api.auth.login(data).then(response => {
            commit('set_user', response.data.user)
                + setAuthToken(response.data.token)
                + cookies.set('x-access-token', response.data.token, { expires: 7 })
            return response
        })
    },
    
    reset({ commit }) {
        commit('reset_user')
            + resetAuthToken()
            + cookies.remove('x-access-token')
        return Promise.resolve()
    }
}