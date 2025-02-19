<template>
    <div> 
        <div style="height:194px;width:100%;position: relative;">
            <div :ref="reff" style="height:194px;width:100%;">
            </div>
            <div style="position: absolute;bottom:53px;left:34%;width:100px;text-align: center;font-size:20px;line-height:20px;">
                {{ title }}
            </div>
        </div>
    </div>
</template>

<script>
import Echartsinit from '@/common/echarts_init';
// import option from './index';
export default {
    props: [
        'reff', 'title', 'datas' , 'color'
    ],
    data() {
        return { 
            charts: null,
            timer: null,
            option: {
                backgroundColor: "transparent",
                title: {
                    text: '',
                    x: 'center',
                    y: 'center',
                    top: 70,
                    textStyle: {
                        color: '#fff',
                        fontSize: 25,
                    },
                    subtextStyle: {
                        color: "green"
                    }
                },
                series: [{
                    type: 'pie',
                    radius: ['70%', '90%'],
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
                        value: [],
                        name: "",
                        itemStyle: { 
                            normal: {
                                color:"#2db7f5",
                            }
                        }
                    },
                    {
                        value: [],
                        name: "",
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "rgba(255,255,255,.2)"
                            }
                        }
                    }
                    ]
                }]
            }
        }
    },
    methods: {
        req(type) { 
            this.option['title']['text'] = `${this.datas}%`
            this.option['series'][0]['data'][0]['value'] = this.datas  
            this.option['series'][0]['data'][0]['itemStyle']['normal']['color'] = this.color  
            this.option['series'][0]['data'][1]['value'] = (('' + this.datas).length * 100) - this.datas
            if (type) {
                let that = this;
                this.$nextTick(() => {
                    that.charts = Echartsinit.init(
                        that.$refs[this.reff],
                        this.option
                    );
                });
                return
            }
            this.charts.setOption(this.option)
        },
        init(type) {
            if (type) {
                this.req('init')
            } else {
                this.req()
            }
        }
    },
    mounted() {
        this.init('init')
    }
}
</script>

<style></style>