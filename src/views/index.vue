<template>
  <div>  
    <!-- <adminNewScreen v-if="dpType == 'new'" /> --> 
     <pageUtil />
  </div>
</template>

<script>
import store from '@/store'  
import adminNewScreen from '@/views/echarts_index/index.vue'
import pageUtil from './page_util/index.vue'
export default {
  components: {  
    adminNewScreen,
    pageUtil
  },
  computed: {
    deviceType() {
      return store.getters.getDeviceType
    },
    dpType() {
      return store.getters.getDpType
    }
  },
  data() {
    return {

    }
  }
};
</script>
