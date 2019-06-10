import Vue from 'vue';
import Router from 'vue-router'

Vue.use(Router);

import App from '../pages'


const routes = [
    {
        path: '*',
        component: App,
    }
];

const router = new Router({
    linkActiveClass: 'active',
    mode: 'history',
    routes,
});

export default router
