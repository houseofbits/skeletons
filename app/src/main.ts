import { createApp } from 'vue'
import "@styles/font.css";
import '@styles/main.scss'
import App from './App.vue'
import router from './router/routes'

const app = createApp(App)

app.use(router)
app.mount('#app')

/*
    * Language helpers
*/