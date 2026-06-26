import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

console.log("Variável carregada durante o build:", process.env.VUE_APP_API_URL);

createApp(App).use(router).mount('#app')
