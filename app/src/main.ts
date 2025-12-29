import { createApp } from 'vue'
import "@styles/font.css";
import '@styles/main.scss'
import App from './App.vue'
import pkg from '../../package.json' assert { type: 'json' }

const app = createApp(App)

app.mount('#app')

console.log(pkg.name, pkg.version);

window.addEventListener("contextmenu", e => e.preventDefault());


