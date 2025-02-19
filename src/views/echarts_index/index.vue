<template>
    <div class='big_screen'>
        <div class="wrapper_img_android">
            <div class="outer_content_android" :style="{ margin: `${sMargin}` }">
                <div class='content_android' :style="{ width: Width + 'px', height: Height + 'px' }">
                    <div class='content_inter_android'
                        :style="{ transform: 'scale(' + scaleX + ',' + scaleY + ')  translate3d(0, 0, 0)', transformOrigin: '0px 0px' }">
                        <div style='position:relative;top:0;left:0;'>
                            <Header @setShowType="setShowType"></Header>
                            <div v-if="showType == '医院概况'" class="dpClass">
                                <Center ref="epCenter"></Center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import store from "@/store";
// 头部  
// import bottomLine from './echarts/line/bottom_line/index.vue';
import Header from '@/components/adminNewScreen/c/header/index.vue'
import Center from '@/components/adminNewScreen/c/content/index.vue' 
export default {
    components: {
        Header,
        Center, 
    },
    data() {
        return {
            bg_src: require('@/assets/gr/bg2.jpg'),
            scaleX: 1,
            scaleY: 1,
            Height: 0,
            Width: 0,
            sMargin: 0,
            //固定的理想屏幕比率
            defaultScaleFactor: 1920 / 1080,
            //固定的理想屏幕宽高
            defaultWidth: 1920,
            defaultHeight: 1080,
            // 竖向 / 横向异形屏
            isVerticalDifferentScreen: false,
            isTransverseDifferentScreen: false,
            isShowComponent: true,
            dateArray: [
                {
                    t: '一季度',
                    data: [
                        {
                            d: "1月"
                        },
                        {
                            d: "2月"
                        },
                        {
                            d: "3月"
                        }
                    ]
                },
                {
                    t: '二季度',
                    data: [
                        {
                            d: "1月"
                        },
                        {
                            d: "2月"
                        },
                        {
                            d: "3月"
                        }
                    ]
                },
                {
                    t: '三季度',
                    data: [
                        {
                            d: "1月"
                        },
                        {
                            d: "2月"
                        },
                        {
                            d: "3月"
                        }
                    ]
                },
            ],
            dateArrayRight: [
                {
                    t: "当日",
                    data: ""
                },
                {
                    t: "昨日",
                    data: ""
                },
                {
                    t: "本周",
                    data: ""
                },
                {
                    t: "上月",
                    data: ""
                },
                {
                    t: "本季",
                    data: ""
                },
                {
                    t: "本年",
                    data: ""
                },
            ],
            showType: "医院概况"
        }
    },
    methods: {
        dateSx(item, index, screenType) {
            this.selectIndex = index
            this.$nextTick(() => {
                if (this.$refs[screenType]) {
                    if (this.$refs[screenType].allInit) {
                        this.$refs[screenType].allInit(item)
                    }
                }
            })
        },
        setShowType(t) {
            this.showType = t
            console.log(t)
        },
        setHeight() {
            if (this.isTransverseDifferentScreen) {
                this.Height = window.innerHeight;
                return;
            }
            if (this.isVerticalDifferentScreen) {
                this.Height = this.defaultHeight * this.scaleY;
                return;
            }
            this.Height = window.innerHeight;
        },
        setWidth() {
            if (this.isTransverseDifferentScreen) {
                this.Width = this.defaultWidth * this.scaleX;
                return;
            }
            if (this.isVerticalDifferentScreen) {
                this.Width = window.innerWidth;
                return;
            }
            this.Width = window.innerWidth;
        },
        setSMargin() {
            if (this.isTransverseDifferentScreen) {
                if (((window.innerWidth - (this.Width)) / 2) < 0) {
                    this.sMargin = `0`;
                    return;
                }
                this.sMargin = `0 ${((window.innerWidth - (this.Width)) / 2)}px`;
                return;
            }
            if (this.isVerticalDifferentScreen) {
                this.sMargin = `${(window.innerHeight - (this.Height)) / 2}px 0`;
                return;
            }
            this.sMargin = `0`;
        },
        // 是否是异形屏
        changeScreenType() {
            let thisScaleFactor = window.innerWidth / window.innerHeight;
            // x < 1.777
            if (thisScaleFactor < this.defaultScaleFactor) {
                this.isVerticalDifferentScreen = true;
                this.isTransverseDifferentScreen = false;
            }
            // x > 1.777
            if (thisScaleFactor > this.defaultScaleFactor) {
                this.isTransverseDifferentScreen = true;
                this.isVerticalDifferentScreen = false;
            }
            if (thisScaleFactor === this.defaultScaleFactor) {
                this.isVerticalDifferentScreen = false;
                this.isTransverseDifferentScreen = false;
            }
        },
        changeScale() {
            this.changeScreenType();
            if (this.isTransverseDifferentScreen) {
                this.scaleX = window.innerHeight / this.defaultHeight;
                this.scaleY = window.innerHeight / this.defaultHeight;
            }
            if (this.isVerticalDifferentScreen) {
                this.scaleX = window.innerWidth / this.defaultWidth;
                this.scaleY = window.innerWidth / this.defaultWidth;
            }
            this.setWidth();
            this.setHeight();
            this.setSMargin();
        },
        init() {
            this.changeScreenType();
            this.changeScale()
        }
    },
    created() {
        this.init();
        let throttle = (fn, interval) => {
            let timer = null;
            return () => {
                if (timer) {
                    return;
                }
                timer = setTimeout(() => {
                    clearTimeout(timer);
                    timer = null;
                    typeof fn === 'function' ? fn() : "";
                }, interval)
            };
        }
        var _onresize = window.onresize || function () { };
        window.onresize = () => {
            throttle(this.changeScale, 500)();
            throttle(_onresize(), 500)();
        }
    },
}
</script>
<style>
.outer_content_android {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    box-sizing: border-box;
    transform: translate3d(0, 0, 0);
}

