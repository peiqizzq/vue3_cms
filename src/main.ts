import { createApp } from 'vue'
// import App from './TestApp.vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './assets/css/index.less'

// 这是全局使用element-plus
// import ElementPlus from 'element-plus'
// import 'element-plus/theme-chalk/index.css'
// .use(ElementPlus)
// 在glogal中抽离elementplus代码
import { registerApp } from './global'

// login后恢复用户信息
import { setupStore } from './store'

const app = createApp(App)

app.use(store)
// 在app.use(router之前注册动态路由)。因为app.use会去执行router的install函数，会提前匹配好to对象，这时没有动态路由，就匹配到notfound
setupStore()
app.use(router)
registerApp(app) // 可以使用app.use(registerApp)，效果一样。因为app.use就是会执行传入的函数并传入参数app或者执行传入的对象的install方法
app.mount('#app')
