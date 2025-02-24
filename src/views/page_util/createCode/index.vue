<template>
  <div class="createCodePage">
    <Modal
      title="代码生成"
      v-model="showCreateCode"
      width="50%"
      class-name="vertical-center-modal-createCode"
    >
      <div style="height: 50vh;border:1px solid;">
        <div>
          <Button @click="createCode('vue2')">Vue2</Button>
        </div>
        <div style="height: 90%; margin-top: 10px">
          <codemirror
            ref="cm"
            v-model="optionCode"
            :options="cmOptions"
            @input="inputChange"
          ></codemirror>
        </div>
      </div>
    </Modal>
    {{ code }}
  </div>
</template>

<script>
import store from "@/store";
import util from "../util";
import { codemirror } from "vue-codemirror";

export default {
  components: {
    codemirror,
  },
  computed: {
    code() {
      this.optionCode = store.getters.getCode;
      return store.getters.getCode;
    },
  },
  data() {
    return {
      optionCode: ``,
      showCreateCode: false,
      createCodeText: ``,
      cmOptions: util.cmOptions,
    };
  },
  methods: {
    showDialog() {
      this.showCreateCode = true;
    },
    createCode(type) {
      this.$emit("createCodeFunc", type);
    },
    inputChange() {
        store.commit('setCode' , this.optionCode)
    },
  },
};
</script>

<style> 
.vertical-center-modal-createCode .CodeMirror {
  height: 45vh !important;
  border: 1px solid #dcdee2;
  margin-bottom: 2px;
}
.vertical-center-modal-createCode {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ivu-modal {
  top: 0;
}
</style>