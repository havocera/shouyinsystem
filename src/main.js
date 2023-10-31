import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import NutUI from "@nutui/nutui";
import "@nutui/nutui/dist/style.css";
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
app.use(ElementPlus,{  locale: zhCn,})
app.use(NutUI)
app.use(router).mount('#app')
