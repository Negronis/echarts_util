<template>
    <div>
        <div
            style="position: absolute;color:#fff;font-size:24px;z-index: 2;left:20px;top:10px;padding-left:3px;border-bottom:1px solid #fff;">
            {{ title || '' }}
        </div>
        <div style="height:300px;width:100%;">
            <div :ref="reff" style="height:300px;width:100%;"></div>
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
            charts: null
        }
    },
    methods: {
        req(type, data) {
            if (!data) {
                return
            } 
            option['xAxis']['data'] = data['x']
            option['series']['0']['data'] = data['d1']
            // option['series']['1']['data'] = data['d2'] 
            // option['series']['2']['data'] = data['d3'] 
            if (type) {
                let that = this;
                this.$nextTick(() => {
                    that.charts = Echartsinit.init(
                        that.$refs[this.reff],
                        option
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
                this.req(''  , data)
            }
        }
    },
}
</script>

<style></style>