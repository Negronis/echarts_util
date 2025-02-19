<template>
    <div class="AndroidContent">
        <div style="width:630px; height:120px;">
            <div style="font-size:28px;text-align: center;padding:8px;position: relative;">
                <div style="position: relative;z-index:999999;top:0;" class="TitleMdfk">
                    今日医院
                </div>
                <div class="titleBg" style="z-index:1;position: absolute;top:0;height:61px;width: 100%;left:0;">
                </div>
            </div>
            <div style="display: flex;font-size: 20px;text-align: center;" class="MenJiZhenLiangBg">
                <div style="flex:1;">
                    <div>门急诊人次</div>
                    <div>{{ topDataList['实时门诊人数'] }}</div>
                </div>
                <div style="flex:1;">
                    <div>在院人次</div>
                    <div>{{ topDataList['实时在院人数'] }}</div>
                </div>
            </div>
            <div style="display: flex;font-size: 20px;text-align: center;" class="MenJiZhenLiangBg">
                <div style="flex:1;">
                    <div>入院人次</div>
                    <div>{{ topDataList['实时入院人数'] }}</div>
                </div>
                <div style="flex:1;">
                    <div>出院人次</div>
                    <div>{{ topDataList['实时出院人数'] }}</div>
                </div>
            </div>
            <!-- <div
                style="display: flex;font-size: 20px;text-align: center;width: 100%;align-items: center;display: flex;margin-top:1px;"> -->
            <!-- <div class="tpBgCenter" style="flex:1;">
                    <div>手术台次（）</div>
                    <div>{{ topDataList['手术台次'] }}</div>
                </div> -->
            <!-- <div class="tpBg" style="flex:1;">
                    <div>门急诊均次费用</div>
                    <div>{{ topDataList['门诊均次费用'] }}</div>
                </div> -->
            <!-- <div class="tpBgCenter" style="flex:1;">
                    <div>均次药品费用</div>
                    <div>{{ topDataList['均次药品费用'] }}</div>
                </div> -->

            <!-- <div style="flex:1;border:1px solid;;">
                    <div>出院人数</div>
                    <div>{{ 0 }}</div>
                </div> -->
            <!-- </div> -->
        </div>
        <!-- 各类收入占比（实时） -->
        <div style="width:631px;height:339px;position: absolute;left:0px;bottom:0;" class="ShouRuZhanBiBg">
            <DangRiShouRu v-if="DangRiShouRuMsg == ''" ref="DangRiShouRu" :reff="'DangRiShouRu'">
            </DangRiShouRu>
            <Loading ref="LoadingDangRiShouRu" v-else :msg="DangRiShouRuMsg"></Loading>
        </div>
        <!-- 入院/门诊人数及占比 -->
        <div style="width:630px;height:500px;position: absolute;top:128px;margin-bottom:20px;">
            <!-- 门诊住院占比（实时） -->
            <div class="ZhanBiBg" style="width:634px;position: relative;left:-2px;height:380px;top:116px">
                <mzAndZr v-if="MzAndZrMsg == ''" ref="mzAndZr" :reff="'mzAndZr'" />
                <Loading ref="LoadingMzAndZr" v-else :msg="MzAndZrMsg"></Loading>
            </div>
            <div
                style="display: flex;font-size: 20px;text-align: center;width: 100%;align-items: center;display: flex;margin-top:-332px;gap:1px;">
                <div class="tpBgCenter" style="flex:1;">
                    <div>手术台次（不含介入）</div>
                    <div>{{ topDataList['手术台次'] }}</div>
                </div>
                <!-- <div class="tpBgCenter" style="flex:1;">
                    <div style="text-align: right">手术台次（不含介入）</div>
                    <div>{{ topDataList['手术台次'] }}</div>
                </div> -->
                <div class="tpBgCenter" style="flex:1;">
                    <div>全身麻醉 </div>
                    <div>{{ topDataList['全身麻醉'] }}</div>
                </div>
                <!-- <div class="tpBgCenter" style="flex:1;">
                    <div>其他方式</div>
                    <div>{{ topDataList['其他方式'] }}</div>
                </div> -->
            </div>
        </div>
        <!-- 中间宽度625 -->
        <div style="position: absolute;left:640px;width:625px;">
            <div style="font-size:28px;text-align: center;padding:8px;position: relative;">
                <div style="position: relative;z-index:999999;top:0;" class="TitleMdfk">
                    医疗质量
                </div>
                <div class="titleBg" style="z-index:1;position: absolute;top:0;height:61px;width: 100%;left:0;">
                </div>
            </div>
            <div style="font-size: 20px;display: flex;justify-content: space-around;text-align: center;margin-top:1px;">
                <div style="flex:1" class="tpBgCenter">
                    <div>DDDS</div>
                    <div>{{ topDataList['DDDS'] }}</div>
                </div>
                <div style="flex:1" class="tpBgCenter">
                    <div>平均住院日</div>
                    <div>{{ topDataList['平均住院日'] }}（市7.7/省8.4）</div>
                </div>
            </div>
        </div>
        <!-- <div class="cte"
            style="width:630px;height:400px;position:absolute;left:640px;top:140px;border:1px solid #fff;padding:10px;">
            <img src="@/assets/giphy.webp" alt="" style="opacity: 1;">
        </div> -->
        <!-- 手术占比（月份） -->
        <div style="width:625px;height:240px;position: absolute;left:640px;top:130px;" class="ShowShuZhanBiGb">
            <ShowShuZhanBi v-if="ShowShuZhanBiMsg == ''" ref="ShowShuZhanBi" :reff="'ShowShuZhanBi'" />
            <Loading ref="LoadingShowShuZhanBi" v-else :msg="ShowShuZhanBiMsg"></Loading>
        </div>
        <!-- 药物占比（月份） -->
        <div class="YaoWuZhanBiBg" style="width:625px;height:279px;position: absolute;left:640px;bottom:310px;">
            <YaoWuZhanBi v-if="YaoWuZhanBiMsg == ''" ref="YaoWuZhanBi" :reff="'YaoWuZhanBi'" />
            <Loading ref="LoadingYaoWuZhanBi" v-else :msg="YaoWuZhanBiMsg"></Loading>
        </div>
        <!-- 危机处理时间（本月） -->
        <div class="WeiJiChuLiBg" style="width:625px;height:303px;  position: absolute;left:640px;bottom:0px;">
            <WeiJiChuLiShiJian v-if="WeiJiChuLiShiJianMsg == ''" ref="WeiJiChuLiShiJian" :reff="'WeiJiChuLiShiJian'" />
            <Loading ref="LoadingWeiJiChuLiShiJian" v-else :msg="WeiJiChuLiShiJianMsg"></Loading>
        </div>

        <!-- 右侧宽度625 -->
        <div style="position: absolute;right:0px;width:625px;">
            <div style="font-size:28px;text-align: center;padding:8px;position: relative;">
                <div style="position: relative;z-index:999999;top:0;" class="TitleMdfk">
                    运营效率
                </div>
                <div class="titleBg" style="z-index:1;position: absolute;top:0;height:61px;width: 100%;left:0;">
                </div>
            </div>
        </div>
        <div class="ZongShouRuBg" style="width:625px;height:250px; position: absolute;right:0px;top:70px;">
            <!-- 总收入（月份） 300px -->
            <ZongShouRu v-if="ZongShouRuMsg == ''" ref="ZongShouRu" :reff="'ZongShouRu'" />
            <Loading ref="LoadingZongShouRu" v-else :msg="ZongShouRuMsg"></Loading>
        </div>
        <!-- 医疗服务收入占比 279px top 380-->
        <div class="YiLiaoFuWuBg" style="width:625px;height:220px;  position: absolute; top:330px;right:0;">
            <YiLiaoFuWuShouRu v-if="YiLiaoFuWuShouRuMsg == ''" ref="YiLiaoFuWuShouRu" :reff="'YiLiaoFuWuShouRu'">
            </YiLiaoFuWuShouRu>
            <Loading ref="LoadingYiLiaoFuWuShouRu" v-else :msg="YiLiaoFuWuShouRuMsg"></Loading>
        </div>
        <div style="width:625px;height:410px; position: absolute; bottom:0px;right:0;">
            <div style="width:29%;font-size:20px; position: absolute;" class="JunCiBg">
                <div class="abcdH">
                    <div class="dianc">
                    </div>
                    <div style="flex:1;">门诊均次</div>
                    <div>{{ topDataList['门诊均次费用'] }}</div>
                </div>
                <div class="abcdH">
                    <div class="dianc" style="background:rgba(255,151,121 ,1 )">
                    </div>
                    <div style="flex:1;">住院均次</div>
                    <div>{{ topDataList['住院均次费用'] }}</div>
                </div>
                <div class="abcdH">
                    <div class="dianc" style="background:rgba(48, 236, 166 , 1)">
                    </div>
                    <div style="flex:1;">CMI</div>
                    <div>{{ topDataList['CMI'] }}</div>
                </div>
            </div>
            <div style="width:29%;font-size:20px; position: absolute;right:0;height:150px;" class="JunCiBg">
                <div class="abcdH" style="padding:4px 10px">
                    <div class="dianc" style="background:rgba(48, 236, 166 , 1)">
                    </div>
                    <div style="flex:1;">门诊药占比</div>
                    <div>{{ topDataList['门诊药占比'] }}%</div>
                </div>
                <div class="abcdH" style="padding:4px 10px">
                    <div class="dianc" style="background:rgba(48, 236, 166 , 1)">
                    </div>
                    <div style="flex:1;">门诊耗材比</div>
                    <div>{{ topDataList['门诊耗材比'] }}%</div>
                </div>
                <div class="abcdH" style="padding:4px 10px;margin-top:-2px;">
                    <div class="dianc">
                    </div>
                    <div style="flex:1;">住院药占比</div>
                    <div>{{ topDataList['住院药占比'] }}%</div>
                </div>
                <div class="abcdH" style="padding:4px 10px">
                    <div class="dianc">
                    </div>
                    <div style="flex:1;">住院耗材比</div>
                    <div>{{ topDataList['住院耗材比'] }}%</div>
                </div>
            </div>
            <div>
                <KeShiJieYu v-if="KeShiJieYuMsg == ''" ref="KeShiJieYu" :reff="'KeShiJieYu'" />
                <Loading ref="LoadingKeShiJieYu" v-else :msg="KeShiJieYuMsg"></Loading>
            </div>

        </div>
    </div>
