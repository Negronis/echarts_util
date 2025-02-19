<template>
  <div>
    <div class="Title_cxk" style="margin-left: 5px">危急值处理时间</div>
    <div style="display: flex; justify-content: space-around">
      <div style="width: 50%; margin-left: 5px">
        <!-- rgba(255,151,121 , 1) -->
        <vue-seamless-scroll
          v-if="dataList.length != 0"
          ref="scrollSeamLess"
          :data="dataList"
          :class-option="classOption"
          class="warp"
          style="
            color: rgba(45, 183, 245, 0.8);
            height: 268px;
            border-right: 1px solid rgb(40, 96, 161);
          "
        >
          <div
            class="asdH"
            v-for="(item, index) in dataList"
            :key="index"
            :style="{
              background:
                index % 2 == 0 ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)',
            }"
          >
            <div style="width: 80px">{{ item["确认人"] }}</div>
            <!-- <div style="flex:1;text-align: center;">{{ (+item['CMI']) < 1 ? '0' + item['CMI'] : item['CMI']
                                }}</div> -->
            <div style="flex: 1; text-align: right">{{ item["确认科室"] }}</div>
            <div style="flex: 1; text-align: right">{{ item["类型"] }}</div>
          </div>
        </vue-seamless-scroll>
        <div
          v-if="dataList.length == 0"
          class="warp"
          style="
            color: #2d8cf0;
            height: 270px;
            border-right: 1px solid rgb(40, 96, 161);
            line-height: 270px;
            text-align: center;
            font-size: 25px;
            font-weight: normal;
          "
        >
          暂无明细
        </div>
      </div>
      <div style="height: 300px; width: 50%; position: relative">
        <div
          ref="lines"
          style="height: 300px; width: 100%; margin-top: -15px"
        ></div>
      </div>
    </div>

    <!-- <div style="position: absolute;right:10px;bottom:10px;font-size: 20px;">危急值处理时间(本月)</div> -->
  </div>
</template>

