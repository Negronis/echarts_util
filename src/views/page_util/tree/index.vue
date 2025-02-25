<template>
  <div style="height: calc(98vh); overflow-y: scroll" class="treeModal">
    <div
      style="
        border: 1px solid #dcdee2;
        height: 100%;
        overflow-y: scroll;
        padding: 10px;
      "
    >
      <treeNode
        @childInjectMyChangeObject="childInjectMyChangeObject"
        :node="treeData"
        @changeTreeData="changeTreeData"
      />
    </div>
    <Modal
      title="Title"
      v-model="showDataChange"
      class-name="vertical-center-modal-tree"
      width="50%"
      @on-ok="modalOkChange"
    >
      <div style="padding: 10px; height: 40vh" class="modal_code">
        <div style="display: flex; height: 100%">
          <div>
            {{ changeDataObject.label }}
          </div>
          <div style="flex: 1">
            <codemirror
              ref="cm"
              v-model="changeDataCode"
              :options="cmOptions"
              @input="inputChange"
            ></codemirror>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import treeNode from "./tree_node/index.vue";
import { codemirror } from "vue-codemirror";
import util from "../util";
import store from "@/store";
import JSON5 from "json5";
export default {
  components: {
    treeNode,
    codemirror,
  },
  computed: {
    treeData() {
      return store.getters.getTreeData;
    },
  },
  data() {
    return {
      //做备份，留给修改使用
      treeDataBF: {},
      dataArray: [],
      showDataChange: false,
      changeDataObject: {},
      changeDataCode: ``,
      cmOptions: util.cmOptions,
    };
  },
  methods: {
    getTreeData() {
      return store.getters.getTreeData;
    },
    inputChange(content) {
      this.$nextTick(() => {});
    },
    //将类型转换为值
    typeToValue(type) {
      switch (type) {
        case "string":
          return "";
        case "number":
          return 0;
        case "boolean":
          return false;
        case "array":
          return [];
        case "object":
          return {};
        case "null":
          return null;
        case "undefined":
          return undefined;
        default:
          return null;
      }
    },
    //类型判定
    getType(value) {
      const type = typeof value;
      if (type === "object") {
        if (value === null) return "null";
        if (Array.isArray(value)) return "array";
        if (value instanceof Date) return "date";
        if (value instanceof RegExp) return "regexp";
        return "object";
      }
      return type;
    },
    //综合类型判定，包含dom - 逆向转换使用
    checkType(value) {
      if (value instanceof Element) {
        return `DOM Element: ${value.nodeName}`;
      }
      return this.getType(value);
    },
    // 逆向转换核心函数
    reverseTree(node) {
      // 处理叶子节点
      if (!node.children || node.children.length === 0) {
        return node.value !== undefined
          ? node.value
          : this.typeToValue(node.type);
      }

      // 判断是否为数组结构
      const isArray = node.children.every((child) =>
        /^index\s+\d+$/.test(child.label)
      );

      if (isArray) {
        // 数组处理逻辑
        return node.children
          .sort((a, b) => {
            const indexA = parseInt(a.label.split(" ")[1]);
            const indexB = parseInt(b.label.split(" ")[1]);
            return indexA - indexB;
          })
          .map((child) => this.reverseTree(child));
      } else {
        // 对象处理逻辑
        return node.children.reduce((obj, child) => {
          obj[child.label] = this.reverseTree(child);
          return obj;
        }, {});
      }
    },
    //对象转换为树状结构 - 利用C定层级关系，利用parent判定父级关系,c_index可获取当前位置
    convertToTree(
      data,
      label = "root",
      c = 1,
      parent = "",
      type = "",
      c_index = 1
    ) {
      //定义节点结构
      const node = { label, children: [], c, parent, type, c_index };
      // 判定数据是否为数组
      if (Array.isArray(data)) {
        // 有子项则递归子项
        c++;
        node.children = data.map((item, index) => {
          return this.convertToTree(
            item,
            `index ${index}`,
            c,
            label,
            this.checkType(item),
            c_index == 1 ? `${c}-${index + 1}` : `${c_index}-${index}`
          );
        });
        // 判定数据是否为对象
      } else if (typeof data === "object" && data !== null) {
        // 解构对象键值对
        c++;
        node.children = Object.entries(data).map(([key, value], index) => {
          return this.convertToTree(
            value,
            key,
            c,
            label.indexOf("index") != -1 ? parent + "," + label : label,
            this.checkType(value),
            c_index == 1 ? `${c}-${index + 1}` : `${c_index}-${index}`
          );
        });
      } else {
        node.value =
          data === 0 ? 0 : typeof data == "boolean" ? data : data || ""; // 0为数字0，false为布尔值false，其他为空字符串
        // && data.toString()
        node.type = this.checkType(node.value);
      }
      return node;
    },
    //获取数据中所有的data
    getData(node, label = "", data = []) {
      if (Array.isArray(node)) {
        node.forEach((e) => {
          if (e.label == "data") {
            data.push(e);
          }
          if (e.children) {
            this.getData(e.children, label, data);
          }
        });
      }
      if (typeof node == "object" && node !== null) {
        let { label, children } = node;
        if (label == "data" && children) {
          data.push(node);
        }
        if (children && label != "data") {
          children.forEach((e) => {
            this.getData(e, label, data);
          });
        }
      }
      return data;
    },
    //通过label,parent寻找节点位置 传入新值可进行修改
    findThisFromTreeData(node, treData = this.getTreeData(), isEnd, newData) {
      if (isEnd == true) {
        return node;
      }
      if (!node) {
        return {};
      }
      let { c } = node;
      if (treData) {
        if (treData.c == c && Array.isArray(treData) == false) {
          return;
        }
        if (treData.children) {
          for (var i = 0; i < treData.children.length; i++) {
            let e = treData.children[i];
            if (e["c"] == c) {
              if (e["c_index"] == node["c_index"]) {
                if (newData) {
                  Object.assign(treData.children[i], newData); //拷贝，保留关联关系
                  // treData.children[i] = newData;  //赋值，舍弃关联关系
                }
                store.commit("setTreeData", this.treeDataBF);
                return this.findThisFromTreeData(node, e, true, newData);
              }
            } else {
              this.findThisFromTreeData(node, e, false, newData);
            }
          }
        }
      }
      return node;
    },
    init(obj) {
      if (!obj) {
        return;
      }
      store.commit("setTreeDataObject", obj);
      this.treeDataBF = this.convertToTree(store.getters.getTreeDataObject);
      store.commit(
        "setTreeData",
        this.convertToTree(store.getters.getTreeDataObject)
      );
      // this.dataArray = this.getData(this.getTreeData());
      console.log(store.getters.getTreeDataObject);
      console.log(store.getters.getTreeData);
    },
    //子组件通知改变状态，通知父组件重构echarts
    changeTreeData() {
      let reverseObject = this.reverseTree(this.getTreeData());
      this.$emit("ifTreeChange", reverseObject);
    },
    //子组件通知我要修改某个对象的数据 展开模态框并显示数据结构
    childInjectMyChangeObject(node) {
      this.showDataChange = true;
      this.changeDataObject = this.findThisFromTreeData(node);
      //转换为对象，赋值给修改框
      let reverseObject = this.reverseTree(this.changeDataObject);
      //格式化
      let formCode = util.formattedCode(
        reverseObject,
        this.changeDataObject.label
      );
      // 为防止用户意外篡改结构 已纯对象结构显示，剔除前面的label=
      this.changeDataCode = formCode.replace(
        `${this.changeDataObject.label} = `,
        ""
      );
    },
    //模态框修改确认
    modalOkChange() {
      //字符串分割
      let theCode = this.changeDataCode.substring(
        0,
        this.changeDataCode.lastIndexOf(";") == -1
          ? this.changeDataCode.length
          : this.changeDataCode.lastIndexOf(";")
      );
      try {
        let theLastCode = JSON5.parse(theCode.replaceAll(/(\w+):/g, '"$1":'));
        let thisTreeObject = this.changeDataObject;
        let { c, label, parent, type, c_index } = thisTreeObject;
        let changeCompleteObject = this.convertToTree(
          theLastCode,
          label,
          c,
          parent,
          type,
          c_index
        );
        this.findThisFromTreeData(
          thisTreeObject,
          this.getTreeData(),
          false,
          changeCompleteObject
        );
        this.$emit("ifTreeChange", this.reverseTree(this.getTreeData()));
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
.modal_code .CodeMirror {
  border: 1px solid #dcdee2;
  width: 100%;
  height: 90% !important;
}
.modal_code .vue-codemirror {
  height: 100% !important;
}
.vertical-center-modal-tree {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ivu-modal {
  top: 0;
}
</style>