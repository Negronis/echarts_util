<template>
    <div> 
        <div style="height:150px;width:100%;">
            <div :ref="reff" style="height:150px;width:100%;"></div>
        </div>
    </div>
</template>

<script>
import Echartsinit from '@/common/echarts_init';
import option from './index';
export default {
    props: [
        'reff',
        "title",
        "data"
    ],
    data() {
        return {
            charts: null,
            colorList: ['rgba(45,183,245 , 0.9)', 'rgba(255,151,121 ,0.9 )', 'rgba(48, 236, 166 ,0.9 )', 'rgba(109, 148, 198, 0.9)', 'rgba(255, 255, 255,  0.9)']
            , timerId: ""
        }
    },
    methods: {
        draw() {
            option['angle'] = option['angle'] + 3
            if (this.charts) {
                this.charts.setOption(option, true)
                // return window.requestAnimationFrame(this.draw);
            }
        },
        req(type, data) {
            if (!data) {
                return
            }
            option['series'][8]['data'][0]['value'] = data['value']
            option['series'][9]['data'][0]['value'] = data['value'] 
            if (type) {
                let that = this;
                this.$nextTick(() => {
                    that.charts = Echartsinit.init(
                        that.$refs[that.reff],
                        option
                    );
                });
                if (that.timerId) {
                    clearInterval(that.timerId);
                }
                that.timerId = setInterval(function () {
                    // 用setInterval做动画感觉有问题
                    that.draw()
                }, 100);
                return
            }
            if (that.timerId) {
                clearInterval(that.timerId);
            }
            that.timerId = setInterval(function () {
                //用setInterval做动画感觉有问题
                that.draw()
            }, 100);
        },
        init(type, data) {
            if (type) {
                this.req('init', data)
            } else {
                this.req('', data)
            }
        }
    },
    mounted() {
        this.init('init', this.data)
    }
}
</script>

<style></style>