<script>
import Echartsinit from "@/common/echarts_init";
import vueSeamlessScroll from "vue-seamless-scroll";
import option from "./index";
export default {
  components: {
    vueSeamlessScroll,
  },
  props: ["title", "data", "reff"],
  data() {
    return {
      dataList: [],
      classOption: {
        direction: 1,
        step: 0.5,
        limitMoveNum:8
        //单步停顿
        // singleHeight: 35
      },
      charts: null,
    };
  },
  methods: {
    req(type, data) {
      if (!data) {
        return;
      }
      data["d"].forEach((e) => {
        e["unit"] = "个";
      });
      option["series"][0]["data"] = data["d"];
      option["series"][1]["data"] = data["d"];
      this.dataList = data["dList"];
      console.log(JSON.stringify(option))
      // let o = this.chartInit(data['d'], data['x'])
      // option['yAxis'][0]['data'] = o['y']
      if (type) {
        let that = this;
        this.$nextTick(() => {
          that.charts = Echartsinit.init(that.$refs.lines, option);
        });
        return;
      }
      this.charts.setOption(option);
    },
    init(type, data) {
      if (type) {
        this.req("init", data);
      } else {
        this.req("", data);
      }
    },
  },
  mounted() {
    if (process.env.NODE_ENV != "development") {
      return;
    } 
    this.init("init", {
      d: [
        {
          name:"五分钟",
          value:"10"
        },
        {
          name:"十分钟",
          value:"8" 
        },
        {
          name:"二十分钟",
          value:"14" 
        },
        {
          name:"二十分钟以上",
          value:"18" 
        },
      ],
      dList: [
        {
          医技科室: "检验科",
          申请科室: "骨一科病区",
          姓名: "景桂芹",
          标识号: "963319",
          危急值项目: "★血红蛋白浓度",
          结果: "37.00",
          结果参考: "115--150",
          通知人: "伍昱宇",
          通知时间: "2025-01-09 09:43:09",
          通知内容: "HGB 37.00 ↓↓",
          消息确认人: "蒋峰",
          消息确认时间: "2025-01-09 10:45:34",
          处理措施: "紧急备血输血、生命体征监护",
          确认科室: "骨一科病区",
          确认人: "蒋峰",
          类型: "20分钟以上",
        },
        {
          医技科室: "检验科",
          申请科室: "简易门诊",
          姓名: "李洪深",
          标识号: "66777",
          危急值项目: "★凝血酶原时间（PT）",
          结果: "35.30",
          结果参考: "10--14 凝固法",
          通知人: "李玉凤",
          通知时间: "2025-01-06 10:56:47",
          通知内容: "PT 35.30 ↑↑",
          消息确认人: "金学红",
          消息确认时间: "2025-01-06 12:24:52",
          处理措施: "华法林减量后复查INR",
          确认科室: "简易门诊",
          确认人: "金学红",
          类型: "20分钟以上",
        },
        {
          医技科室: "检验科",
          申请科室: "老年病门诊",
          姓名: "王占荣",
          标识号: "4077071",
          危急值项目: "★白细胞数目",
          结果: "1.62",
          结果参考: "3.9--9.5",
          通知人: "陈宏",
          通知时间: "2025-01-02 08:56:05",
          通知内容: "WBC 1.62 ↓↓",
          消息确认人: "张敏",
          消息确认时间: "2025-01-02 09:18:38",
          处理措施: "予升白治疗",
          确认科室: "老年病门诊",
          确认人: "张敏2",
          类型: "20分钟以上",
        },
        {
          医技科室: "检验科",
          申请科室: "老年病门诊",
          姓名: "王占荣",
          标识号: "4077071",
          危急值项目: "★白细胞数目",
          结果: "1.62",
          结果参考: "3.9--9.5",
          通知人: "陈宏",
          通知时间: "2025-01-02 08:56:05",
          通知内容: "WBC 1.62 ↓↓",
          消息确认人: "张敏3",
          消息确认时间: "2025-01-02 09:18:38",
          处理措施: "予升白治疗",
          确认科室: "老年病门诊",
          确认人: "张敏4",
          类型: "20分钟以上",
        }, 
        {
          医技科室: "检验科",
          申请科室: "老年病门诊",
          姓名: "王占荣",
          标识号: "4077071",
          危急值项目: "★白细胞数目",
          结果: "1.62",
          结果参考: "3.9--9.5",
          通知人: "陈宏",
          通知时间: "2025-01-02 08:56:05",
          通知内容: "WBC 1.62 ↓↓",
          消息确认人: "张敏5",
          消息确认时间: "2025-01-02 09:18:38",
          处理措施: "予升白治疗",
          确认科室: "老年病门诊",
          确认人: "张敏",
          类型: "20分钟以上",
        },
        {
          医技科室: "检验科",
          申请科室: "老年病门诊",
          姓名: "王占荣",
          标识号: "4077071",
          危急值项目: "★白细胞数目",
          结果: "1.62",
          结果参考: "3.9--9.5",
          通知人: "陈宏",
          通知时间: "2025-01-02 08:56:05",
          通知内容: "WBC 1.62 ↓↓",
          消息确认人: "张敏5",
          消息确认时间: "2025-01-02 09:18:38",
          处理措施: "予升白治疗",
          确认科室: "老年病门诊",
          确认人: "张敏",
          类型: "20分钟以上",
        },
        {
          医技科室: "检验科",
          申请科室: "老年病门诊",
          姓名: "王占荣",
          标识号: "4077071",
          危急值项目: "★白细胞数目",
          结果: "1.62",
          结果参考: "3.9--9.5",
          通知人: "陈宏",
          通知时间: "2025-01-02 08:56:05",
          通知内容: "WBC 1.62 ↓↓",
          消息确认人: "张敏5",
          消息确认时间: "2025-01-02 09:18:38",
          处理措施: "予升白治疗",
          确认科室: "老年病门诊",
          确认人: "张敏",
          类型: "20分钟以上",
        },
        {
          医技科室: "检验科",
          申请科室: "老年病门诊",
          姓名: "王占荣",
          标识号: "4077071",
          危急值项目: "★白细胞数目",
          结果: "1.62",
          结果参考: "3.9--9.5",
          通知人: "陈宏",
          通知时间: "2025-01-02 08:56:05",
          通知内容: "WBC 1.62 ↓↓",
          消息确认人: "张敏5",
          消息确认时间: "2025-01-02 09:18:38",
          处理措施: "予升白治疗",
          确认科室: "老年病门诊",
          确认人: "张敏",
          类型: "20分钟以上",
        },
      ],
      
    });
  },
};
</script>

<style></style>