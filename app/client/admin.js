var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');
var Login = require('./components/admin/Login.vue')
var Home = require('./components/admin/Home.vue');
var Post = require('./components/admin/Post.vue')
var Manage = require('./components/admin/manager.vue')
var Nav = require('./components/Navbar.vue')

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
        urls: []
    },
    router,
    methods: {
        getUrls: function () {
            this.$http.get('/nav/url?u=admin').then((response) => {
                if (response.body) {
                    this.urls = response.body;
                }
            });
        }
    }
});