<template>
    <div v-if="msg != ''" style="display: flex;align-items: center;justify-content: center;height:100%;">
        <div style="text-align: center;">
            <!-- <img v-if="msg == 'Loading..'" :width="width || '200px'" src="@/assets/loading.gif" alt=""> -->
            <Spin fix>
                <Icon v-if="message == 'Loading..' || message == '数据请求失败，将在30秒后重连'" type="ios-loading" size='25' class="demo-spin-icon-load"></Icon> 
                <Icon v-if="message == '数据请求错误，将在30秒后重连'" type="ios-close-circle" size='25' />
                <div style="font-size:25px;max-width: 200px;overflow: hidden;max-height: 150px;">{{ message }}</div>
            </Spin>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'msg',
        'width'
    ],
    data() {
        return {
            type: "",
            message: ""
        }
    },
    methods: {
        changeErrorMsg(msg) { 
            if (msg) {
                if (typeof msg == 'string') {
                    if (msg.indexOf(',') != -1) {
                        let tam = msg.split(',')
                        this.type = tam[0]
                        if (tam[1].indexOf('Network') != -1) {
                            this.message = '数据请求错误，将在30秒后重连'
                            return
                        }
                        if (tam[1].indexOf('Error') != -1) {
                            this.message = '数据请求失败，将在30秒后重连'
                            return
                        }
                        this.message = tam[1] 
                    } else {
                        this.message = msg
                    }
                }
            }
        }, 
    },
    mounted() {
        if (this.msg) {
            if (typeof this.msg == 'string') {
                if (this.msg.indexOf(',') != -1) {
                    let tam = this.msg.split(',')
                    this.type = tam[0]
                    // 超时
                    // if(tam[1].indexOf('timeout') != -1){

                    // }
                    if (tam[1].indexOf('Network') != -1) {
                        this.message = '数据请求错误，将在30秒后重连'
                    } else {
                        this.message = tam[1]
                    }
                } else {
                    this.message = this.msg
                }
            }
        }
    }
}
</script>

<style>
.demo-spin-col .circular {
    width: 25px;
    height: 25px;
}

.demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
}

@keyframes ani-demo-spin {
    from {
        transform: rotate(0deg);
    }

    50% {
        transform: rotate(180deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.ivu-spin-fix {
    /* background: transparent; */
    background-color: rgba(11, 44, 104, .3) !important;
}
</style>