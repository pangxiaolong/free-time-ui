import AvatarWeather from './packages/weather/index.js';
const components = [
  AvatarWeather
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
  AvatarWeather
}