</template>

<script>
//新的
import mzAndZr from './echarts/mzAndZr/index.vue'
import YaoWuZhanBi from './echarts/YaoWuZhanBi/index.vue'
import DangRiShouRu from './echarts/DangRiShouRu/index.vue'
import YiLiaoFuWuShouRu from './echarts/YiLiaoFuWuShouRu/index.vue'
import ZongShouRu from './echarts/ZongShouRu/index.vue'
import WeiJiChuLiShiJian from './echarts/WeiJiChuLiShiJian/index.vue'
import ShowShuZhanBi from './echarts/ShouShuZhanBi/index.vue'
import KeShiJieYu from './echarts/KeShiJieYu/index.vue'
import Loading from '../Loading/index.vue'
import store from '@/store'
import mock from '@/common/mock'
import router from '../../../../router'
import Util from '@/common/util'
export default {
    components: {
        //新的
        mzAndZr,
        YaoWuZhanBi,
        DangRiShouRu,
        YiLiaoFuWuShouRu,
        ZongShouRu,
        WeiJiChuLiShiJian,
        ShowShuZhanBi,
        KeShiJieYu,
        Loading
        //暂定不用的 
    },
    data() {
        return {
            topDataList: {
                '总收入': 0,
                '平均住院日': 0,
                "DDDS": 0,
                "实时在院人数": 0,
                "实时门诊人数": 0,
                "均次药品费用": 0,
                "门诊均次费用": 0,
                '住院均次费用': 0,
                "手术台次": 0,
                "CMI": 0,
                '全身麻醉': 0,
                '其他方式': 0,
                "住院药占比": 0,
                "门诊药占比": 0,
                "门诊耗材比": 0,
                "住院耗材比": 0,
                "实时入院人数": 0,
                "实时出院人数": 0
            },
            topDataMsg: "Loading..",
            topDataListMsg: "Loading..",
            topDataListTimer: [],
            topDataListShow: {},
            topDataListShowMsg: {
            },
            circleList: [
            ],
            timer: [],
            showTime: {},
            MzAndZrMsg: "Loading..",
            YaoWuZhanBiMsg: "Loading..",
            DangRiShouRuMsg: "Loading..",
            YiLiaoFuWuShouRuMsg: "Loading..",
            ZongShouRuMsg: "Loading..",
            WeiJiChuLiShiJianMsg: "Loading..",
            ShowShuZhanBiMsg: "Loading..",
            KeShiJieYuMsg: "Loading.."
        }
    },
    methods: {
        //刷新数据
        resetRequest(fn, msg) {
            this.$nextTick(() => {
                let timer = setTimeout(() => {
                    this[msg] = "Loading.."
                    if (this.$refs['Loading' + msg.replace('Msg', '')]) {
                        if (this.$refs['Loading' + msg.replace('Msg', '')].changeErrorMsg) {
                            this.$refs['Loading' + msg.replace('Msg', '')].changeErrorMsg('Loading..')
                        }
                    }
                    fn && fn()
                    clearInterval(timer)
                }, 30000)
            })
        },
        //每日数据初始化
        topDataLeftInit() {
            this.topDataMsg = "Loading.."
            let topReq = [
                this.$req("ylfw"),
                this.$req('sszyrs'),
                this.$req("ssmzrs"),
                this.$req("sstc"),
                this.$req("sscyrs"),
                this.$req("ssryrs"),
            ]
            Promise.all(topReq).then(res => {
                this.topDataMsg = ""
                let m = res.map(e => {
                    let { data } = e
                    if (data) {
                        let { code, msg, data: datas } = data
                        if (code == 1) {
                            if (msg == '手术台次') {
                                let { qs, qt, sum } = datas
                                return [
                                    {
                                        t: "手术台次",
                                        d: sum
                                    },
                                    {
                                        t: '全身麻醉',
                                        d: qs
                                    },
                                    {
                                        t: "其他方式",
                                        d: qt
                                    }
                                ]
                            }
                            if (msg == '费用控制') {
                                return [
                                    {
                                        t: "均次药品费用",
                                        d: datas['均次药品费用']
                                    },
                                    {
                                        t: "门诊均次费用",
                                        d: datas['门诊均次费用']
                                    },
                                    {
                                        t: "住院均次费用",
                                        d: datas['住院均次费用']
                                    }
                                ]
                            }
                            let dHandler = (datas) => {
                                if (Array.isArray(datas)) {
                                    let f = datas[0]
                                    if (Array.isArray(f)) {
                                        return Object.values(f[0])[0]
                                    } else {
                                        return Object.values(f)[0]
                                    }
                                }
                                if (typeof datas == 'object') {
                                    return Object.values(datas)[0]
                                }
                                return datas
                            }
                            return {
                                t: msg,
                                d: dHandler(datas)
                            }
                        } else {
                            return {
                                t: msg,
                                d: ""
                            }
                        }
                    }
                    return e
                })
                return m
            }).then(res => {
                if (Array.isArray(res)) {
                    res = res.flat()
                    res.forEach(e => {
                        let { t, d } = e
                        t = t.toUpperCase()
                        this.topDataList[t] = d
                    })
                }
            }).catch(err => {
                this.topDataMsg = err
            })
        },
        //显示数据初始化
        topDataInit() {
            this.topDataMsg = "Loading.."
            let topReq = [
                this.$req("ylfw"),
                this.$req("ddds"),
                // this.$req("sstc"),
                this.$req("fykzV3"),
                this.$req("cmiYear"),
                this.$req("zymzypzbV3"),
                this.$req("zymzhczbV3"),
            ]
            Promise.all(topReq).then(res => {
                this.topDataMsg = ""
                let m = res.map(e => {
                    let { data } = e
                    if (data) {
                        let { code, msg, data: datas } = data
                        if (code == 1) {
                            if (msg == '药占比') {
                                return [
                                    {
                                        t: "住院药占比",
                                        d: datas['住院药占比']
                                    },
                                    {
                                        t: "门诊药占比",
                                        d: datas['门诊药占比']
                                    },
                                ]
                            }
                            if (msg == '耗材比') {
                                return [
                                    {
                                        t: "住院耗材比",
                                        d: datas['住院耗材比']
                                    },
                                    {
                                        t: "门诊耗材比",
                                        d: datas['门诊耗材比']
                                    },
                                ]
                            }
                            if (msg == '费用控制') {
                                return [
                                    {
                                        t: "均次药品费用",
                                        d: datas['均次药品费用']
                                    },
                                    {
                                        t: "门诊均次费用",
                                        d: datas['门诊均次费用']
                                    },
                                    {
                                        t: "住院均次费用",
                                        d: datas['住院均次费用']
                                    }
                                ]
                            }
                            let dHandler = (datas) => {
                                if (Array.isArray(datas)) {
                                    let f = datas[0]
                                    if (Array.isArray(f)) {
                                        return Object.values(f[0])[0]
                                    } else {
                                        return Object.values(f)[0]
                                    }
                                }
                                if (typeof datas == 'object') {
                                    return Object.values(datas)[0]
                                }
                                return datas
                            }
                            return {
                                t: msg,
                                d: dHandler(datas)
                            }
                        } else {
                            return {
                                t: msg,
                                d: ""
                            }
                        }
                    }
                    return e
                })
                return m
            }).then(res => {
                if (Array.isArray(res)) {
                    res = res.flat()
                    res.forEach(e => {
                        let { t, d } = e
                        t = t.toUpperCase()
                        this.topDataList[t] = d
                    })
                }
            }).catch(err => {
                this.topDataMsg = err
            })
        },
        //门诊和住院人数占比
        mzAndZrInit(type) {
            if (!type) {
                this.MzAndZrMsg = "Loading.."
            }
            let pArray = [
                // this.$req("glzb1"),
                // this.$req("glzb2"),
                this.$req("ryrszbV3"),
                this.$req("mzrcglzbV3"),
            ]
            Promise.all(pArray).then(res => {
                this.MzAndZrMsg = ""
                let dObject = {
                    // "各类别占比1": [],
                    // "各类别占比2": [],
                    "入院人数各类占比": [],
                    "门诊人次和各别占比": []
                }
                res.forEach(e => {
                    let { msg } = e['data']
                    if (dObject[msg]) {
                        if (msg == '入院人数各类占比' || msg == '门诊人次和各别占比') {
                            let bzObject = {
                                '本市职工': '',
                                '本市居民': "",
                                '异地职工': "",
                                '异地居民': "",
                                "自费": "",
                                "其他": ""
                            }
                            e['data']['data'].forEach(el => {
                                let k = Object.keys(el)[0]
                                if (bzObject[k] != undefined) {
                                    bzObject[k] = el[k]
                                }
                                if (k.indexOf('自费') != -1) {
                                    bzObject['自费'] = el[k]
                                }
                                if (k.indexOf('铁路') != -1) {
                                    bzObject['其他'] = el[k]
                                }

                            })
                            let arr = []
                            for (let i in bzObject) {
                                arr.push({
                                    name: i,
                                    value: Number(bzObject[i])
                                })
                            }
                            e['data']['data'] = arr
                        }
                        let d = e['data']['data'].map(eee => {
                            let k = Object.keys(eee)
                            if (k.length > 1) {
                                return {
                                    name: eee[k[0]],
                                    value: eee[k[1]]
                                }
                            } else {
                                return {
                                    name: k[0],
                                    value: eee[k[0]]
                                }
                            }
                        })
                        dObject[msg] = d
                    }
                })
                setTimeout(() => {
                    if (this.$refs.mzAndZr) {
                        if (this.$refs.mzAndZr.init) {
                            if (type) {
                                this.$refs.mzAndZr.init('', {
                                    dObject
                                })
                                return
                            }
                            this.$refs.mzAndZr.init('init', {
                                dObject
                            })
                        }
                    }
                }, 100)
                return dObject
            }).catch(err => {
                console.log(err)
                this.MzAndZrMsg = 'mzAndZr,' + err
                this.$nextTick(() => {
                    this.$refs.LoadingMzAndZr.changeErrorMsg(this.MzAndZrMsg)
                    this.resetRequest(this.mzAndZrInit, 'MzAndZrMsg')
                })
            })
        },
        // 药物占比 
        YaoWuZhanBiInit(type) {
            if (!type) {
                this.YaoWuZhanBiMsg = 'Loading..'
            }
            // let mock = 

            Promise.all(
                // mock.YaoWuZhanBiInitMock
                [this.$req('hlyycgjeV3'), this.$req('hlyygzhcjeV3'), this.$req('hlyyzdjkypV3')]
            )
                .then(res => {
                    let datas = res.map(e => {
                        let { data } = e
                        if (data['code'] == 0) {
                            throw new Error('数据请求失败')
                            return {}
                        } else {
                            let { data: dt } = data
                            return dt
                        }
                    })
                    let allDatas = {}
                    if (datas.length != 0) {
                        datas.forEach(eb => {
                            allDatas[Object.keys(eb)[0]] = Object.values(eb)[0]
                        })
                    } else {
                        this.YaoWuZhanBiMsg = "数据请求错误"
                        return
                    }
                    this.YaoWuZhanBiMsg = ""
                    //x轴数据  
                    let t = Object.keys(allDatas) 
                    let sendEchartsData = Object.values(allDatas).map(e => {
                        if (e) {
                            return Object.values(e).reverse()
                        } else {
                            return []
                        }
                    })
                    let xZhou = Object.values(allDatas).map(e => {
                        if (e) {
                            return Object.keys(e).reverse()
                        } else {
                            return []
                        }
                    }) 
                    let x = xZhou[0]
                    setTimeout(() => {
                        if (this.$refs.YaoWuZhanBi) {
                            if (this.$refs.YaoWuZhanBi.init) {
                                if (type) {
                                    this.$refs.YaoWuZhanBi.init('', {
                                        x,
                                        d: sendEchartsData,
                                        t: t
                                    })
                                    return
                                }
                                this.$refs.YaoWuZhanBi.init('init', {
                                    x,
                                    d: sendEchartsData,
                                    t: t
                                })
                            }
                        }
                    }, 100)
                }).catch(err => {
                    this.YaoWuZhanBiMsg = 'YaoWuZhanBi,' + err
                    this.$nextTick(() => {
                        this.$refs.LoadingYaoWuZhanBi.changeErrorMsg(this.YaoWuZhanBiMsg)
                        this.resetRequest(this.YaoWuZhanBiInit, 'YaoWuZhanBiMsg')
                    })
                })
        },
        //各类收入占比(实时)
        DangRiShouRuInit(type) {
            if (!type) {
                this.DangRiShouRuMsg = 'Loading..'
            }
            // let mock =
            this.$req("glzb1").then(res => {
                if (!res.data.code) {
                    this.DangRiShouRuMsg = res.data.msg
                    throw new Error(res.data.msg)
                    return
                }
                this.DangRiShouRuMsg = ""
                let { data } = res['data']
                let numHandler = (num) => {
                    // if (num > 10000) {
                    return (num / 10000).toFixed(2) 
                    + '万'
                    // } 
                }
                let dArray = data.map(e => {
                    return {
                        name: e['类别'] == '健康体检' ? '体检' : e['类别'],
                        value: e['收入'],
                        showValue: numHandler(e['收入'])
                    }
                })
                let dArrayS = []
                dArray.forEach((e, i, arr) => {
                    let { name } = e;
                    if (name == '住院') {
                        dArrayS[0] = e
                    }
                    if (name == '门诊') {
                        dArrayS[1] = e
                    }
                    if (name == '体检') {
                        dArrayS[dArrayS.length + 1] = e
                    }
                })
                //x轴数据   
                setTimeout(() => {
                    if (this.$refs.DangRiShouRu) {
                        if (type) {
                            if (this.$refs.DangRiShouRu.init) {
                                this.$refs.DangRiShouRu.init('', {
                                    d: dArrayS
                                })
                            }
                            return
                        }
                        if (this.$refs.DangRiShouRu.init) {
                            this.$refs.DangRiShouRu.init('init', {
                                d: dArrayS
                            })
                        }
                    }
                }, 100)
            }).catch(err => {
                this.DangRiShouRuMsg = "DangRiShouRu," + err
                this.$nextTick(() => {
                    this.$refs.LoadingDangRiShouRu.changeErrorMsg(this.DangRiShouRuMsg)
                    this.resetRequest(this.DangRiShouRuInit, 'DangRiShouRuMsg')
                })
            })
        },
        //总收入(月)
        ZongShouRuInit(type) {
            if (!type) {
                this.ZongShouRuMsg = "Loading.."
            }
            // let mock = 
            this.$req("zsrV3").then(res => {
                if (!res.data.code) {
                    //2024年11月8日 11点00分 强制登陆
                    if (res.data.msg == '请登录') {
                        localStorage.setItem('tk', '123')
                        location.reload()
                    }
                    this.ZongShouRuMsg = res.data.msg
                    throw new Error(res.data.msg)
                    return
                }
                this.ZongShouRuMsg = ""
                let { data } = res['data']
                let zsr = data['总收入']
                let d = []
                let x = []
                for (let i in zsr) {
                    d.push(
                        {
                            name: i,
                            value: zsr[i]
                        }
                    )
                    x.push(i)
                }
                setTimeout(() => {
                    if (this.$refs.ZongShouRu) {
                        if (this.$refs.ZongShouRu.init) {
                            if (type) {
                                this.$refs.ZongShouRu.init('', {
                                    d,
                                    x
                                })
                                return
                            }
                            this.$refs.ZongShouRu.init('init', {
                                d,
                                x
                            })
                        }
                    }
                }, 100)
            }).catch(err => {
                this.ZongShouRuMsg = 'ZongShouRu,' + err
                this.$nextTick(() => {
                    this.$refs.LoadingZongShouRu.changeErrorMsg(this.ZongShouRuMsg)
                    this.resetRequest(this.ZongShouRuInit, 'ZongShouRuMsg')
                })
            })
        },
        //医务性收入占比
        YiLiaoFuWuShouRuInit(type) {
            if (!type) {
                this.YiLiaoFuWuShouRuMsg = "Loading.."
            }
            // let mock = 
            this.$req("szjgV3")
                .then(res => {
                    if (!res.data.code) {
                        this.YiLiaoFuWuShouRuMsg = res.data.msg
                        throw new Error(res.data.msg)
                        return
                    }
                    this.YiLiaoFuWuShouRuMsg = ""
                    let { data } = res['data']
                    let { ywxsr, zfy } = data
                    let d = []
                    let x = []
                    for (let i in ywxsr) {
                        d.push(
                            {
                                name: i,
                                value: Math.ceil((ywxsr[i] / zfy[i]) * 100)
                            }
                        )
                        x.push(i)
                    }
                    setTimeout(() => {
                        if (this.$refs.YiLiaoFuWuShouRu) {
                            if (this.$refs.YiLiaoFuWuShouRu.init) {
                                if (type) {
                                    this.$refs.YiLiaoFuWuShouRu.init('', {
                                        d,
                                        x
                                    })
                                    return
                                }
                                this.$refs.YiLiaoFuWuShouRu.init('init', {
                                    d,
                                    x
                                })
                            }
                        }
                    }, 100)
                }).catch(err => {
                    this.YiLiaoFuWuShouRuMsg = "YiLiaoFuWuShouRu," + err
                    this.$nextTick(() => {
                        this.$refs.LoadingYiLiaoFuWuShouRu.changeErrorMsg(this.YiLiaoFuWuShouRuMsg)
                        this.resetRequest(this.YiLiaoFuWuShouRuInit, 'YiLiaoFuWuShouRuMsg')
                    })
                })
        },
        //危机处理时间
        WeiJiChuLiShiJianInit(type) {
            if (!type) {
                this.WeiJiChuLiShiJianMsg = "Loading.."
            }
            // mock['WeiJiChuLiShiJianInitMock']()
            this.$req("wjzclsjV3")
                .then(res => {
                    if (!res.data.code) {
                        this.WeiJiChuLiShiJianMsg = res.data.msg
                        throw new Error(res.data.msg)
                        return
                    }
                    this.WeiJiChuLiShiJianMsg = ""
                    let { data } = res['data']
                    // let x = data.map(e => Object.keys(e)[0])
                    let d = data['总数'].map(e => {
                        return {
                            name: Object.keys(e)[0],
                            value: Object.values(e)[0] + ""
                        }
                    })
                    let dList = data['明细']
                    setTimeout(() => {
                        if (this.$refs.WeiJiChuLiShiJian) {
                            if (this.$refs.WeiJiChuLiShiJian.init) {
                                if (type) {
                                    this.$refs.WeiJiChuLiShiJian.init('', {
                                        // x,
                                        d,
                                        dList
                                    })
                                    return
                                }
                                this.$refs.WeiJiChuLiShiJian.init('init', {
                                    // x,
                                    d,
                                    dList
                                })
                            }
                        }
                    }, 100)
                }).catch(err => {
                    this.WeiJiChuLiShiJianMsg = 'WeiJiChuLiShiJian,' + err
                    this.$nextTick(() => {
                        this.$refs.LoadingWeiJiChuLiShiJian.changeErrorMsg(this.WeiJiChuLiShiJianMsg)
                        this.resetRequest(this.WeiJiChuLiShiJianInit, 'WeiJiChuLiShiJianMsg')
                    })
                })
        },
        //手术占比（月份）
        ShowShuZhanBiInit(type) {
            if (!type) {
                this.ShowShuZhanBiMsg = "Loading.."
            }
            // let mock = 
            this.$req("sszbV3")
                // mock()
                .then(res => {
                    if (!res.data.code) {
                        this.ShowShuZhanBiMsg = res.data.msg
                        throw new Error(res.data.msg)
                        return
                    }
                    this.ShowShuZhanBiMsg = ""
                    let { data } = res['data']
                    let x = Object.keys(data)
                    let ds = Object.values(data)
                    let d = {}
                    d['三级占比'] = ds.map((e, i) => {
                        return {
                            name: x[i],
                            value: e['sjss']
                        }
                    })
                    d['手术占比'] = ds.map((e, i) => {
                        return {
                            name: x[i],
                            value: e['sszb']
                        }
                    })
                    d['微创占比'] = ds.map((e, i) => {
                        return {
                            name: x[i],
                            value: e['wcss']
                        }
                    })
                    setTimeout(() => {
                        if (this.$refs.ShowShuZhanBi) {
                            if (this.$refs.ShowShuZhanBi.init) {
                                if (type) {
                                    this.$refs.ShowShuZhanBi.init('', {
                                        d: d,
                                        x: x
                                    })
                                    return
                                }
                                this.$refs.ShowShuZhanBi.init('init', {
                                    d: d,
                                    x: x
                                })
                            }
                        }
                    }, 100)
                }).catch(err => {
                    console.log(err)
                    this.ShowShuZhanBiMsg = "ShowShuZhanBi," + err
                    this.$nextTick(() => {
                        this.$refs.LoadingShowShuZhanBi.changeErrorMsg(this.ShowShuZhanBiMsg)
                        this.resetRequest(this.ShowShuZhanBiInit, 'ShowShuZhanBiMsg')
                    })
                })
        },
        //CMI / 门诊均次 / 住院均次 / 结余
        KeShiJieYuInit(type) {
            if (!type) {
                this.KeShiJieYuMsg = 'Loading..'
            }
            // let mock = 
            this.$req("dip").then(res => {
                if (!res.data.code) {
                    this.KeShiJieYuMsg = res['data']['msg']
                    throw new Error(res.data.msg)
                    return
                }
                this.KeShiJieYuMsg = ''
                let { data } = res['data']
                console.log(data)
                setTimeout(() => {
                    if (this.$refs.KeShiJieYu) {
                        if (this.$refs.KeShiJieYu.init) {
                            if (type) {
                                this.$refs.KeShiJieYu.init('', {
                                    d: data
                                })
                                return
                            }
                            this.$refs.KeShiJieYu.init('init', {
                                d: data
                            })
                        }
                    }
                }, 100)
            }).catch(err => {
                this.KeShiJieYuMsg = 'KeShiJieYu,' + err
                this.$nextTick(() => {
                    if (this.$refs.LoadingKeShiJieYu) {
                        this.$refs.LoadingKeShiJieYu.changeErrorMsg(this.KeShiJieYuMsg)
                    }
                    this.resetRequest(this.KeShiJieYuInit, 'KeShiJieYuMsg')
                })
            })
        },
        allInit(item) {
            if (item) {
                store.commit("setDateType", item)
                // this.topDataInit()
                // this.circleInit()
                return
            }
            this.$nextTick(() => {
                this.topDataInit()
                this.topDataLeftInit()
                this.mzAndZrInit()
                this.YaoWuZhanBiInit()
                this.DangRiShouRuInit()
                this.YiLiaoFuWuShouRuInit()
                this.ZongShouRuInit()
                this.WeiJiChuLiShiJianInit()
                this.ShowShuZhanBiInit()
                this.KeShiJieYuInit()
            })
        },
        startDxt() {
            this.allInit()
            //5分钟刷新
            let ten = () => {
                console.log("10分钟刷新")
                this.topDataLeftInit()
                this.mzAndZrInit('timer')
                this.DangRiShouRuInit('timer')
            }
            let hour = () => {
                console.log("1小时刷新") 
                this.YaoWuZhanBiInit('timer')
                this.YiLiaoFuWuShouRuInit('timer')
                this.ZongShouRuInit('timer')
                this.WeiJiChuLiShiJianInit('timer')
                this.ShowShuZhanBiInit('timer')
                this.KeShiJieYuInit('timer')
            }
            Util.scheduleRefresh.call(this, ten, hour)
            setInterval(() => {
                Util.scheduleRefresh.call(this, ten, hour)
            }, 60 * 60 * 1000)
            //老刷新 不用了
            // let ti1 = setInterval(() => {
            //     this.topDataLeftInit()
            //     this.mzAndZrInit('timer')
            //     this.DangRiShouRuInit('timer')
            // }, 60 * 5 * 1000)
            // // 一天刷新
            // let ti2 = setInterval(() => {
            //     this.YaoWuZhanBiInit('timer')
            //     this.YiLiaoFuWuShouRuInit('timer')
            //     this.ZongShouRuInit('timer')
            //     this.WeiJiChuLiShiJianInit('timer')
            //     this.ShowShuZhanBiInit('timer')
            //     this.KeShiJieYuInit('timer')
            // }, 24 * 60 * 60 * 1000)
            // this.timer.push(ti1)
            // this.timer.push(ti2)
            // this.timer = setInterval(() => {
            //     this.allInit()
            //     // this.mzAndZrInit()
            //     // this.circleInit()
            // }, 600000)
            // this.timer2 = setInterval(() => {
            //     // this.lineInit()
            // }, 600000)
        }
    },

    mounted() {
        this.startDxt()
    },
    destroyed() {
        if (this.timer) {
            if (Array.isArray(this.timer)) {
                this.timer.forEach(e => {
                    clearInterval(e)
                })
                this.timer = []
            }
        }
    }
}
</script>

