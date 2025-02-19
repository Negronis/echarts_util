var colorList = ['rgba(45,183,245 , .8)', 'rgba(255,151,121 , .8)', 'rgba(48, 236, 166 , .8)', 'rgba(247,178,0,.8)'];
var center = ['50%', '50%'];
let option = {
    color: colorList,
    series: [
        // 外边设置
        {
            type: 'pie',
            center: center,
            radius: ['55%', '70%'],
            itemStyle: {
                color: 'rbga(255,255,255,.5)',
            },
            data:[],
            label: {
                show: true,
                position:'inside',
                overflow: 'no',
                formatter: function (params) { 
                    return `{b|${params.value || ""}}{c|${params['data']['unit']}}` 
                },
                rich: { 
                    b: {
                        fontSize: '13px',
                        fontFamily: 'MicrosoftYaHei-Bold, MicrosoftYaHei',
                        color: '#fff',
                        padding: [5, 0, 0, 0],
                        fontWeight: 'bold'
                    },
                    c:{
                        fontSize: '13px',
                        fontFamily: 'MicrosoftYaHei-Bold, MicrosoftYaHei',
                        color: '#fff', 
                        padding: [5, 0, 0, 0],
                        fontWeight: 'bold' 
                    }
                }
            },  
        },
        // 展示层
        {
            type: 'pie',
            center: center,
            radius: ['25%', '70%'],
            itemStyle: {
                borderWidth: 5, //描边线宽
                borderColor: '#fff',
            },
            label: {
                show: true,
                position: 'outside',
                backgroundColor: '#fff',
                distanceToLabelLine: 0,
                borderRadius: 3, 
                alignTo:'labelLine',
                overflow: 'no',
                backgroundColor: "transparent", 
                formatter: function (params) { 
                    // {b|${params.value || ""}}{c|${params['data']['unit']}}
                    return `{a|${params.name}}` 
                },
                rich: {
                    a: {
                        fontSize: '13px',
                        fontFamily: 'MicrosoftYaHei',
                        fontWeight: 'bold',
                        color: '#fff'
                    }, 
                }
            },
            labelLine: {
                show: true,
                normal: {
                    length: 10,
                    length2: 5,
                    align: 'right',
                    lineStyle: {
                        width: 2
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: (parmas) => { 
                        return {
                            type: 'linear',
                            x: 0,
                            y: 1,
                            x2: 0,
                            y2: 0,
                            colorStops: [{
                                    offset: 0,
                                    color: colorList[parmas['dataIndex']].replace('.8', '1'), // 0% 处的颜色
                                },
                                {
                                    color: colorList[parmas['dataIndex']].replace('.8', '0.5'), // 100% 处的颜色
                                    offset: 1,
                                },
                            ],
                            globalCoord: true, // 缺省为 false
                        } //渐变颜色
                    },
                    shadowColor: colorList[0],
                    shadowBlur: 20
                },
            },
            data: [],
        },
    ],
}
export default option