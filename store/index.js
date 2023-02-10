export const state = () => ({
    token: null,
    user: null,
    step: 1,
    isUserLoggedIn: false,
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: '',
    drawer: null,
    cartCount: 0,
})

export const mutations = {
    increment(state) {
        state.counter++
    },
    SET_BAR_IMAGE(state, payload) {
        state.barImage = payload
    },
    SET_DRAWER(state, payload) {
        state.drawer = payload
    },
    setToken(state, token) {
        state.token = token
        if (token) {
            state.isUserLoggedIn = true
        } else {
            state.isUserLoggedIn = false
        }
    },
    setUser(state, user) {
        state.user = user
    },        
    setStep(state, step) {
        state.step = step
    },
    setCartCount(state, count) {
        state.cartCount = count
    },
}

export const actions={
    setToken({ commit }, token) {
        commit('setToken', token)
    },
    setUser({ commit }, user) {
        commit('setUser', user)
    },
    setStep({ commit }, step) {
        commit('setStep', step)
    },        
    setCartCount({commit}, count) {
        commit('setCartCount',count)
    },

}