import Vue from 'vue'
import App from './App.vue'
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

new Vue({
    el: '#app',
    render: h => h(App),
})
