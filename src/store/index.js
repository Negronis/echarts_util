import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    height: 0,
    width: window.innerWidth,
    reqTimer: "",
    deviceType: "pc",
    dpType: "new",
    //要修改的数据
    changeNode: {}
  },
  getters: {
    getChangeNode(state) {
      return state.changeNode
    },
    getReqTimer(state) {
      return state.reqTimer
    },
    getWidth(state) {
      return state.width;
    },
    getHeight(state) {
      return state.height;
    },
    getDeviceType(state) {
      return state.deviceType
    },
    getDpType(state) {
      return state.dpType
    },
  },
  mutations: {
    setChangeNode(state, n) {
      state.changeNode = n;
    },
    setReqTimer(state, n) {
      state.reqTimer = n
    },
    setHeight(state, n) {
      state.height = n;
    },
    setWidth(state, n) {
      state.width = n;
    },
    setDeviceType(state, n) {
      state.deviceType = n;
    },
    setDpType(state, n) {
      state.dpType = n
    },
  }
})