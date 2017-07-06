var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');
var Login = require('./components/admin/Login.vue')
var Home = require('./components/admin/Home.vue')
var Nav = require('./components/Navbar.vue')

Vue.use(VueRouter)
Vue.use(VueResource)

var router = new VueRouter({
    routes:[
        {   
            path: '/login',
            component: Login, 
            name:"login"
        },
        {   
            path: '/home',
            component: Home, 
            name:"home"
        },
        { 
            path: '/',
            redirect:'/login'
         }
    ]
})


var app = new Vue({
  el: '#app',
  data: {
      urls:[]
  },
  router,
  components: {
    'c-nav-bar': Nav
  },
  created:function() {
    this.$http.get('/nav/url?u=admin').then((response) => {
            if (response.body) {
                this.urls = response.body;
            }
    });
  }
})