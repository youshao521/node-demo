
import Vue from 'vue';
import Vuex from 'vuex'
import Router from 'vue-router';
import Element from 'element-ui'

Vue.use(Router);
Vue.use(Vuex);
Vue.use(Element);
import App from './App.vue';
import createStore from './store/index.js';
import createRouter from './router/index.js';
import { sync } from 'vuex-router-sync';
import './css/element-red/index.css'
import './css/reset.css';

export default function createApp() {
    const router = createRouter();
    const store = createStore();
    const app = new Vue({
        el: '#app',
        router,
        store,
        render: h => h(App),
    });
    return {app, router, store};
}

createApp();