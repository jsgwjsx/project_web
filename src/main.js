import { createApp } from 'vue'
import App from './home.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import esriConfig from "@arcgis/core/config";
// esriConfig.assetsPath = "./assets";
import '@arcgis/core/assets/esri/themes/light/main.css';


const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')

