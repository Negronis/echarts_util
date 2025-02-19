<template>
  <div>
    <div
      style="
        z-index: 0;
        position: absolute;
        color: #fff;
        font-size: 24px;
        z-index: 2;
        left: 20px;
        top: 10px;
        padding-left: 3px;
        border-bottom: 1px solid #fff;
      "
    >
      {{ title }}
    </div>
    <div style="height: 279px; width: 100%">
      <div ref="lines" style="height: 279px; width: 100%"></div>
    </div>
    <div
      style="
        position: absolute;
        bottom: 0px;
        font-size: 20px;
        text-align: center;
        width: 100%;
        left: 0;
        display: flex;
        justify-content: space-around;
        padding: 0 20px;
        font-weight: bold;
      "
    >
      <div>{{ dataDate[0] }}</div>
      <div>{{ dataDate[1] }}</div>
    </div>
  </div>
</template>

<script>
import Echartsinit from "@/common/echarts_init";
import option from "./index";
export default {
  props: ["title", "data", "reff"],
  data() {
    return {
      charts: null,
      dataDate: [],
    };
  },
  methods: {
    req(type, data) {
      if (!data) {
        return;
      }
      option["xAxis"]["data"] = data["x"].map((e) => e.replace(/\d+年/, ""));
      option["series"].forEach((e, i) => {
        e["data"] = data["d"][i];
        e["name"] = data["t"][i];
      });
      option["series"][3]["data"] = data["d"][0];
      // option['series'][3]['name'] = data['t'][0]
      option["series"][4]["data"] = data["d"][1];
      // option['series'][4]['name'] = data['t'][1]
      option["series"][5]["data"] = data["d"][2];
      // option['series'][5]['name'] = data['t'][2]

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
      let { x } = data;
      let s = x[0].replace(/\d+月/, "");
      let e = x[x.length - 1].replace(/\d+月/, "");
      this.dataDate = [
        s.length > 3 ? s : "20" + s,
        e.length > 3 ? e : "20" + e,
      ]; 
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
    let mockArr = [];
    let mockNum = 10;
    for (let i = 0; i < mockNum; i++) {
      mockArr.push(`2${i >= 9 ? 5 : 4}年${i + 1}月`);
    }
    let mockData = [[], [], []];
    for (let i = 0; i < mockNum; i++) {
      mockData[0].push(Math.floor(Math.random() * 50));
      mockData[1].push(Math.floor(Math.random() * 50));
      mockData[2].push(Math.floor(Math.random() * 10));
    }

    this.init("init", {
      x: mockArr,
      d: mockData,
      t: ["基本药物采购金额占比", "高值耗材金额占比", "重点监控药品占比"],
    });
  },
};
</script>

<style></style>