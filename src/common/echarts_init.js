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
      return Charts;
   };
// 重新调整图表大小
   resize(Charts) {
   // 调用Charts对象的resize方法
      Charts.resize();
   }
}
export default new Echartsinit();