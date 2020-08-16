import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.axios = axios // 原型加上axios后，其他组件就不需要再次引入
Vue.filter('setWH',(img,arg) => {
  return img.replace(/w\.h/,"128.180")
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
