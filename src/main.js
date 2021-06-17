import { createApp } from 'vue'
import 'normalize.css/normalize.css'
import Antd from 'ant-design-vue'
import '@/styles/antd.less'
import '@/styles/index.less'

import App from './App.vue'
import router from './router'
import store from './store'

import './permission'

const app = createApp(App)
app.config.productionTip = false

app.use(Antd)
app.use(router)
app.use(store)

app.mount('#app')
