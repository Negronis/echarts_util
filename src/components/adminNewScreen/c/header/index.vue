<template>
    <div>
        <div class="zhHeader">
            <div style="width:145px;display: flex;align-items: center;margin-left:10px;position: absolute;right:10px;">
                <img src="@/assets/gr/logo.png" style="filter:brightness(100)" width="100%" />
            </div>

            <div class="zHTitle">
                <div style="height: 40px">
                    <img src="@/assets/gryyLogoS.png" alt="">
                </div>
                <div>
                    秦皇岛市工人医院综合数据管理中心
                </div>
            </div>
            <div style="position: absolute;left:10px;font-size:18px;margin-top:10px;">
                <!-- 数据最后更新时间 -->
                <div>
                    {{ date_sfm }}
                </div>
            </div>
        </div>
        <!-- <div style="display: flex;color:#fff;border:1px">
            <div class="fHeaderBlock" @click="clickType(item['title'])" v-for="(item, key) in titleList" :key="key">
                <Icon :type="item['icon']" />
                {{ item['title'] }}
            </div>
        </div> -->
    </div>

</template>

<script>
import store from '@/store'
export default {
    computed: {
        time() {
            return store.getters.getReqTimer
        }

    },
    data() {
        return {
            date_sfm: "Loading..",
            titleList: [
                {
                    title: "今日医院",
                    icon: "ios-add-circle"
                },
                {
                    title: "医疗质量",
                    icon: "ios-keypad"
                },
                {
                    title: "运营效率",
                    icon: ""
                },
            ],
            timer: null
        }
    },
    methods: {
        changType(i) {
            store.commit("setDpType", i)
        },
        clickType(t) {
            this.$emit("setShowType", t)
        }
    },
    mounted() {
        this.timer = setInterval(() => {
            let date = new Date();
            this.date_sfm =
                date.getFullYear() +
                "年" +
                (+(date.getMonth() + 1) < 9
                    ? "0" + (date.getMonth() + 1)
                    : date.getMonth() + 1) +
                "月" +
                (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
                "日" +
                " " +
                (+date.getHours() > 9 ? date.getHours() : "0" + date.getHours()) +
                ":" +
                (+date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()) +
                ":" +
                (+date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds());
        }, 1000);
    },
    destroyed() {
        clearInterval(this.timer)
    }
}
</script>

<style>
.fHeaderBlock {
    text-align: center;
    width: 20%;
    /* border: 1px solid aqua; */
    padding: 10px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    margin: 0 10px;
    background-image: url(~@/assets/jx/kuang.png);
    background-size: cover;
    background-repeat: no-repeat;
}

.zhHeader {
    width: 100%;
    height: 86px;
    /* background: #5cadff; */
    color: #fff;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    background-image: url(~@/assets/jx/ding.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.zhHeader_block_dh {
    background-image: url(~@/assets/jx/daohang.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 50px;
    width: 130px;
    line-height: 46px;
    text-align: center;
}

.zHTitle {
    font-size: 28px;
    margin-top: -20px;
    font-weight: bold;
    background-image: linear-gradient(180deg, #ffffff 28.65%, #1efff4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: flex;
    align-items: center;
}

.zHTitle img {
    width: 40px;
    margin-right: 5px;
    filter: brightness(100)
}
</style>