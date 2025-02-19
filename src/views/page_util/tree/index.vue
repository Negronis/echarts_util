<template>
  <div>
    <div>
      <treeNode :node="treeData" @changeTreeData="changeTreeData" />
    </div>
  </div>
</template>

<script>
import treeNode from "./tree_node/index.vue";
export default {
  components: {
    treeNode,
  },
  data() {
    return {
      treeObject: {},
      treeData: {},
      handlerTree: [],
    };
  },
  methods: {
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
    //对象转换为树状结构 - 利用C定层级关系，利用parent判定父级关系
    convertToTree(data, label = "root", c = 1, parent = "", type = "") {
      //定义节点结构
      const node = { label, children: [], c, parent, type };
      // 判定数据是否为数组
      if (Array.isArray(data)) {
        // 有子项则递归子项
        if (label == "root") {
          c++;
        }
        node.children = data.map((item, index) => { 
          return this.convertToTree(
            item,
            `index ${index}`,
            c,
            label,
            this.checkType(item)
          );
        });
        // 判定数据是否为对象
      } else if (typeof data === "object" && data !== null) {
        // 解构对象键值对
        c++;
        node.children = Object.entries(data).map(([key, value]) =>
          this.convertToTree(
            value,
            key,
            c,
            parent || label,
            this.checkType(value)
          )
        );
      } else {
        node.value = (data && data.toString()) || "";
        node.type = this.checkType(node.value);
      }
      return node;
    },
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
    init(obj) {
      if (!obj) {
        return;
      }
      this.treeObject = obj;
      this.treeData = this.convertToTree(this.treeObject);
      console.log(this.treeData);
      console.log(this.getData(this.treeData));
    },
    //子组件通知改变状态，通知父组件重构echarts
    changeTreeData() {
      let reverseObject = this.reverseTree(this.treeData);
      this.$emit("ifTreeChange", reverseObject);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>