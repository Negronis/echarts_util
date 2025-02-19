function //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
getCirlPoint(x0, y0, r, angle) {
    let x1 = x0 + r * Math.cos(angle * Math.PI / 180)
    let y1 = y0 + r * Math.sin(angle * Math.PI / 180)
    return {
        x: x1,
        y: y1
    }
}
let option = {
    angle: 0,
    backgroundColor: '#000E1A',
    title: {
        text: '{a|' + '}{c|%}',
        x: 'center',
        y: 'center',
        textStyle: {
            rich: {
                a: {
                    fontSize: 48,
                    color: '#29EEF3'
                },

                c: {
                    fontSize: 20,
                    color: '#ffffff',
                    // padding: [5,0]
                }
            }
        }
    }, 
    series: [
        // 紫色
        {
            name: "ring5",
            type: 'custom',
            coordinateSystem: "none",
            renderItem: function (params, api) {
                return {
                    type: 'arc',
                    shape: {
                        cx: api.getWidth() / 2,
                        cy: api.getHeight() / 2,
                        r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                        startAngle: (0 + option.angle) * Math.PI / 180,
                        endAngle: (90 + option.angle) * Math.PI / 180
                    },
                    style: {
                        stroke: "#8383FA",
                        fill: "transparent",
                        lineWidth: 1.5
                    },
                    silent: true
                };
            },
            data: [0]
        },
        {
            name: "ring5", //紫点
            type: 'custom',
            coordinateSystem: "none",
            renderItem: function (params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6;
                let point = getCirlPoint(x0, y0, r, (90 + option.angle))
                return {
                    type: 'circle',
                    shape: {
                        cx: point.x,
                        cy: point.y,
                        r: 4
                    },
                    style: {
                        stroke: "#8450F9", //绿
                        fill: "#8450F9"
                    },
                    silent: true
                };
            },
            data: [0]
        },
        // 蓝色
        {
            name: "ring5",
            type: 'custom',
            coordinateSystem: "none",
            renderItem: function (params, api) {
                return {
                    type: 'arc',
                    shape: {
                        cx: api.getWidth() / 2,
                        cy: api.getHeight() / 2,
                        r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                        startAngle: (180 + option.angle) * Math.PI / 180,
                        endAngle: (270 + option.angle) * Math.PI / 180
                    },
                    style: {
                        stroke: "#4386FA",
                        fill: "transparent",
                        lineWidth: 1.5
                    },
                    silent: true
                };
            },
            data: [0]
        },
        {
            name: "ring5", // 蓝色
            type: 'custom',
            coordinateSystem: "none",
            renderItem: function (params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6;
                let point = getCirlPoint(x0, y0, r, (180 + option.angle))
                return {
                    type: 'circle',
                    shape: {
                        cx: point.x,
                        cy: point.y,
                        r: 4
                    },
                    style: {
                        stroke: "#4386FA", //绿
                        fill: "#4386FA"
                    },
                    silent: true
                };
            },
            data: [0]
        },
        {
            name: "ring5",
            type: 'custom',
            coordinateSystem: "none",
            renderItem: function (params, api) {
                return {
                    type: 'arc',
                    shape: {
                        cx: api.getWidth() / 2,
                        cy: api.getHeight() / 2,
                        r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
                        startAngle: (270 + -option.angle) * Math.PI / 180,
                        endAngle: (40 + -option.angle) * Math.PI / 180
                    },
                    style: {
                        stroke: "#0CD3DB",
                        fill: "transparent",
                        lineWidth: 1.5
                    },
                    silent: true
                };
            },
            data: [0]
        },
        // 橘色
        {
            name: "ring5",
            type: 'custom',
            coordinateSystem: "none",
            renderItem: function (params, api) {
                return {
                    type: 'arc',
                    shape: {
                        cx: api.getWidth() / 2,
                        cy: api.getHeight() / 2,
                        r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
                        startAngle: (90 + -option.angle) * Math.PI / 180,
                        endAngle: (220 + -option.angle) * Math.PI / 180
                    },
                    style: {
                        stroke: "#FF8E89",
                        fill: "transparent",
                        lineWidth: 1.5
                    },
                    silent: true
                };
            },
            data: [0]
        },
        {
            name: "ring5",
            type: 'custom',
            coordinateSystem: "none",
            renderItem: function (params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65;
                let point = getCirlPoint(x0, y0, r, (90 + -option.angle))
                return {
                    type: 'circle',
                    shape: {
                        cx: point.x,
                        cy: point.y,
                        r: 4
                    },
                    style: {
                        stroke: "#FF8E89", //粉
                        fill: "#FF8E89"
                    },
                    silent: true
                };
            },
            data: [0]
        },
        {
            name: "ring5", //绿点
            type: 'custom',
            coordinateSystem: "none",
            renderItem: function (params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65;
                let point = getCirlPoint(x0, y0, r, (270 + -option.angle))
                return {
                    type: 'circle',
                    shape: {
                        cx: point.x,
                        cy: point.y,
                        r: 4
                    },
                    style: {
                        stroke: "#0CD3DB", //绿
                        fill: "#0CD3DB"
                    },
                    silent: true
                };
            },
            data: [0]
        },
        
        {
            name: '吃猪肉频率',
            type: 'pie',
            radius: ['52%', '40%'],
            silent: true,
            clockwise: true,
            startAngle: 90,
            z: 0,
            zlevel: 0,
            label: {
                normal: {
                    position: "center",

                }
            },
            data: [{
                //这里加数据
                value: '',
                name: "",
                itemStyle: {
                    normal: {
                        color: { // 完成的圆环的颜色
                            colorStops: [{
                                    offset: 0,
                                    color: '#A098FC' // 0% 处的颜色
                                },
                                {
                                    offset: 0.3,
                                    color: '#4386FA' // 0% 处的颜色
                                },
                                {
                                    offset: 0.6,
                                    color: '#4FADFD' // 0% 处的颜色
                                },
                                {
                                    offset: 0.8,
                                    color: '#0CD3DB' // 100% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#646CF9' // 100% 处的颜色
                                }
                            ]
                        },
                    }
                }
            }, ]
        },
        {
            name: '吃猪肉频率',
            type: 'pie',
            radius: ['32%', '35%'],
            silent: true,
            clockwise: true,
            startAngle: 270,
            z: 0,
            zlevel: 0,
            label: {
                normal: {
                    position: "center",

                }
            },
            data: [{
                value: '',
                name: "",
                itemStyle: {
                    normal: {
                        color: { // 完成的圆环的颜色
                            colorStops: [{
                                offset: 0,
                                color: '#00EDF3' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#646CF9' // 100% 处的颜色
                            }]
                        },
                    }
                }
            }, ]
        },

    ]
};
export default option