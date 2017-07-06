var Vue = require('vue');
var VueResource = require('vue-resource');
var Markdown = require('markdown').Converter;
var converter = new Markdown();

Vue.use(VueResource)

var app = new Vue({
    el: '#app',
    data: {
        title: '',
        content: ''
    },
    mounted: function () {

    },
    methods:{
        update:function() {
            document.getElementById('preview').innerHTML = converter.makeHtml(this.content);
        },
        save: function () {
            this.$http.post('/save', { content: this.content, title: this.title }).then((response) => {
                alert(response.body.msg);
            });
        },
    }
});