let option = {
    color:[
        'aqua'
    ],
    title: {

    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        top: 10,
        textStyle: {
            fontSize: 20,
            color: "#fff"
        }
    },
    grid: {
        left: '2%',
        right: '2%',
        bottom: '5%',
        top: '28%',
        containLabel: true
    },
    toolbox: {

    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        lineStyle: {
            color: '#fff',
            width: 0.5
        },
        axisLabel: {
            interval: 0,
            fontSize: 20,
            color: "#fff"
        },
        nameTextStyle: {
            fontSize: '25',
            color: "#fff"
        },
        data: []
    },
    yAxis: {
        type: 'value',
        axisLine: {
            show: false,
            lineStyle: {
                color: "#fff"
            }
        },
        axisLabel: {
            fontSize: 15,
            show: false,
        },
        splitLine: {
            show: false
        }
    },
    series: [{
            name: '门诊均次费用增幅',
            type: 'line',
            stack: 'Total',
            areaStyle: {
                opacity:0.2
            },
            label: {
                show: true,
                position: 'top',
                color:"inherit",
                fontSize:18, 
            },
            lineStyle: {
                normal: {
                    width: 2
                }
            },
            itemStyle: {
                normal: {  
                    borderWidth:5
                }
            }, 
            symbolSize:20,
            data: []
        },
        // {
        //     name: '总均次费用增幅',
        //     type: 'line',
        //     stack: 'Total',
        //     data: []
        // },
    ]
};
export default option