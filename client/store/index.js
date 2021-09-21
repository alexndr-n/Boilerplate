import cookie from 'cookie'
import { setAuthToken, resetAuthToken } from '~/utils/auth'
export const actions = {
    nuxtServerInit({ dispatch }, context) {
        return new Promise((resolve, reject) => {
            const cookies = cookie.parse(context.req.headers.cookie || '')
            if (cookies.hasOwnProperty('x-access-token') && cookies.hasOwnProperty('vuex')) {
                setAuthToken(cookies['x-access-token'])
                context.app.$axios.setToken(cookies['x-access-token'])
                const data = cookies['vuex'];
                dispatch('auth/fetch', data)
                    .then(result => {
                        resolve(true)
                    })
                    .catch(error => {
                        console.log('Provided token is invalid:', error)
                        resetAuthToken()
                        resolve(false)
                    })
            } else {
                resetAuthToken()
                dispatch('auth/fetch')
                resolve(false)
            }
        })
    },
}