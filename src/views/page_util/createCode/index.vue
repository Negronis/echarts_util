<template>
  <div class="createCodePage">
    <Modal
      title="代码生成"
      v-model="showCreateCode"
      width="50%"
      class-name="vertical-center-modal-createCode"
    >
      <div class="createCodePageModal">
        <div style="height: 100%">
          <div>
            <Button @click="createCode('vue2')">Vue2</Button>
          </div>
          <div style="height: calc(100% - 40px); margin-top: 10px">
            <codemirror
              ref="cm"
              v-model="optionCode"
              :options="cmOptions"
              @input="inputChange"
            ></codemirror>
          </div>
        </div>
      </div>
    </Modal>
    <div style="display: none">
      {{ code }}
    </div>
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
      store.commit("setCode", "");
      this.$emit("createCodeFunc", type);
    },
    inputChange() {
      store.commit("setCode", this.optionCode);
    },
  },
};
</script>

<style>
.createCodePageModal {
  height: 60vh;
}
.createCodePageModal .CodeMirror {
  width: 100%;
  border: 1px solid #dcdee2;
  height: 100% !important;
  margin-bottom: 2px;
}
.createCodePageModal .vue-codemirror {
  height: 100% !important;
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