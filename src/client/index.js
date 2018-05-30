import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Navbar from './components/Navbar.vue';
import Home from './components/Home.vue';
import Detail from './components/Detail.vue';
import About from './components/About.vue';
import ElementUI from 'element-ui';

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)

var router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/home',
        component: Home,
        name: "home"
    }, {
        path: '/detail/:id',
        component: Detail,
        name: "detail"
    }, {
        path: '/about',
        component: About,
        name: "about"
    },
    {
        path: '/',
        redirect: '/home'
    }, {
        path: '/detail',
        redirect: '/home'
    }]
})

Vue.component('c-nav-bar', Navbar);

new Vue({
    el: '#app',
    data: {
        urls: [{ name: '关于', url: '/about' }, { name: '首页', url: '/home' }]
    },
    router
})