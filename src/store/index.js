import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    session: null
  },
  mutations: {
    addSession (state, value) {
      state.session = value
    }
  },
  actions: {
  },
  modules: {
  }
})
