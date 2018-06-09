import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Home from '../components/admin/Home.vue';
import Post from '../components/admin/Post.vue';
import ArticelManager from '../components/admin/ArticelManager.vue';
import Nav from '../components/Navbar.vue';
import Tag from '../components/admin/Tag.vue'
import ElementUI from 'element-ui';

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)

var router = new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home,
            name: "home"
        }, 
        {
            path: '/post',
            name: "post",
            component: Post
        },
        {
            path: '/tag',
            name: "tag",
            component: Tag
        },
        {
            path: '/',
            redirect: '/home'
        }
    ]
});

Vue.component('c-nav-bar', Nav);
Vue.component('articel-manager', ArticelManager);

var bus = new Vue()
var app = new Vue({
    el: '#app',
    data: {
        urls: [{ name: '标签', url: 'tag' },{ name: '写博客', url: 'post' }, { name: '首页', url: 'home' }]
    },
    router
});