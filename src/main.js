import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import VueAxios from 'vue-axios';
// import axios from 'axios';


import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false


// Vue.prototype.$axios = axios;

//添加事件总线对象
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)

//解决移动端的300ms的延迟(1.安装\2.导入\3.attach使用)
FastClick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

// Vue.use(Toast)
// Vue.use(LazyLoad, {
  // loading: require('assets/img/common/placeholder.png')
// })



new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
