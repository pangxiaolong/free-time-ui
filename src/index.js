import PopWeather from './packages/weather/index.js';
const components = [
  PopWeather
]
const install = function (Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default {
  install,
  PopWeather
}
