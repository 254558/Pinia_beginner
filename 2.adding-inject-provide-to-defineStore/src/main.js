import { createApp } from 'vue'
import App from './App.vue'
import { appPlugin } from './my-pinia' // ✅ 引入你的插件

const app = createApp(App)

app.use(appPlugin) // ✅ 必须要 use 插件，才能注入 stores/effect

app.mount('#app')