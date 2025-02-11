import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import i18n from './i18n';
import 'vue-select/dist/vue-select.css';

const pinia = createPinia()

createApp(App)
    .use(pinia)
    .use(i18n)
    .mount('#app');
