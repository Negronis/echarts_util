<template>
    <div>
        <!-- <div
            style="z-index:0;position: absolute;color:#fff;font-size:24px;z-index: 2;left:20px;top:10px;padding-left:3px;border-bottom:1px solid #fff;">
            {{ title }}
        </div> -->
        <div
            style="left:0;box-sizing: border-box;display: flex;justify-content: space-around;text-align: center;position: absolute; width:100%;top:5px;">
            <div style="font-size:24px;border-bottom:1px solid;" v-for="(item, index) in optionsObject" :key="index">
                {{ index }}
            </div>
        </div>

        <div style="height:268px;width:100%;display: flex;">
            <div ref="zb1" style="height:268px;width:25%;"></div>
            <div ref="zb2" style="height:268px;width:25%;"></div>
            <div ref="zb3" style="height:268px;width:25%;margin-top:20px;"></div>
            <div ref="zb4" style="height:248px;width:25%;margin-top:30px;"></div>
        </div>
    </div>
</template>

<script>
import Echartsinit from '@/common/echarts_init';
import option from './index';
export default {
    props: [
        'title', 'data', 'reff'
    ],
    data() {
        return {
            charts: null,
            charts2: null,
            charts3: null,
            charts4: null,
            optionsObject: {
                '各类别占比1': {
                    color: ['#04cab7',  '#fce348', '#fc2d8a',],
                    legend: {
                        orient: 'horizontal',
                        bottom: '10',
                        itemWidth: 10,
                        itemHeight: 10,
                        itemGap: 10,
                        formatter: [
                            '{a|{name}}'
                        ].join('\n'),
                        textStyle: {
                            fontSize: 18,
                            color: "#fff",
                            rich: {
                                a: {
                                    fontSize: 18,
                                    verticalAlign: 'middle',
                                    padding: [0, 0, -3, 5]
                                },
                            },
                        },
                        icon: "rect"
                    },
                    backgroundColor: 'transparent',
                    title: {
                        text: "",
                        left: 'left',
                        top: 5,
                        left: 10,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    series: [{
                        name: '各类别占比1',
                        startAngle: 90,
                        type: 'pie',
                        radius: ['40%', '60%'],
                        avoidLabelOverlap: false,
                        data: [],
                        label: {
                            color: '#fff',
                            position: 'inner',
                            fontSize: 18
                        },
                        labelLine: {
                            lineStyle: {
                                color: '#fff'
                            },
                            smooth: 0,
                            length: 5,
                            length2: 10
                        },
                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }]
                },
                '各类别占比2': {
                    color: ['#04cab7',  '#fce348', '#fc2d8a',],
                    backgroundColor: 'transparent',
                    title: {
                        text: "",
                        left: 'left',
                        top: 5,
                        left: 10,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'horizontal',
                        bottom: '10',
                        itemWidth: 10,
                        itemHeight: 10,
                        itemGap: 5,
                        formatter: [
                            '{a|{name}}'
                        ].join('\n'),
                        textStyle: {
                            fontSize: 18,
                            color: "#fff",
                            rich: {
                                a: {
                                    fontSize: 18,
                                    verticalAlign: 'middle',
                                    padding: [0, 0, -3, 5]
                                },
                            },
                        },
                        icon: "rect"
                    },
                    series: [{
                        name: '各类别占比2',
                        startAngle: 180,
                        type: 'pie',
                        radius: ['20%', '55%'],
                        avoidLabelOverlap: false,
                        data: [],
                        top: "",
                        roseType: 'radius',
                        label: {
                            color: '#fff',
                            position: 'outer',
                            fontSize: 18
                        },
                        labelLine: {
                            lineStyle: {
                                color: '#fff'
                            },
                            smooth: 0,
                            length: 5,
                            length2: 10
                        },
                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }]
                },
                '入院人数各类占比': {
                    backgroundColor: "transparent",
                    color: ['#03acd1', '#04cab7', '#03c781', '#fce348', '#fc2d8a', '#0292fe'],
                    legend: {
                        orient: "vartical",
                        x: "left",
                        top: "center",
                        left: "60%",
                        bottom: "0%",
                        itemWidth: 8,
                        itemHeight: 8,
                        itemGap: 16,
                        textStyle: {
                            fontSize: 18,
                            color: "#fff"
                        },
                        formatter: function (name) {
                            return '' + name
                        }
                    },
                    series: [{
                        type: 'pie',
                        clockwise: false, //饼图的扇区是否是顺时针排布
                        minAngle: 2, //最小的扇区角度（0 ~ 360）
                        radius: ["40%", "70%"],
                        center: ["30%", "50%"],
                        avoidLabelOverlap: false,
                        itemStyle: { //图形样式
                            normal: {
                                borderColor: 'transparent',
                                borderWidth: 6,
                            },
                        },
                        label: {
                            normal: {
                                show: false,
                                position: 'center',
                                formatter: '{text|{b}}\n{c} ({d}%)',
                                rich: {
                                    text: {
                                        color: "#fff",
                                        fontSize: 14,
                                        align: 'center',
                                        verticalAlign: 'middle',
                                        padding: 8
                                    },
                                    value: {
                                        color: "#fff",
                                        fontSize: 24,
                                        align: 'center',
                                        verticalAlign: 'middle',
                                    },
                                }
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: 24,
                                }
                            }
                        },
                        data: []
                    }]
                },
                '门诊人次和各别占比': {
                    colors: ['#03acd1', '#04cab7', '#03c781', '#fce348', '#fc2d8a', '#0292fe'],
                    backgroundColor: 'transparent',
                    tooltip: {
                        trigger: 'item',
                    },
                    series: [
                        // 左饼图
                        {
                            // 饼图圈
                            type: 'pie',
                            zlevel: 3,
                            radius: ['40%', '55%'],
                            itemStyle: {
                                normal: {
                                    borderColor: '#0A1934',
                                    borderWidth: 1,
                                    color: function (params) {
                                        return ['#03acd1', '#04cab7', '#03c781', '#fce348', '#fc2d8a', '#0292fe'][params.dataIndex]
                                    }
                                }
                            },
                            labelLine: {
                                show: false,
                                normal: {
                                    length: 5,
                                    length2: 0,
                                    lineStyle: {
                                        color: 'transparent'
                                    }
                                }
                            },
                            label: {
                                normal: {
                                    formatter: params => {
                                        return '●';
                                    },
                                    color: 'inherit'
                                }
                            },
                            data: [],
                        },
                        {
                            // 最外圆圈
                            type: 'pie',
                            zlevel: 1,
                            silent: true, //取消高亮
                            radius: ['70%', '75%'],
                            itemStyle: {
                                normal: {
                                    color: function (params) {
                                        return ['#03acd1', '#04cab7', '#03c781', '#fce348', '#fc2d8a', '#0292fe'][params.dataIndex]
                                    }
                                }
                            },
                            labelLine: {
                                show: false,
                                normal: {
                                    length: 10,
                                    length2: 0,
                                    lineStyle: {
                                        color: 'transparent'
                                    },
                                }
                            },
                            label: {
                                show: true,
                                color: '#fff',
                                fontSize: '20'
                            },
                            data: [],
                        },
                    ]
                }
            }
        }
    },
    methods: {
        req(type, data) {
            if (!data) {
                return
            }
            let { dObject } = data;
            let k = Object.keys(dObject)
            k.forEach(e => {
                if (this.optionsObject[e]) {
                    this.optionsObject[e]['series'].forEach(el => {
                        el['data'] = dObject[e]
                    })
                    // [0]['data'] = dObject[e]
                }
            })
            // console.log(data)
            // option['xAxis']['data'] = data['x']
            // 总均次药品费用增幅
            // option['series']['0']['data'] = data['d1']
            // 总均次费用增幅
            // option['series']['1']['data'] = data['d1'] 
            if (type) {
                let that = this;
                this.$nextTick(() => {
                    that.charts = Echartsinit.init(
                        that.$refs.zb1,
                        this.optionsObject['各类别占比1']
                    );
                    that.charts2 = Echartsinit.init(
                        that.$refs.zb2,
                        this.optionsObject['各类别占比2']
                    );
                    that.charts3 = Echartsinit.init(
                        that.$refs.zb3,
                        this.optionsObject['入院人数各类占比']
                    );
                    that.charts4 = Echartsinit.init(
                        that.$refs.zb4,
                        this.optionsObject['门诊人次和各别占比']
                    );
                });
                return
            }
            this.charts.setOption(this.optionsObject['各类别占比1'])
            this.charts2.setOption(this.optionsObject['各类别占比2'])
            this.charts3.setOption(this.optionsObject['入院人数各类占比'])
            this.charts4.setOption(this.optionsObject['门诊人次和各别占比'])

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