import Vue from 'vue'
import Element from 'element-ui'
import '../element-variables.scss'
import { Form,FormItem } from 'element-ui'
import { Input } from 'element-ui'

import { Message } from 'element-ui';


Vue.use(Element)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.prototype.$message=Message		//全局挂载
