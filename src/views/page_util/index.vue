<template>
  <div style="padding: 5px">
    <div style="display: flex; gap: 10px">
      <div style="width: 500px; height: calc(100vh - 30px)" class="pageU">
        输入Options源码：
        <codemirror
          ref="cm"
          v-model="optionCode"
          :options="cmOptions"
          @input="inputChange"
        ></codemirror>
        <div style="text-align: right">
          <Button @click="renderE" type="primary">渲染</Button>
        </div>
      </div>
      <div style="flex: 2">
        <div style="display: flex; gap: 20px">
          <div style="display: flex; gap: 10px; align-items: center">
            <div>宽：</div>
            <Input style="width: 100px" type="text" v-model="width" />
          </div>
          <div style="display: flex; gap: 10px; align-items: center">
            <div>高：</div>
            <Input style="width: 100px" type="text" v-model="height" />
          </div>
          <div style="display: flex; gap: 10px; align-items: center">
            <div>背景色：</div>
            <Input style="width: 100px" type="text" v-model="backgroundColor" />
          </div>
        </div>
        <div style="margin-top: 10px"></div>
        <div
          ref="echarts_child"
          :style="{
            width: typeof width == 'number' ? width + 'px' : width,
            height: typeof height == 'number' ? height + 'px' : height,
            background: backgroundColor,
          }"
        ></div>
      </div>
      <div style="flex: 1; min-width: 400px">
        <tree @ifTreeChange="ifTreeChange" ref="tree" />
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import Echartsinit from "@/common/echarts_init";
import tree from "./tree/index.vue";
//集成在线编辑器
import { codemirror } from "vue-codemirror";
import "codemirror/theme/eclipse.css";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/xml-fold";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/indent-fold";
import "codemirror/addon/hint/javascript-hint.js";
import "codemirror/addon/selection/active-line.js";

import util from "./util";
import store from '@/store'
window.echarts = echarts;
export default {
  components: {
    tree,
    codemirror,
  },
  data() {
    return {
      // 编辑器配置
      cmOptions: util.cmOptions,
      dataList: [],
      classOption: {
        direction: 1,
        step: 0.5,
        limitMoveNum: 8,
        //单步停顿
        // singleHeight: 35
      },
      charts: null,
      option: {},
      width: "100%",
      height: "50vh",
      backgroundColor: "#fff",
      optionCode: ` 
         const data = [];
for (let i = 0; i <= 360; i++) {
  let t = (i / 180) * Math.PI;
  let r = Math.sin(2 * t) * Math.cos(2 * t);
  data.push([r, i]);
}
option = {
  title: {
    text: 'Two Value-Axes in Polar'
  },
  legend: {
    data: ['line']
  },
  polar: {
    center: ['50%', '54%']
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  angleAxis: {
    type: 'value',
    startAngle: 0
  },
  radiusAxis: {
    min: 0
  },
  series: [
    {
      coordinateSystem: 'polar',
      name: 'line',
      type: 'line',
      showSymbol: false,
      data: data
    }
  ],
  animationDuration: 2000
};`,
    };
  },
  methods: {
    inputChange(content) {
      this.$nextTick(() => {});
    },
    //子组件通知我改变
    ifTreeChange(option_child) {
      this.option = option_child;
      store.commit("setTreeDataObject",option_child)
      //代码格式化
      var formattedCode = util.formattedCode(this.option, "option");
      this.optionCode = formattedCode;
      if (this.charts) {
        this.charts.setOption(this.option);
      }
    },
    renderE() {
      if (this.charts) {
        this.charts.dispose();
        this.charts = null;
        this.option = null;
        try {
          if (option) {
            option = null;
          }
        } catch (err) {}
      }
      if (document.querySelector("#echarts_scr")) {
        document.body.removeChild(document.querySelector("#echarts_scr"));
      }
      let scr = document.createElement("script");
      scr.text = `function renderJs(){
        try{
            echarts = window.echarts 
            ${this.optionCode} 
            return option || {};
        }catch(err){
            console.log(err)
            return {}
        } 
      }`;
      scr.setAttribute("id", "echarts_scr");
      document.body.appendChild(scr);
      this.option = renderJs();
      this.render();
    },
    render() {
      if (!this.charts) {
        let that = this;
        this.$nextTick(() => {
          this.charts = Echartsinit.init(that.$refs.echarts_child, this.option);
          if (this.$refs.tree)
            this.$refs.tree.init && this.$refs.tree.init(this.option);
        });
        return;
      }
      this.charts.setOption(this.option);
    },
  },
};
</script> 
<style>
.pageU .CodeMirror {
  height: 90vh !important;
  border: 1px solid #dcdee2;
  margin-bottom: 2px;
}
</style>