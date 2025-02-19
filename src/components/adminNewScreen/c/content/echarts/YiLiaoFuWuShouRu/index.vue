<template>
  <div>
    <div style="height: 220px; width: 100%">
      <div :ref="reff" style="height: 220px; width: 100%"></div>
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
  props: ["reff", "title", "data"],
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
      // 数组倒序
      data["d"].reverse()
      option["series"]["0"]["data"] = data["d"];
      // option['series']['3']['data'] = data['d']
      // option['series']['1']['data'] = data['d2']
      // option['series']['2']['data'] = data['d3']
      if (type) {
        let that = this;
        this.$nextTick(() => {
          that.charts = Echartsinit.init(that.$refs[this.reff], option);
        });
        return;
      }
      this.charts.setOption(option);
    },
    init(type, data) {
      let { x } = data;
      x.reverse()
      this.dataDate = [
        x[0].replace(/-+\d+/g, "年"),
        x[x.length - 1].replaceAll(/-+\d+/g, "年"),
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
    let mockNum = 13;
    for (let i = 0; i < mockNum; i++) {
      mockArr.push({
        name: `202${i >= 9 ? 5 : 4}-${i + 1}`,
        value: (Math.random(100) * 100).toFixed(2),
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