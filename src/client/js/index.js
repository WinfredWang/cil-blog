var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');
var Navbar = require('../components/Navbar.vue')
var Article = require('../components/Article.vue')
var Detail = require('../components/Detail.vue')
var About = require('../components/About.vue')

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
		urls: []
	},
	router,
	components: {
		'c-nav-bar': Navbar
	},
	created: function () {
		this.$http.get('/nav/url').then((response) => {
			this.urls = response.body;
		});
	}
})