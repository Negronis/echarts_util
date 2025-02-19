let option = {
    color: [
        "#00FFFF",
        "#FF4500",
        "#FFFF00",
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
        top: '32%',
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
            fontSize: '25'
        },
        data: []
    },
    yAxis: {
        type: 'log',
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
        },
        min: function (value) {
            return value.min
        },
        max: function (value) {
            return value.max
        }
    },
    series: [
        {
            name: '总均次费用',
            type: 'line',
            areaStyle: {
                opacity: 0.2
            },
            label: {
                show: true,
                position: 'top',
                color: "inherit",
                fontSize: 18,
            },
            lineStyle: {
                normal: {
                    width: 2
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 5
                }
            },
            symbolSize: 15,
            data: []
        }, {
            name: '总均次药品费用',
            type: 'line',
            areaStyle: {
                opacity: 0.2
            },
            label: {
                show: true,
                position: 'top',
                color: "inherit",
                fontSize: 18,
            },
            lineStyle: {
                normal: {
                    width: 2
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 5
                }
            },
            symbolSize: 15,
            data: []
        },
        {
            name: '门诊均次费用',
            type: 'line',
            areaStyle: {
                opacity: 0.2
            },
            label: {
                show: true,
                position: 'top',
                color: "inherit",
                fontSize: 18,
            },
            lineStyle: {
                normal: {
                    width: 2
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 5
                }
            },
            symbolSize: 15,
            data: []
        },
    ]
};
export default option