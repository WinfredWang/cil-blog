var Vue = require('vue');
var VueResource = require('vue-resource');
var Markdown = require('markdown');

Vue.use(VueResource)

var app = new Vue({
    el: '#app',
    data: {
        title: '',
        content: ''
    },
    methods:{
        update:function() {
            document.getElementById('preview').innerHTML = Markdown.toHTML(this.content);
        },
        save: function () {
            this.$http.post('/save', { content: this.content, title: this.title }).then((response) => {
                alert(response.body.msg);
            });
        },
    }
});