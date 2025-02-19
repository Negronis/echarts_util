import * as echarts from 'echarts';
let option = {
    color:['rgba(45,183,245 ,1 )','rgba(48, 236, 166 , 1)', 'rgba(255,151,121 , 1)'],
    backgroundColor: 'transparent',
    legend: {
        top: '5', 
        x: 'center',
        textStyle: {
            fontSize: 17,
            // color: 'rgba(101, 213, 255, 1)',
            color: "#fff"
        },
        icon: 'path://M512 881.777778 512 881.777778C716.222629 881.777778 881.777778 716.222629 881.777778 512 881.777778 307.777371 716.222629 142.222222 512 142.222222 307.777373 142.222222 142.222222 307.777371 142.222222 512 142.222222 716.222629 307.777373 881.777778 512 881.777778L512 881.777778ZM512 1024 512 1024C229.230208 1024 0 794.769789 0 512 0 229.230211 229.230208 0 512 0 794.769789 0 1024 229.230211 1024 512 1024 794.769789 794.769789 1024 512 1024L512 1024Z',
        itemWidth: 15, // 设置宽度
        itemHeight: 15, // 设置高度、
        itemGap: 12, // 设置间距, 
    },
    tooltip: {
        show: false,
        trigger: 'axis', //axis , item
        backgroundColor: 'RGBA(0, 49, 85, 1)',
        borderColor: 'rgba(0, 151, 251, 1)',
        borderWidth: 1,
        borderRadius: 0,
        textStyle: {
            color: '#BCE9FC',
            fontSize: 16,
            align: 'left',
        },
    },
    grid: {
        right: '0%',
        top: '15%',
        left: '2%',
        bottom: '10%',
        containLabel: true,
    },
    xAxis: {
        nameTextStyle: {
            color: '#FFF',
        },
        type: 'category',
        boundaryGap: true,
        data: [],
        axisLabel: {
            show:true,
            //坐标轴刻度标签的相关设置。
            interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
            //	margin:15,
            textStyle: {
                color: '#FFF',
                fontStyle: 'normal',
                fontSize: 15,
            },
        },
        axisTick: {
            //坐标轴刻度相关设置。
            show: false,
        },
        axisLine: {
            show: false,
            //坐标轴轴线相关设置
            lineStyle: {
                color: 'rgba(77, 128, 254, 0.2)',
            },
        },
        splitLine: {
            interval: 0,
            show: false, // 开启分割线
            lineStyle: {
                color: 'rgba(6, 88, 142)',
                width: 1,
                type: [6, 3],
            },
        },
    },
    dataZoom: [{
        type: 'slider',
        show: false,
        bottom: '20px',
        borderColor: '#07417a',
        backgroundColor: 'transparent',
        dataBackground: {
            lineStyle: {
                color: 'transparent',
                shadowOffsetY: 0,
            },
            areaStyle: {
                color: 'transparent',
                shadowOffsetY: 0,
            },
        },
        // 拖拽手柄样式 svg 路径
        handleIcon: 'M512 512m-208 0a6.5 6.5 0 1 0 416 0 6.5 6.5 0 1 0-416 0Z M512 192C335.264 192 192 335.264 192 512c0 176.736 143.264 320 320 320s320-143.264 320-320C832 335.264 688.736 192 512 192zM512 800c-159.072 0-288-128.928-288-288 0-159.072 128.928-288 288-288s288 128.928 288 288C800 671.072 671.072 800 512 800z',
        handleColor: '#aab6c6',
        height: 6,
        handleSize: 12,
        showDataShadow: false,
        filterMode: 'filter',
        textStyle: {
            color: '#ccc',
        },
        start: 0,
        end: 100,
    }, ],
    yAxis: [{
            name: '',
            nameTextStyle: {
                color: '#FFF',
            },
            type: 'value',
            // splitNumber: 8,
            axisLabel: {
                show:false,
                textStyle: {
                    color: '#FFF',
                    fontStyle: 'normal',
                    fontSize: 20,
                },
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                interval: 0,
                show: true, // 开启分割线
                lineStyle: {
                  color: 'rgba(6, 88, 142)',
                  width: 1,
                  type: [6, 3],
                },
              }, 
        },
        {
            name: '',
            nameTextStyle: {
                color: '#65d5ff'
            },
            min: 0,
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#233653'
                }
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#233653'
                }
            },
            axisLabel: {
                show: false,
                textStyle: {
                    color: '#78bdf5'
                },
                formatter: function (value) {
                    return value * 100 + '%'
                }
            },
            axisTick: {
                show: false
            }
        }
    ],
    series: [
        {
            name: '',
            type: 'pictorialBar',
            barWidth: '50%',
            label: {
                normal: {
                    show: true,
                    position:'top', 
                    color:'rgba(45,183,245, 0.8)',  
                    fontSize:16,
                    textBorderWidth:1,
                    textBorderColor:"#fff",
                    formatter:(param)=>{
                        return param.value+'%';
                    }
                },
            },
            itemStyle: {
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                                offset: 0.5,
                                color: 'rgba(45,183,245, 0.8)', // 0% 处的颜色
                            },
                            {
                                color: 'rgba(0, 0, 0, 0.1)', // 100% 处的颜色
                                offset: 1,
                            },
                        ],
                        globalCoord: false, // 缺省为 false
                    }, //渐变颜色
                }
            },
            symbol: 'path://M12.000,-0.000 C12.000,-0.000 16.074,60.121 22.731,60.121 C26.173,60.121 -3.234,60.121 0.511,60.121 C7.072,60.121 12.000,-0.000 12.000,-0.000 Z',
            data: [],
        },
        {
            name: '',
            type: 'pictorialBar',
            barWidth: '50%',
            label: {
                normal: {
                    show: true,
                    position:'top',
                    color:'rgba(48, 236, 166,0.8)',
                    fontSize:16,
                    textBorderWidth:1,
                    textBorderColor:"#fff",
                    formatter:(param)=>{
                        return param.value+'%';
                    }
                },
            },
            itemStyle: {
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                                offset: 0.5,
                                color: 'rgba(48, 236, 166,0.8)', // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgba(0, 34, 66, 0.2)', // 100% 处的颜色
                            },
                        ],
                        globalCoord: false, // 缺省为 false
                    }, //渐变颜色
                },
            },
            symbol: 'path://M12.000,-0.000 C12.000,-0.000 16.074,60.121 22.731,60.121 C26.173,60.121 -3.234,60.121 0.511,60.121 C7.072,60.121 12.000,-0.000 12.000,-0.000 Z',

            data: [],
        },
        {
            name: '',
            type: 'pictorialBar',
            barWidth: '50%',
            label: {
                normal: {
                    show: true,
                    position:'top',
                    color:'rgba(255,151,121, 0.8)',  
                    fontSize:16,
                    textBorderWidth:1,
                    textBorderColor:"#fff",
                    formatter:(param)=>{
                        return param.value+'%';
                    }
                },
            },
            itemStyle: {
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                                offset: 0.5,
                                color: 'rgba(255,151,121, 0.8)', // 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgba(255,192,121, 0.2)', // 100% 处的颜色
                            },
                        ],
                        globalCoord: false, // 缺省为 false
                    }, //渐变颜色
                },
            },
            symbol: 'path://M12.000,-0.000 C12.000,-0.000 16.074,60.121 22.731,60.121 C26.173,60.121 -3.234,60.121 0.511,60.121 C7.072,60.121 12.000,-0.000 12.000,-0.000 Z',

            data: [],
        },
        {
            name: '',
            type: 'line',
            data: [],
            smooth: true,
            symbol: 'none',

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
            yAxisIndex: 1, 
        },
        {
            name: '',
            type: 'line',
            data: [],
            smooth: true,
            symbol: 'none',
            lineStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(48, 236, 166, 0.8)'
                    }, {
                        offset: 0.5,
                        color: 'rgba(48, 236, 166, 1)'
                    }, {
                        offset: 1,
                        color: 'rgba(48, 236, 166, 0.8)'
                    }]),
                    shadowColor: 'rgba(48, 236, 166,1)',
                    shadowBlur: 10
                }
            },
            yAxisIndex: 1
        },
        {
            name: '',
            type: 'line',
            data: [],
            smooth: true,
            symbol: 'none', 
            lineStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(255,192,121, 0.3)'
                    }, {
                        offset: 0.5,
                        color: 'rgba(255,192,121, 1)'
                    }, {
                        offset: 1,
                        color: 'rgba(255,192,121, 0.3)'
                    }]),
                    shadowColor: 'rgba(255,192,121,1)',
                    shadowBlur: 10
                }
            },
            yAxisIndex: 1
        },
    ],
};

export default option