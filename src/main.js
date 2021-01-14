import { createApp } from 'vue';
import Maska from 'maska';
import App from './App.vue';
import router from './router/router';
import store from './store';
import './index.css';

createApp(App).use(router).use(store).use(Maska)
  .mount('#app');
