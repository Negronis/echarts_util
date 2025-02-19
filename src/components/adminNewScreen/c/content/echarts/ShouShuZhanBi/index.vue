<template>
    <div>
        <div style="height:240px;width:100%;">
            <div :ref="reff" style="height:240px;width:100%;"></div>
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
            option['series']['0']['data'] = data['d']['三级占比']
            // option['series']['3']['data'] = data['d']
            option['series']['1']['data'] = data['d']['手术占比']
            option['series']['2']['data'] = data['d']['微创占比']
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
                this.req('', data)
            }
        }
    },
}
</script>

<style></style>