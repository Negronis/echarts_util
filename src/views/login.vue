<template>
    <div style="height:100vh;width:100%">
        <div class="loginBg">
            <div class="loginBlock"
                :style="{ height: height + 'px', width: width + 'px', transform: `scale(${sc}, ${sc})` }">
                <div style="flex:1;"></div>
                <div class="loginBlockRight">
                    <div style="flex:1;padding:20px;">
                        <div style="font-size:1rem;color:#94B7E4;font-weight: bold;margin-bottom:5px;">欢迎登录</div>
                        <div style="font-size:1.5rem;color:#fff;">运营综合数据管理系统<Icon type="log-in"></Icon>
                        </div>
                        <div style="margin-top:30px;" v-if="isSm == false">
                            <div
                                style="display: flex;justify-content: space-around; align-items: center;padding-bottom:5px;border-bottom:1px solid #94B7E4">
                                <div style="width:30px">
                                    <img src="@/assets/login/3.png" alt="">
                                </div>
                                <div style="flex:10;">
                                    <input v-model="username" placeholder="请输入账号" class="loginInput" type="text">
                                </div>
                            </div>
                            <div
                                style="margin-top:20px;display: flex;align-items: center;padding-bottom:5px;border-bottom:1px solid #94B7E4">
                                <div style="width:30px">
                                    <img src="@/assets/login/4.png" alt="">
                                </div>
                                <div style="flex:10;">
                                    <input v-model="password" placeholder="请输入密码" class="loginInput" type="password">
                                </div>
                            </div>
                        </div>
                        <div v-else style="margin-top:20px;">
                            <div style="display: flex;align-items: center;justify-content: center;">
                                <div
                                    style="height:250px;width:250px;border:1px solid #fff;background:#FFF;position: relative;">
                                    <div v-if="!wxCode && !codeError"
                                        style="height:100%;display: flex;align-items: center;justify-content: center;">
                                        <img width="100%" src="@/assets/loading.gif" alt="">
                                    </div>
                                    <div style="background:rgba(0,0,0,.8);color:#fff;text-align: center;position: absolute;top:0;left:0;right:0;height:100%;width:100%;display: flex;align-items: center;justify-content: center;"
                                        v-if="codeError">
                                        <div @click="scanQrCode">
                                            <img style="width:50px" src="@/assets/reload.jpeg" alt="">
                                            <div style="font-size:18px;">
                                                二维码已失效，点击刷新
                                            </div>
                                        </div>
                                    </div>
                                    <img :src="wxCode" alt="">
                                </div>
                            </div>
                            <div style="color:#fff;text-align: center;font-size:20px;margin-top:5px;">
                                请使用微信扫码登陆
                            </div>
                        </div>
                        <div style="margin-top:30px;display: flex;">
                            <div style="flex:1">
                                <button @click="login" class="loginBtn">登录</button>
                            </div>
                            <div style="flex:1;margin-left:10px;">
                                <button @click="scanQrCode" class="loginBtn">扫码</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from '../router'
import { login, checkCache, getQrCode } from '@/common/apiPost'
export default {
    data() {
        return {
            height: "",
            width: "",
            username: "",
            password: "",
            isSm: false,
            wxCode: "",
            checkTimer: null,
            qrCodeTimeNum: 60,
            codeError: false,
            sc: 1
        }
    },
    methods: {
        check() {
            if (this.checkTimer) {
                checkCache(localStorage.getItem('catch_key')).then(res => {
                    if (!res.data.code) {
                        clearInterval(this.checkTimer)
                        this.checkTimer = null
                        this.qrCodeTimeNum = 60
                        this.wxCode = ""
                        this.codeError = true
                        return
                    }
                    let { data } = res['data']
                    if (data) {
                        clearInterval(this.checkTimer)
                        this.checkTimer = null
                        this.qrCodeTimeNum = 60
                        let { token } = data
                        localStorage.setItem('tk', token)
                        // localStorage.setItem('userInfo', JSON.stringify(res['data']['data']['userinfo']))
                        this.$Util.Suc(res.data.msg, 2, () => {
                            router.replace('/')
                        })
                    }

                })
            }
        },
        scanQrCode() {
            if (this.isSm == true && this.codeError == false) {
                return
            }
            clearInterval(this.checkTimer)
            this.checkTimer = null
            this.qrCodeTimeNum = 60
            this.isSm = true
            this.wxCode = ""
            this.codeError = false
            getQrCode().then(res => {
                this.$Util.Clear()
                if (!res.data.code) {
                    this.$Util.Fail(res.data.msg)
                    return
                }
                let { data } = res['data']
                this.wxCode = data['url']
                localStorage.setItem('catch_key', data['cache_key'])
                //启动定时器，请口等待回token
                this.checkTimer = setInterval(() => {
                    if (this.qrCodeTimeNum > 0) {
                        this.check()
                        this.qrCodeTimeNum = this.qrCodeTimeNum - 1
                    } else {
                        clearInterval(this.checkTimer)
                        this.checkTimer = null
                        this.codeError = true
                    }
                }, 1000)
            }).catch(err => {
                this.$Util.Fail(err)
            })
        },
        login() {
            clearInterval(this.checkTimer)
            this.checkTimer = null
            if (this.isSm == true) {
                this.isSm = false
                return
            }
            this.$Util.Load()
            login(this.username, this.password).then(res => {
                this.$Util.Clear()
                if (!res.data.code) {
                    this.$Util.Fail(res.data.msg)
                    return
                }
                if (res.data.data) {
                    if (res.data.data.userinfo) {
                        localStorage.setItem('tk', JSON.stringify(res['data']['data']['userinfo']['token']))
                        localStorage.setItem('userInfo', JSON.stringify(res['data']['data']['userinfo']))
                        router.replace('/')
                    }
                } else {
                    this.$Util.Fail("服务器返回数据为空，登陆失败")
                }
            })
        }
    },
    mounted() { 
        if (window.innerHeight > 768) {
            this.height = window.innerHeight / 2
            this.width = window.innerWidth / 2.2
        } else {
            this.height = window.innerHeight / 1.5
            this.width = window.innerWidth / 1.2
            this.sc = 0.6
        }
    }
}
</script>

<style>
.loginBg {
    height: 100%;
    width: 100%;
    background-image: url(~@/assets/login/1.jpg);
    background-size: 100% 100%;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.loginBlock {
    margin: auto;
    background-size: 100% 100%;
    position: relative;
    background-image: url(~@/assets/login/2.png);
    position: absolute;
    right: 0;
    top: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
}

.loginBlock img {
    width: 100%;
}

.loginBlockRight {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}

.loginInput {
    width: 88%;
    background: transparent !important;
    padding: 10px;
    margin-left: 10px;
    border: 0;
    font-size: 25px;
    color: #fff;
    font-family: '黑体';
}

.loginInput::placeholder {
    color: #94B7E4;
}

.loginInput:focus {
    border: none;
    box-shadow: none;
    outline: none;
}

.loginBtn {
    width: 100%;
    border-radius: 30px;
    border: none;
    padding: 10px;
    font-size: 23px;
    background-image: linear-gradient(to Right, #2E8FE5, #186BC7);
    color: #fff;
    letter-spacing: 5px;
}

/deep/ input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 0px transparent inset !important;
}

input:-internal-autofill-previewed,
input:-internal-autofill-selected {
    -webkit-text-fill-color: #FFFFFF !important;
    transition: background-color 5000s ease-in-out 0s !important;
}

/deep/ input:-internal-autofill-selected {
    transition: background-color 5000s ease-in-out 0s !important;
    background-color: transparent !important;
}
</style>