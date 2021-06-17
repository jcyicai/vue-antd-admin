import { createApp } from 'vue'
import 'normalize.css/normalize.css'
import Antd from 'ant-design-vue';
//import ElementPlus from 'element-plus'
//import 'element-plus/lib/theme-chalk/index.css'
//import '/@/styles/element-variables.scss'
//import 'ant-design-vue/dist/antd.css'
import '/@/styles/antd.less'
import '/@/styles/index.less'

import App from './App.vue'
import router from '/@/router'

const app = createApp(App)
app.config.productionTip = false;

app.use(Antd)
app.use(router)

app.mount('#app')
