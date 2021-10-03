// import dependency to handle HTTP request to our back end
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

//to handle state
const state = {
  deliveries: [],
  totalResults: 0,
  totalPages: 0,
  isLoading: false,
  currentPage: 1,
  selectedDelivery: {},
  error: ''
}

//to handle state
const getters = {}

//to handle actions
const actions = {
  async getDeliveries({ commit, state }, data) {
    console.log("data req", data)
    commit('SET_LOADING', true)
    await axios.get(`http://localhost:4000/api/v1/deliveries/filter?dateFrom=${data.from}&dateTo=${data.to}&weight=${data.weight}&limit=${data.limit}&page=${data.page}`)
      .then(async response => {
        console.log("response", response.data.data.deliveries)
        if (state.selectedDelivery && state.selectedDelivery._id && response.data.data.deliveries.length > 0) {
          // let updatedSelected = data.res.data.deliveries.filter((e) => e._id === state.selectDelivery._id)[0];
          response.data.data.deliveries = await response.data.data.deliveries.map((a) => {
            if (a._id === state.selectedDelivery._id) {
              return state.selectedDelivery
            }
            else {
              return a
            }
          })
        }
        let d = {
          req: data,
          res: response.data
        }
        commit('SET_DATA', d)
        commit('SET_LOADING', false)
        commit('SET_ERROR', '')
      }).catch((e) => {
        console.log("E", e.response.data)
        commit('SET_ERROR', e.response.data.message)
        commit('SET_LOADING', false)
      })
  },
  async getOneDelivery({ commit }, id) {
    await axios.get(`http://localhost:4000/api/v1/deliveries/${id}`).then((res) => {
      console.log("getone", res.data.data)
      commit('SELECTED_DELIVERY', res.data.data)
    }).catch((e) => {
      commit('SET_ERROR', e.response.data.message)
      commit('SET_LOADING', false)
    })
  },
  async setCurrentPage({ commit }, data) {
    commit('SET_PAGE', data)
  },
  async selectDelivery({ commit }, data) {
    commit('SELECTED_DELIVERY', data)
  }
}

//to handle mutations
const mutations = {
  SET_DATA(state, data) {
    state.deliveries = data.res.data.deliveries;
    state.totalResults = data.res.data.totalResults;
    state.currentPage = data.req.page;
    state.totalPages = Math.ceil(state.totalResults / data.req.limit);
  },
  SET_LOADING(state, data) {
    state.isLoading = data;
  },
  SET_PAGE(state, data) {
    state.currentPage = data
  },
  SELECTED_DELIVERY(state, data) {
    state.selectedDelivery = data
  },
  SET_ERROR(state, data) {
    state.error = data
  }
}

//export store module
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [vuexLocal.plugin]
})
/** we have just created a boiler plate for our vuex store module**/
