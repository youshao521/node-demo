import Router from 'vue-router';

import Home from '../view/Home.vue';
import Demo1 from '../view/Demo1.vue';
import Demo2 from '../view/Demo2.vue';

export default function createRouter() {
  return new Router({
    fallback: false,
    mode: 'history',
    routes: [
      {
        path: '/',
        redirect: '/home'
      },
      { 
        path: '/home',
        name: 'home',
        component: Home,
      },
      { 
        path: '/demo1',
        name: 'demo1',
        component: Demo1,
      },
      { 
        path: '/demo2',
        name: 'demo2',
        component: Demo2,
      },
    ]
  });
}