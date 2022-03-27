import Vue from "vue"
import Router from "vue-router"
import Index from './pages/index/index.vue'
import Problem from './pages/problem/index.vue'
import Article from './pages/article/index'
import Admin from './pages/black/index'
import Add from './pages/black/AddArticle/index'
import Misc from './pages/problem/misc/misc'
import AddProblem from "@/pages/black/AddProblem";
import MiscProblem from './pages/problem/misc/problem/index.vue'
import Login from './pages/admin/login.vue'
import Notice from './pages/black/AddNotice/index.vue'
import AddCarousel from './pages/black/Carousel/AddImages/index'
import Reverse  from './pages/problem/reverse/reverse'

Vue.use(Router)

const router=new Router({
    //mode: 'history',
    routes:[
        {path:'/',redirect:'/index'},
        {path:'/login',component:Login},
        {path:'/index',component:Index},
        {
            path:'/problem',component:Problem,
            children:[
                {path:'/misc',component:Misc},
                {path:'/reverse',component:Reverse},
            ]
        },
        {path:'/article/:id',component:Article},    //文章详情
        {path:'/problem/misc/:id',component:MiscProblem},    //题目详情

        {
            path:'/admin',component:Admin,
            //redirect:'/find',			//重定向路由
            children:[
                {path:'/add',component:Add},
                {path:'/addproblem',component: AddProblem},
                {path: '/notice',component: Notice},
                {path: '/addcarousel',component: AddCarousel},

            ]
        }
    ]
})

export default router
