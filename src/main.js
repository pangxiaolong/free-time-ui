import Vue from 'vue'
import App from './App.vue'
import PopWeather from './index.js'
import VueJsonp from 'vue-jsonp'

Vue.use(VueJsonp)
Vue.use(PopWeather)

new Vue({
    el: '#app',
    render: h => h(App),
})
