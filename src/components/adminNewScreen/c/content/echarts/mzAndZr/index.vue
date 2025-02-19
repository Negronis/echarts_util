<template>
    <div style="position: relative;">
        <div style="height:380px;width:100%;">
            <div :ref='reff' style="height:380px;width:100%;"></div>
        </div>
    </div>
</template>

<script>
import Echartsinit from '@/common/echarts_init';
import option from './index';
import store from '@/store'
export default {
    props: [
        'reff',
        "title",
        "data"
    ],
    data() {
        return {
            charts: null,
        }
    },
    methods: {
        setSerise(datas) {
            var color = [
                "rgba(35,142,35,.8)",
                "rgba(206,48,49,.8)",
                "rgba(247,178,0,.8)",
                "rgba(135,31,120,.8)",
                "rgba(255,255,255,.8)",
                // "rgba(156,207,49,.8)"
                "rgba(0,191,255,1)"

            ];
            let arr = []
            datas.forEach(eee => {
                let t = eee.map((ea, index) => {
                    return {
                        value: ea.value,
                        name: ea.name,
                        itemStyle: {
                            normal: {
                                borderWidth: 2,
                                borderColor: color[index],
                                shadowColor: color[index],
                                shadowBlur: 30
                            },
                        },
                    }
                })
                arr.push(t)
            })
            return arr
        },
        req(type, data) {
            if (!data) {
                return
            }
            let { dObject } = data;
            let d1 = dObject['入院人数各类占比']
            let d2 = dObject['门诊人次和各别占比']
            //处理d2 算百分比
            let d1Sum = d1.reduce((prev, cur) => {
                return prev + cur['value']
            }, 0)
            let d2Sum = d2.reduce((prev, cur) => {
                return prev + cur['value']
            }, 0)
            d1.forEach(ed => {
                ed['value'] = Number(((ed['value'] / d1Sum) * 100).toFixed(1))
            })
            d2.forEach(ed => {
                ed['value'] = Number(((ed['value'] / d2Sum) * 100).toFixed(1))
            })
            let opData = this.setSerise([d1, d2])
            option['series'][0]['data'] = opData[0]
            option['series'][1]['data'] = opData[1]
            if (type) {
                let that = this;
                this.$nextTick(() => {
                    that.charts = Echartsinit.init(
                        that.$refs['mzAndZr'],
                        option,
                        'mzAndZr'
                    );
                });
                return
            } 
            this.charts.setOption(option)
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