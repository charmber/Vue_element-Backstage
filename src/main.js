import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont.css';

import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)

axios.defaults.baseURL='//127.0.0.1:9000/'
axios.defaults.withCredentials = false

Vue.prototype.$http=axios


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
