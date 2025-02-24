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
    //树节点对象， 用于构建树节点
    treeDataObject: {},
    //树节点总数据 - 用来控制树节点子组件
    treeData: {},
    //树节点中，要修改的数据
    changeNode: {},
    //生成代码
    code: ``
  },
  getters: {
    getCode(state) {
      return state.code
    },
    getTreeDataObject(state) {
      return state.treeDataObject
    },
    getTreeData(state) {
      return state.treeData
    },
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
    setCode(state, n) {
      state.code = n
    },
    setTreeDataObject(state, n) {
      state.treeDataObject = n
    },
    setTreeData(state, n) {
      state.treeData = n;
    },
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