import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isMenuVisible: true
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        }
    }
})

export default store

