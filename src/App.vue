<template>
  <div id="app">
    <div>
      <pop-weather/> 
    </div>
  </div>
</template>

<script>
import PopWeather from "./packages/weather/avatar";
export default {
  name: 'app',
  components:{
    PopWeather
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">

</style>
