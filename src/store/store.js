import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        anlass: [], // products from JSON
    },
    mutations: {
        SET_ANSLASS(state, anlass) {
            state.anlass = anlass;
        },
    },
    getters: {
        getAnlass(state) {
            return state.anlass
        },
    },
    actions: {
        async setAnlass({ commit }) {
            const { data } = await axios.get('./products.json').catch(() => {
                // simple error catch
                alert('Unable to get the anlass')
            })
            commit('SET_ANSLASS', data)
        },
    }
})