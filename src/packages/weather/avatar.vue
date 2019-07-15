<template>
  <div>
    <div class="pop-avatar" v-if="skyconList" @mouseover.stop="popoverShow()" @mouseleave.stop="popoverHidden()">
      <div class="pop-avatar-info">
        <div class="pop-avatar-now">
          <div class="today-skycon">
            <img src="../../assets/sunny.png" :alt="skyconList.wea" />
          </div>
          <div class="now-temperature">{{skyconList.tem}}</div>
        </div>
        <div class="today-info">
          <div class="today-temperature">{{skyconList.tem2}}~{{skyconList.tem1}}</div>
          <div class="now-wind">
            <span v-if="night">{{skyconList.win[1]}} </span><span v-else>{{skyconList.win[0]}} </span>
            {{skyconList.win_speed}}</div>
        </div>
      </div>
      <div class="pop-avatar-tip" :alt="skyconList.air_tips">
        <span class="animate">{{skyconList.air_tips}}</span>
      </div>
    </div>
    <transition name="slide-fade">
      <popover class="popover-show" v-if="visible" :weatherList="weatherList" :tomorrowWeather="tomorrowWeather" />
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
        visible: false,
        skyconList: null,
        night: false,
        weatherList: null,
        tomorrowWeather: null
      };
    },
    created() {
      this.getWeather()
    },
    methods: {
      popoverShow() {
        this.visible = true;
      },
      popoverHidden() {
        this.visible = false;
      },
      getWeather() {
        const that = this;
        that.$jsonp(`https://www.tianqiapi.com/api`, {
            version: 'v1'
          })
          .then(res => {
            that.skyconList = res.data[0]
            let hour = new Date().getHours()
            that.night = hour > 17 ? true : false
            let {
              air,
              air_level,
              humidity
            } = res.data[0]
            let {
              wea,
              tem1,
              tem2
            } = res.data[1]
            that.weatherList = {
              air,
              air_level,
              humidity
            }
            that.tomorrowWeather = {
              wea,
              tem1,
              tem2
            }
            console.log(that.weatherList)
            console.log(that.tomorrowWeather)
          })
          .catch(error => {
            alert(error);
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
      transform: translateX(10px);
      -webkit-transform: translateX(10px);
    }

    50% {
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
    }

    100% {
      transform: translateX(-100%);
      -webkit-transform: translateX(-100%);
    }
  }
</style>
