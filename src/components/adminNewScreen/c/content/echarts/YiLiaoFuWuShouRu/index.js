import * as echarts from 'echarts';
let option = {
  backgroundColor: 'transparent',
  color: ['rgba(28, 205, 255)', 'rgba(47, 255, 208)'],
  legend: {
    top: 5,
    icon: 'stack',
    textStyle: {
      fontSize: 16,
      color: '#e0e1e2', // 设置字体颜色
      padding: [0, 0] // 设置文字与图例的距离
    },
    icon: 'path://M512 881.777778 512 881.777778C716.222629 881.777778 881.777778 716.222629 881.777778 512 881.777778 307.777371 716.222629 142.222222 512 142.222222 307.777373 142.222222 142.222222 307.777371 142.222222 512 142.222222 716.222629 307.777373 881.777778 512 881.777778L512 881.777778ZM512 1024 512 1024C229.230208 1024 0 794.769789 0 512 0 229.230211 229.230208 0 512 0 794.769789 0 1024 229.230211 1024 512 1024 794.769789 794.769789 1024 512 1024L512 1024Z',
    itemWidth: 15, // 设置宽度
    itemHeight: 15, // 设置高度、
    itemGap: 12, // 设置间距
    itemStyle: {
      borderWidth: 0
    },
    formatter: function (name) { // 添加 
      return name 
      // + ' (%)'
    },
    itemGap: 20 // 设置图例项之间的间距
  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '15%',
    top: '25%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false, //两侧留白
    axisLine: {
      show: false,
    },
    axisLabel: {
      interval: 0,
      color: ' rgba(255,255,255 , 1)', //更改坐标轴文字颜色
      fontSize: 16, //更改坐标轴文字大小
      // margin: 20
    },
    axisTick: {
      show: false,
      alignWithLabel: true,
      lineStyle: {
        color: 'rgba(2, 119, 175)', // 刻度线颜色
        width: 2, // 刻度线宽度
      },
      length: 6, // 刻度线的长度
    },
    data: [],
  },
  yAxis: [{
    type: 'value',
    // min: "dataMin",
    min: 0,
    // max: 100,
    splitLine: {
      interval: 0,
      show: true, // 开启分割线
      lineStyle: {
        color: 'rgba(6, 88, 142)',
        width: 1,
        type: [6, 3],
      },
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      show:false,
      color: 'rgba(255,255,255 , 1)',
      fontSize: 20,
      // formatter: (e) => {
      //   console.log(e)
      //   return e * 10
      // }
    },
    position: 'left',
  }],
  series: [{
      name: '医疗服务收入占比',
      type: 'line',
      symbol: 'circle',
      symbolSize: 8,
      emphasis: {
        focus: 'series',
      }, 
      
      lineStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(45,183,245, 0.8)'
          }, {
            offset: 0.5,
            color: 'rgba(45,183,245, 1)'
          }, {
            offset: 1,
            color: 'rgba(45,183,245, 0.8)'
          }]),
          shadowColor: 'rgba(45,183,245,1)',
          shadowBlur: 10
        }
      },
      data: [],
      // yAxisIndex: 0,
      smooth: true,
      // symbol: 'none',
      label:{
        show:true,
        position:'top',
        color:'#fff',
        fontSize:16,
        formatter:(e)=>{ 
          return e['value'] + '%'
        }
      },
      // tooltip: {
      //   valueFormatter: function (val) {
      //     return val + '%'
      //   }
      // }
    },

  ]
};
export default option