import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    height: 0,
    width: window.innerWidth,
    reqTimer: "",
    dateType: "当日",
    deviceType: "pc",
    dpType: "new",
    // 不受时间筛选影响的请求
    dtDateSx: [
      'szjg',
      'fykzmz',
      'fykz'
    ],
    eObject: {}
  },
  getters: {
    getDateType(state) {
      return state.dateType
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
    getEObject(state) {
      return state['eObject']
    }
  },
  mutations: {
    setDateType(state, n) {
      state.dateType = n
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
    setEObject(state, n) {
      let {
        type,
        data
      } = n
      state.eObject[type] = data
    }
  }
})