.wrapper_img_android {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: 114.5% 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    box-sizing: border-box;
    background-image: url(~@/assets/gr/bg2.jpg);
    /* border-right:.5px solid #fff; */
}

.content_android {
    background-image: url(~@/assets/gr/bg2.jpg);
    margin: 0 auto;
    overflow: hidden;
    box-sizing: border-box;
    background-size: 100% 100%;
}

.content_inter_android {
    transition: 0.5s linear all;
    width: 1920px;
    height: 1080px;
    overflow: hidden;
}

.content_inter_android .ivu-input {
    height: 80px;
    font-size: 25px;
}

.content_inter_android .ivu-input-suffix {
    top: 23px;
    height: auto;
}

.content_inter_android .ivu-input-prefix i,
.ivu-input-suffix i {
    font-size: 25px;
}

.dpClass {
    padding: 10px;
    background: transparent;
    height: calc(100vh - 88.6px);
    color: #fff;
}

.lc1Bg,
.lBarBg,
.rgBg,
.rzBg,
.cBottomBg {
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.lHeaderBg {
    background-image: url(~@/assets/gr/you1.png);
    background-size: cover;
}

.lc1Bg {
    background-image: url(~@/assets/gr/1.png);
}

.lBarBg {
    background-image: url(~@/assets/gr/2.png);
}

.rgBg {
    background-image: url(~@/assets/gr/3.png);
}

.rzBg {
    background-image: url(~@/assets/gr/4.png);
}

.cBottomBg {
    background-image: url(~@/assets/gr/kuang1.png);

}

.alarmType_bg {
    background-image: url(~@/assets/big_screen/rightTable.png);
}

.alert_bg {
    background-image: url(~@/assets/big_screen/alert.png);
}

.defectTreatment_bg {
    background-image: url(~@/assets/big_screen/hos_status.png);
}

.keyRisks_bg {
    background-image: url(~@/assets/big_screen/keyRisks.png);
}

.rightTable_bg {
    background-image: url(~@/assets/big_screen/rightTable.png);
}

.smallSquare_bg {
    background-image: url(~@/assets/big_screen/smallSquare.png);
}

.statusStatistics_bg {
    background-image: url(~@/assets/big_screen/statusStatistics.png);
}

.instantaneousFlow_bg {
    background-image: url(~@/assets/big_screen/instantaneousFlow_BG.png);
}

.line_bg {
    background-image: url(~@/assets/big_screen/longBorderRadius_square.png);
}
</style>