<template>
  <div>
    <div style="height: 250px; width: 100%">
      <div ref="lines" style="height: 250px; width: 100%"></div>
    </div>
    <div
      style="
        position: absolute;
        bottom: 0px;
        font-size: 20px;
        text-align: center;
        width: 100%;
        left: 0;
        display: flex;justify-content: space-around;
        padding:0 20px;
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
      option["xAxis"]["data"] = data["x"].map(
        (e) => e.replace(/\d+-/g, "") + "月"
      );
      if (data["d"].length <= 3) {
        option["series"][0]["barWidth"] = "15%";
      }
      if (data["d"].length == 3) {
        option["series"][0]["barWidth"] = "25%";
      }
      if (data["d"].length > 3 && data["d"].length < 6) {
        option["series"][0]["barWidth"] = "40%";
      }
      if (data["d"].length > 6) {
        option["series"][0]["barWidth"] = "60%";
      }
      if (data["d"].length == 1) {
        option["series"][0]["barWidth"] = "8%";
      }
      // 数组倒序
      data["d"].reverse()
      option["series"][0]["data"] = data["d"];
      option["series"][1]["data"] = data["d"].slice(0, data["d"].length - 1);
      option["series"][0]["name"] = "总收入";
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
      x.reverse()
      this.dataDate = [x[0].replace(/-+\d+/g, "年"), x[x.length - 1].replaceAll(/-+\d+/g, "年")];
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
    let mockNum = 13;
    for (let i = 0; i < mockNum; i++) {
      mockArr.push({
        name: `202${i >= 9 ? 5 : 4}-${i + 1}`,
        value: Math.random() * 10000000,
      });
    }
    let mockDate = mockArr.map((item) => item.name);
    let mock = {
      d: mockArr,
      x: mockDate,
    };
    this.init("init", mock);
  },
};
</script>

<style></style>