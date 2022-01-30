import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont.css';

import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)

axios.defaults.baseURL='//81.68.237.235:9000/'
axios.defaults.withCredentials = false

Vue.prototype.$http=axios


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
