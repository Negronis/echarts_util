<template>
  <div style="padding: 5px">
    <div style="display: flex; gap: 10px">
      <div style="width: 500px; height: calc(100vh - 20px)" class="pageU">
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
          <div style="display: flex; gap: 10px; align-items: center">
            <div>背景图：</div>
            <input
              type="file"
              accept="image/*"
              @change="handleFileChange"
              ref="fileInput"
              style="display: none"
            />
            <Button type="primary" @click="uploadImage">上传</Button>
          </div>
          <div>
            <Button type="primary" @click="showCreate">生成Vue代码</Button>
          </div>
        </div>
        <div style="margin-top: 10px"></div>
        <div ref="echarts_child" :style="echartsChildStyle"></div>
      </div>
      <div style="flex: 1; min-width: 400px">
        <tree @ifTreeChange="ifTreeChange" ref="tree" />
      </div>
    </div>
    <createCode ref="createCode" @createCodeFunc="createCodeFunc" />
  </div>
</template>

<script>
import * as echarts from "echarts";
import Echartsinit from "@/common/echarts_init";
import tree from "./tree/index.vue";
import createCode from "./createCode/index.vue";
//集成在线编辑器
import { codemirror } from "vue-codemirror";
import util from "./util";
import store from "@/store";
import JSON5 from "json5";
window.echarts = echarts;
export default {
  components: {
    tree,
    codemirror,
    createCode,
  },
  computed: {
    echartsChildStyle() {
      let { width, height, backgroundColor, backgroundImage } = this;
      return `   
      width: ${typeof width == "number" ? width + "px" : width};
      height: ${typeof height == "number" ? height + "px" : height};
      background: ${backgroundImage ? "" : backgroundColor};
      ${
        backgroundImage
          ? `background-image:${
              backgroundImage ? "url(" + backgroundImage + ")" : ""
            };background-size:100% 100%;`
          : ""
      }
      `;
    },
  },
  data() {
    return {
      // 编辑器配置
      cmOptions: util.cmOptions,
      dataList: [],
      charts: null,
      option: {},
      width: "100%",
      height: "50vh",
      backgroundColor: "#fff",
      backgroundImage: ``,
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
    createCodeFunc(type) {
      let { width, height, backgroundColor, backgroundImage } = this;
      let style = [
        `width: ${typeof width == "number" ? width + "px" : width}`,
        `height: ${typeof height == "number" ? height + "px" : height}`,
        `background: ${backgroundImage ? "" : backgroundColor}`,
        backgroundImage
          ? `background-image: url(${backgroundImage});background-size:100% 100%`
          : "",
      ]
        .filter(Boolean)
        .join("; ");
      let code;
      if (type == "vue2") {
        code = `
          <template>
            <div>
              <div ref="echarts_child" style="${style}"></div> 
            </div>
          </template>
          <script>
          import * as echarts from 'echarts'; 
          export default {
            data() {
              return {
                charts:null,
                option:${JSON5.stringify(this.option)}
              }
            },
            methods:{
              echartsInit(dom, option, type){
                if (!dom) {
                  return {}
                }
                let Charts = echarts.init(dom);
                if (option) {
                  Charts.setOption(option);
                }  
                return Charts;
              },
              renderEcharts(){
                  if (!this.charts) {
                  let that = this;
                  this.$nextTick(() => {
                    this.charts = this.echartsInit(that.$refs.echarts_child, this.option); 
                  });
                  return;
                }
                this.charts.setOption(this.option);
              }, 
            },
            mounted(){
              this.renderEcharts();
            }
          }
          <\/script>
        `;
      }
      store.commit("setCode", code);
    },
    showCreate() {
      this.$nextTick(() => {
        this.$refs.createCode.showDialog();
      });
    },
    /** 图片上传相关方法 */
    uploadImage() {
      this.$nextTick(() => {
        this.$refs.fileInput.click();
      });
    },
    // 文件验证
    validateFile(file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 10 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        this.uploadError = "仅支持 JPG/PNG/GIF 格式的图片";
        return false;
      }

      if (file.size > maxSize) {
        this.uploadError = "文件大小不能超过10MB";
        return false;
      }

      return true;
    },
    // 图片上传监听
    handleFileChange(event) {
      const file = event.target.files[0];
      if (!file) return;
      // 验证文件类型和大小（示例：限制 2MB 以下）
      if (!this.validateFile(file)) {
        this.resetFileInput();
        return;
      }
      this.selectedFile = file;
      this.uploadError = null;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.backgroundImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    //
    inputChange(content) {
      this.$nextTick(() => {});
    },
    //子组件通知我改变
    ifTreeChange(option_child) {
      this.option = option_child;
      store.commit("setTreeDataObject", option_child);
      //代码格式化
      var formattedCode = util.formattedCode(this.option, "option");
      this.optionCode = formattedCode;
      if (this.charts) {
        this.charts.setOption(this.option);
      }
    },
    /** 结束 */
    // 渲染按钮事件
    renderE() {
      if (this.charts) {
        this.charts.dispose();
        this.charts = null;
        this.option = null;
        store.commit("setCode" , "")
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
    // Echarts渲染
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
  height: 93vh !important;
  border: 1px solid #dcdee2;
  margin-bottom: 2px;
}
</style>