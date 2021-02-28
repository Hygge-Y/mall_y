import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from ' ./store'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

// Vue.use(Toast)
// Vue.use(LazyLoad, {
  // loading: require('assets/img/common/placeholder.png')
// })



new Vue({
  render: h => h(App),
  router
}).$mount('#app')
