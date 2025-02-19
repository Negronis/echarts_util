<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import store from '@/store'
export default {
  data() {
    return { 
    }
  },
  methods: {

  },
  mounted() {
    if (window.innerWidth < 900) {
      store.commit('setDeviceType', 'android') 
      console.log(store.getters.getDeviceType)
    }else{
      //2024年8月26日 11点58分 pc端
      // localStorage.setItem("tk" , '')
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

::-webkit-scrollbar {
  width: 2px;
  /* 竖向滚动条宽度 */
  height: 2px;
  /* 横向滚动条高度 */
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /* 滚动条样式 */
  -webkit-box-shadow: inset 0 0 3px 000;
  /* 内阴影 */
  background-color: #000;
  /* 滚动条颜色 */
}
</style>
