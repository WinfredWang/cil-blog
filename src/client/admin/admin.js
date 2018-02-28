import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Login from '../components/admin/Login.vue';
import Home from '../components/admin/Home.vue';
import Post from '../components/admin/Post.vue';
import Manage from '../components/admin/Manager.vue';
import Nav from '../components/Navbar.vue';
import ElementUI from 'element-ui';

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)

var router = new VueRouter({
    routes: [
        {
            path: '/login',
            component: Login,
            name: "login"
        },
        {
            path: '/home',
            component: Home,
            name: "home",
            children: [
                {
                    path: 'manage',
                    name: "manage",
                    component: Manage
                },
                {
                    path: 'post',
                    name: "post",
                    component: Post
                },
                {
                    path: '*',
                    redirect: 'manage'
                }
            ]
        },
        {
            path: '/',
            redirect: '/login'
        }
    ]
});

Vue.component('c-nav-bar', Nav);

var bus = new Vue()
var app = new Vue({
    el: '#app',
    data: {
        urls: [{ name: '首页', url: 'manage' }, { name: '写博客', url: 'post' }]
    },
    router
});