<template>
    <div> 
        <div style="height:330px;width:100%;">
            <div :ref="reff" style="height:330px;width:100%;"></div>
        </div>
    </div>
</template>

<script>
import Echartsinit from '@/common/echarts_init';
import "echarts-gl";
// import option from './index';
export default {
    props: [
        'reff',
        "title",
        "data"
    ],
    data() { 
        return {
            charts: null,
            option: null,
            colorList: ['rgba(45,183,245 , 0.9)',  'rgba(48, 236, 166 ,0.9 )', 'rgba(255,151,121 ,0.9 )','rgba(109, 148, 198, 0.9)', 'rgba(255, 255, 255,  0.9)']

        }
    },
    methods: {
        // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
        getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
            // 计算
            let midRatio = (startRatio + endRatio) / 2;

            let startRadian = startRatio * Math.PI * 2;
            let endRadian = endRatio * Math.PI * 2;
            let midRadian = midRatio * Math.PI * 2;

            // 如果只有一个扇形，则不实现选中效果。
            // if (startRatio === 0 && endRatio === 1) {
            //     isSelected = false;
            // }
            isSelected = false;
            // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
            k = typeof k !== 'undefined' ? k : 1 / 3;

            // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
            let offsetX = isSelected ? Math.sin(midRadian) * 0.1 : 0;
            let offsetY = isSelected ? Math.cos(midRadian) * 0.1 : 0;

            // 计算高亮效果的放大比例（未高亮，则比例为 1）
            let hoverRate = isHovered ? 1.05 : 1;

            // 返回曲面参数方程
            return {
                u: {
                    min: -Math.PI,
                    max: Math.PI * 3,
                    step: Math.PI / 32,
                },

                v: {
                    min: 0,
                    max: Math.PI * 2,
                    step: Math.PI / 20,
                },

                x: function (u, v) {
                    if (u < startRadian) {
                        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
                    }
                    if (u > endRadian) {
                        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
                    }
                    return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
                },

                y: function (u, v) {
                    if (u < startRadian) {
                        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
                    }
                    if (u > endRadian) {
                        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
                    }
                    return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
                },

                z: function (u, v) {
                    if (u < -Math.PI * 0.5) {
                        return Math.sin(u);
                    }
                    if (u > Math.PI * 2.5) {
                        return Math.sin(u) * h * 0.1;
                    }
                    return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
                },
            };
        },
        // 生成模拟 3D 饼图的配置项
        getPie3D(pieData, internalDiameterRatio) {
            let series = [];
            let sumValue = 0;
            let startValue = 0;
            let endValue = 0;
            let legendData = [];
            let k =
                typeof internalDiameterRatio !== 'undefined'
                    ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
                    : 1 / 3;

            // 为每一个饼图数据，生成一个 series-surface 配置
            for (let i = 0; i < pieData.length; i++) {
                sumValue += pieData[i].value;

                let seriesItem = {
                    name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
                    type: 'surface',
                    parametric: true,
                    wireframe: {
                        show: false,
                    },
                    pieData: pieData[i],
                    pieStatus: {
                        selected: false,
                        hovered: false,
                        k: 1 / 10,
                    },
                };

                if (typeof pieData[i].itemStyle != 'undefined') {
                    let itemStyle = {};

                    typeof pieData[i].itemStyle.color != 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null;
                    typeof pieData[i].itemStyle.opacity != 'undefined'
                        ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
                        : null;

                    seriesItem.itemStyle = itemStyle;
                }
                series.push(seriesItem);
            }

            // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
            // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
            for (let i = 0; i < series.length; i++) {
                endValue = startValue + series[i].pieData.value;

                series[i].pieData.startRatio = startValue / sumValue;
                series[i].pieData.endRatio = endValue / sumValue;
                series[i].parametricEquation = this.getParametricEquation(
                    series[i].pieData.startRatio,
                    series[i].pieData.endRatio,
                    false,
                    false,
                    k,
                    series[i].pieData.value
                );

                startValue = endValue;

                legendData.push(series[i].name);
            }

            // // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
            series.push({
                name: 'mouseoutSeries',
                type: 'surface',
                parametric: true,
                wireframe: {
                    show: false,
                },
                itemStyle: {
                    opacity: 0.1,
                    color: '#E1E8EC',
                },
                parametricEquation: {
                    u: {
                        min: 0,
                        max: Math.PI * 2,
                        step: Math.PI / 20,
                    },
                    v: {
                        min: 0,
                        max: Math.PI,
                        step: Math.PI / 20,
                    },
                    x: function (u, v) {
                        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
                    },
                    y: function (u, v) {
                        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
                    },
                    z: function (u, v) {
                        return Math.cos(v) > 0 ? -0.5 : -5;
                    },
                },
            });

            // // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
            series.push({
                name: 'mouseoutSeries',
                type: 'surface',
                parametric: true,
                wireframe: {
                    show: false,
                },
                itemStyle: {
                    opacity: 0.1,
                    color: 'rgba(101, 153, 164, 0.24)',
                },
                parametricEquation: {
                    u: {
                        min: 0,
                        max: Math.PI * 2,
                        step: Math.PI / 20,
                    },
                    v: {
                        min: 0,
                        max: Math.PI,
                        step: Math.PI / 20,
                    },
                    x: function (u, v) {
                        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
                    },
                    y: function (u, v) {
                        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
                    },
                    z: function (u, v) {
                        return Math.cos(v) > 0 ? -5 : -7;
                    },
                },
            });
            series.push({
                name: 'mouseoutSeries',
                type: 'surface',

                parametric: true,
                wireframe: {
                    show: false,
                },
                itemStyle: {
                    opacity: 0.1,
                    color: '#E1E8EC',
                },
                parametricEquation: {
                    u: {
                        min: 0,
                        max: Math.PI * 2,
                        step: Math.PI / 20,
                    },
                    v: {
                        min: 0,
                        max: Math.PI,
                        step: Math.PI / 20,
                    },
                    x: function (u, v) {
                        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2.2;
                    },
                    y: function (u, v) {
                        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2.2;
                    },
                    z: function (u, v) {
                        return Math.cos(v) > 0 ? -7 : -7;
                    },
                },
            })
            // 准备待返回的配置项，把准备好的 legendData、series 传入。
            let option = {
                // animation: false,
                backgroundColor: 'transparent',
                fontFamily: '黑体',
                legend: {
                    icon: 'none',
                    orient: 'vertical', 
                    data: pieData.map((dItem, dIndex) => {  
                        return {
                            ...dItem,
                            textStyle: {
                                rich: {
                                    iconName: {
                                        width: 10,
                                        height: 24,
                                        borderRadius: 0,
                                        backgroundColor: this.colorList[dIndex], 
                                    },
                                    value:{
                                        color:this.colorList[dIndex]
                                    },
                                    percent: {
                                        color: this.colorList[dIndex],
                                    },
                                }
                            },

                        }
                    }), 
                    right: '5%',
                    top: '30%',
                    itemGap: 30,
                    itemWidth: 12,
                    itemHeight: 12,
                    selectedMode: false, // 关闭图例选择
                    textStyle: {
                        color: '#fff',
                        fontSize: 30,
                        fontFamily: 'Source Han Sans CN',
                        rich: {
                            // iconName: {
                            //   width: 5,
                            //   height: 8,
                            //   backgroundColor: '#ff00ff'
                            // },
                            name: {
                                color: '#FFF',
                                fontSize: 30,
                                width: 80,
                                padding: [0, 0, 0, 10],
                            },
                            value: {
                                color: '#2d8cf0',
                                fontFamily: '黑体',
                                fontSize: 30,
                                width: 80,
                                padding: [0, 50, 0, 10],
                                align: "left",
                                fontWeight: 'bold', 
                            },
                            percent: {
                                color: '#2BDFD4',
                                fontFamily: '黑体',
                                fontSize: 30,
                                padding: [0, 0, 0, 0]
                            },
                            unit: {
                                color: '#ACDCE4',
                                fontSize: 30, 
                                padding: [0, 0, 0, 5]
                            }
                        }
                    },
                    formatter: name => {
                        let obj = pieData.find(item => item.name === name); 
                        let datas = pieData;
                        let total = 0;
                        let target = obj.value
                        for (let i = 0; i < datas.length; i++) {
                            total += Number(datas[i].value);
                        }
                        
                        //修改legend在这里
                        let bfb = ((target / total) * 100).toFixed(2) 
                        const arr = [
                            `{iconName|}{name|${name}}{value|${obj.showValue}}{percent|${bfb}}{unit|%}`
                        ]; 
                        return arr.join('')
                    }
                },
                xAxis3D: {},
                yAxis3D: {},
                zAxis3D: {},
                grid3D: {
                    viewControl: {
                        autoRotate: true, // 自动旋转
                    },
                    left: '4%',
                    width: '40%',
                    show: false,
                    boxHeight: 30,
                },
                series: series,
            };
            return option;
        },
        req(type, data) {
            if (!data) {
                return
            }
            let { d } = data
            let serData = d.map((dItem, index) => {
                return {
                    ...dItem,
                    value: Number(dItem.value),
                    itemStyle: {
                        color: this.colorList[index]
                    },
                }
            }) 
            this.option = this.getPie3D(serData, 0.5)
            if (type) {
                let that = this;
                this.$nextTick(() => {
                    that.charts = Echartsinit.init(
                        that.$refs[this.reff],
                        that.option
                    );
                });
                return
            }
            this.charts.setOption(this.option)
        },
        init(type, data) {
            if (type) {
                this.req('init', data)
            } else {
                this.req('', data)
            }
        }
    },
}
</script>

<style></style>