<template>
    <div style="position: relative;height:410px;">
        <div>
            <div style="width:40%;height:150px;padding:5px;margin-left:30%;" class="JunCiBg">
                <div class="Title_cxk" style="margin-top:-5px">DIP科室结余（{{ month }}）</div>
                <vue-seamless-scroll ref="scrollSeamLess" :data="k" :class-option="classOption" class="warp"
                    style="color:rgba(45, 183, 245, 1);width:100%">
                    <div class="asdH" v-for="(item, index) in k" :key="index"
                        :style="{ background: index % 2 == 0 ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)', color: (+item['医保结余']) > 0 ? 'rgba(48, 236, 166 , 1)' : 'rgba(255,151,121 , 1)' }">
                        <div style="flex:2;">{{ item['科室名称'] }}</div>
                        <!-- <div style="flex:1;text-align: center;">{{ (+item['CMI']) < 1 ? '0' + item['CMI'] : item['CMI']
                            }}</div> -->
                        <div style="flex:1;text-align: right;">{{ item['医保结余'] }}</div>
                    </div>
                </vue-seamless-scroll>
            </div>
        </div>
        <div class="BingZhongBg" style="position: absolute;width:100%;bottom:0px;padding:0 5px;">
            <div class="Title_cxk" style="display: flex;justify-content: space-around;">
                <div style="flex:1;">
                    职工：{{ showData['职工医保结余'] || '获取中' }}
                </div>
                <div style="flex:1;">
                    居民：{{ showData['居民医保结余'] || '获取中' }}
                </div>
                <div style="flex:2;">
                    DIP病种正/负结余（{{ month }}）
                </div>
            </div>
            <div style="display: flex;">
                <div style="width:50%;border-right:1px solid rgb(36,89,150)">
                    <vue-seamless-scroll ref="scrollSeamLess" :data="f" :class-option="classOption" class="warp"
                        style="color:rgba(48, 236, 166 , 1);width:100%;height:218px; ">
                        <div class="asdH" v-for="(item, index) in z" :key="index"
                            :style="{ background: index % 2 == 0 ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)' }">
                            <div style="flex:2;">{{ item['病种名称'] }}</div>
                            <!-- <div style="flex:1;text-align: center;">{{ (+item['CMI']) < 1 ? '0' + item['CMI'] : item['CMI']
                                }}</div> -->
                            <div style="flex:1;text-align: right;">{{ item['医保结余'] }}</div>
                        </div>
                    </vue-seamless-scroll>
                </div>
                <div style="width:50%;">
                    <!-- rgba(255,151,121 , 1) -->
                    <vue-seamless-scroll ref="scrollSeamLess" :data="z" :class-option="classOption" class="warp"
                        style="color:rgba(255,151,121 , 1);height:218px; ">
                        <div class="asdH" v-for="(item, index) in f" :key="index"
                            :style="{ background: index % 2 == 0 ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)' }">
                            <div style="flex:2;">{{ item['病种名称'] }}</div>
                            <!-- <div style="flex:1;text-align: center;">{{ (+item['CMI']) < 1 ? '0' + item['CMI'] : item['CMI']
                                }}</div> -->
                            <div style="flex:1;text-align: right;">{{ item['医保结余'] }}</div>
                        </div>
                    </vue-seamless-scroll>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
    components: {
        vueSeamlessScroll
    },
    data() {
        return {
            k: [],
            z: [],
            f: [],
            showData: {
                "居民医保结余": "",
                "职工医保结余": ""
            },
            classOption: {
                direction: 1,
                step: 0.5,
                //单步停顿
                // singleHeight: 35
            },
            month: ""
        }
    },
    methods: {
        init(t, data) {
            let { d } = data
            let ks = d['科室结余']
            if (ks.length != 0) {
                let m = ks[0]['月份'].split('-')
                this.month = +(m[1]) + '月'
            }
            let z = d['病种正结余']
            let f = d['病种负结余']
            this.k = ks;
            this.f = f;
            this.z = z;
            for (let i in d) {
                if (this.showData[i] != undefined) {
                    this.showData[i] = d[i]
                }
            }
        }
    }
}
</script>

<style>
.warp {
    height: 113px;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    box-sizing: border-box;
    font-family: '黑体';
    font-weight: bold;
}

.warp ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
}

.warp li,
.warp a {
    display: block;
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    color: rgba(45, 183, 245, 1);
}

.asdH {
    display: flex;
    font-size: 18px;
    justify-content: space-between;
    /* border: 1px solid; */
    align-items: center;
    padding: 5px;
}

.Title_cxk {
    font-size: 20px;
    border-bottom: 1px solid rgb(36, 89, 150);
}

.abcdH {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center
}

.dianc {
    width: 10px;
    height: 10px;
    background: rgba(45, 183, 245, 1);
    margin-right: 10px;
    border-radius: 50%;
}

/* text-shadow: 0 0 5px rgba(48, 236, 166 , 1),0 0 20px rgba(48, 236, 166 , 1),0 0 5px rgba(48, 236, 166 , 1),0 0 100px rgba(48, 236, 166 , 1) */
</style>