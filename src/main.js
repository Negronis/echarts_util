import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview';
import Util from '@/common/util' 
import 'iview/dist/styles/iview.css';
import {
  RequestFunc
} from '@/common/apiPost'
// import Echarts
import * as echarts from 'echarts';
//codemirror
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
Vue.use(VueCodemirror)
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false
Vue.prototype.$req = RequestFunc
Vue.prototype.$Util = Util 
Vue.use(iView) 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')