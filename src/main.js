import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from "./router.js"
import './assets/css/global.css'



import axios from 'axios'
//请求根路径
axios.defaults.baseURL='http://whgcdxjsjxh.cn.utools.club'
axios.interceptors.request.use(config=>{
    console.log(config)
    config.headers.Authorization=window.sessionStorage.getItem('token')
    return config
})
Vue.prototype.$http=axios


Vue.config.productionTip = false

new Vue({
	router,
  render: h => h(App),
}).$mount('#app')
