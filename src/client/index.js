import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Navbar from './components/Navbar.vue';
import Article from './components/Article.vue';
import Detail from './components/Detail.vue';
import About from './components/About.vue';
import ElementUI from 'element-ui';

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)

var router = new VueRouter({
    routes: [{
        path: '/article',
        component: Article,
        name: "article"
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
        redirect: '/article'
    }, {
        path: '/detail',
        redirect: '/article'
    }]
})

new Vue({
    el: '#app',
    data: {
        urls: [{ name: '首页', url: 'article' }, { name: '关于', url: 'about' }]
    },
    router,
    components: {
        'c-nav-bar': Navbar
    }
})