import Vue from "vue"
import Router from "vue-router"
import Index from './pages/index/index.vue'


Vue.use(Router)

const router=new Router({
    mode: 'history',
    routes:[
        {path:'/',redirect:'/index'},
        {path:'/index',component:Index}
    ]
})

export default router