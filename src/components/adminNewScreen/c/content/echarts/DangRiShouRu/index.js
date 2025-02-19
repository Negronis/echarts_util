import * as echarts from 'echarts';
let option = {
  color: [
    "#FFA500"
  ],
  grid: {
    left: '2%',
    right: '2%',
    bottom: '20%',
    top: "20%",
  },
  legend: {},
  xAxis: {
    type: 'category',
    data: [],
    axisTick: {
      alignWithLabel: true,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#fff',
        width: 1
      }
    },
    axisLabel: {
      interval: 0,
      fontSize: 16,
      // rotate: -30,
      margin: 6,
      inside: false
    },
    nameTextStyle: {
      fontSize: '15'
    }
  },
  yAxis: {
    type: 'value',
    show: false,
    axisLine: {
      show: false,
      lineStyle: {
        color: "#fff"
      }
    },
    axisLabel: {
      fontSize: 18
    },
    splitLine: {
      show: false,
    }
  },
  dataZoom: [{
      show: false,
      start: 0,
      end: 100
    },
    {
      type: 'inside',
      start: 94,
      end: 100
    },
    {
      show: false,
      yAxisIndex: 0,
      filterMode: 'empty',
      width: 30,
      height: '80%',
      showDataShadow: false,
      left: '93%'
    }
  ],
  series: [{
    // name: "总费用",
    data: [],
    barWidth: '30%',
    type: 'bar',
    label: {
      show: true,
      position: 'outside',
      color: "#fff",
      fontSize: '16'
    },
    itemStyle: {
      normal: { 
        color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [{
                    offset: 0,
                    color: 'rgba(255,165,0,1)'
                },
                {
                    offset: 1,
                    color: 'rgba(255,165,0,0.5)'
                }
            ]
        ) 
      }
    },
  }, ]
};
export default option