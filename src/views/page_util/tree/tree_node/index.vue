<template>
  <div>
    <div>
      <div style="display: flex">
        <div v-if="node.label == 'root'">
          <div style="font-weight: bold">Option树:</div>
        </div>

        <div v-else>
          <div :style="node_child">
            <div>
              <div
                v-if="node.label && node.label.indexOf('index') != -1"
                style="margin-right: 5px"
              >
                {{ node.label.substring(node.label.indexOf("x") + 1) }} :
              </div>
              <div v-else style="display: flex; align-items: center">
                <div>{{ node.label }}</div>
                <div
                  v-if="node.children && node.type != 'string'"
                  style="margin-left: 10px"
                >
                  <Button
                    style=""
                    size="small"
                    type="primary"
                    @click="(e) => changeData(e, node)"
                    >修改数据</Button
                  >
                </div>
              </div>
            </div>
            <div v-if="node.value != undefined">
              <input
                v-if="typeof node.value != 'number'"
                @input="(e) => changeInputSayToParent(e, node)"
                type="text"
                v-model="node.value"
              />
              <input
                type="number"
                v-else
                @input="(e) => changeInputSayToParent(e, node)"
                v-model="node.value"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="node.children">
        <tree-node
          v-for="child in node.children"
          :key="child.id"
          :node="child"
          @changeTreeData="changeInputSayToParent"
          @childInjectMyChangeObject="childInjectMyChangeObject"
        />
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "treeNode",
  props: {
    node: Object,
    // changeTreeData: Function,
  },
  data() {
    return {};
  },
  computed: {
    node_child() {
      return ` 
        font-size:13px;
        padding:3px 5px;
        border-radius:5px;
        color:#fff;
        background-color:rgba(25,190,107,${1 - this.node.c / 10});
        ${this.node.c == 2 ? "background-color:#2d8cf0;" : ""};
        display:flex;
        margin-left: ${20 * this.node.c}px;
        margin-bottom:5px;
        `;
    },
  },
  methods: {
    childInjectMyChangeObject() {
      this.$emit("childInjectMyChangeObject", store.getters.getChangeNode);
    },
    changeData(e, node) {
      store.commit("setChangeNode", node);
      this.childInjectMyChangeObject();
    },
    changeInputSayToParent() {
      this.$emit("changeTreeData");
    },
  },
  mounted() {},
};
</script>

<style>
</style>