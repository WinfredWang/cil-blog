var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');
var Navbar = require('./components/Navbar.vue')
var Article = require('./components/Article.vue')
var Detail = require('./components/Detail.vue')
var About = require('./components/About.vue')
var Post = require('./components/post.vue')

Vue.use(VueRouter)
Vue.use(VueResource)

var router = new VueRouter({
    routes:[
        {   
            path: '/article',
            component: Article, 
            name:"article"
        }, 
        { 
            path: '/detail/:id', 
            component: Detail, 
            name:"detail"
        },
        {
            path: '/about',
            component: About, 
            name:"about"
        },
                {
            path: '/post',
            component: Post, 
            name:"post"
        },
        { 
            path: '/', 
            redirect:'/article'
        },
        { 
            path: '/detail',
            redirect:'/article'
         }
    ]
})

new Vue({
  el: '#app',
  data: {
      message: "Hello Vue"
  },
  router,
  components: {
       'c-nav-bar':Navbar
   }
})