<style>
.TitleMdfk {
    font-weight: bold;
    background-image: linear-gradient(180deg, #ffffff 28.65%, #1efff4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.AndroidContent {
    display: flex;
    width: 100%;
    justify-content: space-between;
    /* height: calc(100% - 83px); */
    height: 970px;
    font-family: '黑体';
    position: relative;
    background: transparent;
    /* border: 1px solid; */
}

.anBlock {
    width: 16.5%;
    padding: 0 5px;
    text-align: center;
    height: 70px;
}

.adBlock {
    flex: 1;
    position: relative;
    margin-right: 10px;
    background-image: url(~@/assets/jx/2.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.adBlock_long {
    flex: 1;
    position: relative;
    margin-right: 10px;
    background-image: url(~@/assets/jx/changkuang.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.headerDataList {
    height: 70px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 5px;
    box-sizing: border-box;
    background: rgba(11, 44, 104, .3);
    /* background-image: url(~@/assets/jx/changkuang.png); */
    /* background-size: contain; */
    /* background-repeat: no-repeat; */
    border: 1px solid aqua;
}

.gjCircleData {
    flex: 1;
    margin-left: 10px;
    position: relative;
    margin-top: 97px;
    background-image: url(~@/assets/jx/changkuangShu.png);
    background-size: 100% 100%;
}

.timeShow {
    position: absolute;
    z-index: 99999;
    font-size: 18px;
    color: #AFEEEE;
    display: none;
}

.cte img {
    height: 100%;
}

.titleBg {
    background-image: url(~@/assets/dpNew/628x58.png);
}

.tpBg {
    background-image: url(~@/assets/dpNew/157x62.png);
}

.tpBgCenter {
    background-image: url(~@/assets/dpNew/312x62.png);
}

.ZhanBiBg {
    background-image: url(~@/assets/dpNew/628x435.png);
}

.MenJiZhenLiangBg {
    background-image: url(~@/assets/dpNew/628x30.png);
}

.ShouRuZhanBiBg {
    background-image: url(~@/assets/dpNew/628x330.png);
}

.ShowShuZhanBiGb {
    background-image: url(~@/assets/dpNew/623x240.png);
}

.YaoWuZhanBiBg {
    background-image: url(~@/assets/dpNew/623x279.png);
}

.WeiJiChuLiBg {
    background-image: url(~@/assets/dpNew/623X300.png);
}

.ZongShouRuBg {
    background-image: url(~@/assets/dpNew/623X250.png);
}

.YiLiaoFuWuBg {
    background-image: url(~@/assets/dpNew/623X220.png);
}

.JunCiBg {
    background-image: url(~@/assets/dpNew/184x150.png);
}

.JieYuBg {
    background-image: url(~@/assets/dpNew/430x150.png);
}

.BingZhongBg {
    background-image: url(~@/assets/dpNew/623X250.png);

}

.tpBg,
.titleBg,
.tpBgCenter,
.ShouRuZhanBiBg,
.MenJiZhenLiangBg,
.ZhanBiBg,
.ShowShuZhanBiGb,
.YaoWuZhanBiBg,
.WeiJiChuLiBg,
.ZongShouRuBg,
.YiLiaoFuWuBg,
.JunCiBg,
.JieYuBg,
.BingZhongBg {
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
</style>