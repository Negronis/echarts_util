<template>
    <div>
        <div
            style="z-index:0;position: absolute;color:#fff;font-size:24px;z-index: 2;left:20px;top:10px;padding-left:3px;border-bottom:1px solid #fff;">
            {{ title }}
        </div>
        <div style="height:268px;width:100%;">
            <div ref="lines" style="height:268px;width:100%;"></div>
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
        }
    },
    methods: {
        req(type, data) {
            if (!data) {
                return
            } 
            option['xAxis']['data'] = data['x']
            // 总均次药品费用增幅
            option['series']['0']['data'] = data['d1']
            // 总均次费用增幅
            // option['series']['1']['data'] = data['d1']
            console.log(option)
            if (type) {
                let that = this;
                this.$nextTick(() => {
                    that.charts = Echartsinit.init(
                        that.$refs.lines,
                        option
                    );
                });
                return
            }
            this.charts.setOption(option)
        },
        init(type, data) {
            if (type) {
                this.req('init' , data)
            } else {
                this.req('' , data)
            }
        }
    }, 
}
</script>

<style></style>