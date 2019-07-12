<template>
    <div>
        <div class="pop-avatar" @mouseover.stop="popoverShow()" @mouseleave.stop="popoverHidden()">
            <div class="pop-avatar-info">
                <div class="pop-avatar-now">
                    <div class="today-skycon">
                        <img src="../../assets/sunny.png" alt />
                    </div>
                    <div class="now-temperature">32℃</div>
                </div>
                <div class="today-info">
                    <div class="today-temperature">22℃~29℃</div>
                    <div class="now-wind">北风3级</div>
                </div>
            </div>
            <div class="pop-avatar-tip" alt="温馨提示温馨提示温馨提示温馨提示温馨提示">
                <span class="animate">111温馨提示温馨提示温馨提示温馨提示温馨提示222</span>
            </div>
        </div>
        <transition name="slide-fade">
            <popover class="popover-show" v-if="visible" />
        </transition>
    </div>
</template>
<script>
    import axios from "axios";
    import Popover from "./popover";
    export default {
        components: {
            Popover
        },
        data() {
            return {
                ip: '',
                key: 'dd8a9404ede1e276bd36e060a6f9fc5c',
                adcode: null,
                visible: false,
                realResult: {},
                skycon: null, //主要天气现象
                skyconList: [{
                        code: "CLEAR_DAY",
                        name: "晴" //白天
                    },
                    {
                        code: "CLEAR_NIGHT",
                        name: "晴" //夜间
                    },
                    {
                        code: "PARTLY_CLOUDY_DAY",
                        name: "多云" //白天
                    },
                    {
                        code: "PARTLY_CLOUDY_NIGHT",
                        name: "多云" //夜间
                    },
                    {
                        code: "CLOUDY",
                        name: "阴"
                    },
                    {
                        code: "WIND",
                        name: "大风"
                    },
                    {
                        code: "HAZE",
                        name: "雾霾"
                    },
                    {
                        code: "RAIN",
                        name: "雨"
                    },
                    {
                        code: "SNOW",
                        name: "雪"
                    }
                ],
                temperature: null, //温度
                wind: {
                    direction: null, //风向
                    speed: null //风速
                },
                pm25: null //pm2.5
            };
        },
        created() {
            this.getIp()
        },
        methods: {
            popoverShow() {
                this.visible = true;
            },
            popoverHidden() {
                this.visible = false;
            },
            getIp() {
                const that = this;
                axios.get('https://restapi.amap.com/v3/ip?key=' + that.key)
                    .then(res => {
                        if (res.data.status === '1') {
                            that.adcode = res.data.adcode
                            that.getWeather(res.data.adcode)
                        } else {
                            alert(res.data.info)
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            getWeather(city) {
                const that = this;
                that.$jsonp(`https://www.tianqiapi.com/api?version=v6&cityid=${city}`)
                    .then(res => {
                        console.log('res',res);
                    })
                    .catch(error => {
                        console.log('error',error);
                    });
            },
            findSkycon(code) {
                let title = {};
                title = this.skyconList.find(v => {
                    if (v.code == code) {
                        return v;
                    }
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    .pop-avatar {
        display: inline-block;

        .pop-avatar-info {
            display: flex;


            .pop-avatar-now {
                display: flex;
                flex-direction: column;
                text-align: center;

                .today-skycon {
                    height: 30px;
                    width: 40px;
                    // background: #e2e2e2;
                }

                .now-temperature {
                    height: 20px;
                    font-size: 13px;
                    font-weight: bold;
                }
            }

            .today-info {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                height: 50px;
                width: 60px;
                text-align: center;

                .today-temperature {
                    font-size: 10px;
                }

                .now-wind {
                    font-size: 10px;
                }
            }
        }

        .pop-avatar-tip {
            overflow: hidden;
            width: 100px;
            height: 20px;
            line-height: 15px;
            border-top: 1px solid #f2f2f2;
        }

        .popover-show {}
    }

    .slide-fade-enter-active {
        transition: all 0.3s ease;
    }

    .slide-fade-leave-active {
        transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter,
    .slide-fade-leave-to {
        transform: translateY(-10px);
        opacity: 0;
    }

    .animate {
        padding-left: 10px;
        font-size: 10px;
        margin: 0;
        color: #000;
        display: inline-block;
        white-space: nowrap;
        animation: 10s wordsLoop linear infinite normal;
    }

    @keyframes wordsLoop {
        0% {
            transform: translateX(200px);
            -webkit-transform: translateX(200px);
        }

        100% {
            transform: translateX(-100%);
            -webkit-transform: translateX(-100%);
        }
    }
</style>
