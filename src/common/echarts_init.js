import * as echarts from 'echarts';
import store from '@/store'
class Echartsinit {
   echarts = echarts;
   init(dom, option, type) {
      if (!dom) {
         return {}
      }
      let Charts = (this.echarts).init(dom);
      if (option) {
         Charts.setOption(option);
      } 
      //暂时不用Vuex存储Echars
      // if (type) {
      //    store.commit("setEObject", {
      //       type:type,
      //       data:Charts
      //    })
      // }
      return Charts;
   };
   resize(Charts) {
      Charts.resize();
   }
}
export default new Echartsinit();