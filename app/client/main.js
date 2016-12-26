var Vue = require('vue');
var VueRouter = require('vue-router');
var Hello = require('./components/Hello.vue')
var Bar = require('./components/Bar.vue')

Vue.use(VueRouter)

var router = new VueRouter({
    routes:[
        {   
            path: '/hello',
            component: Hello,name:"hello"
        }, 
        { path: '/bar', component: Bar,name:"bar"},
        { path: '/', redirect:'/hello'}
    ]
})

new Vue({
  el: '#app',
  data: {
      message: "Hello Vue"
  },
  router
})