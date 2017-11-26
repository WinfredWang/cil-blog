<template>
    <div class="row">
        <div class="col-md-6 write clearfix">
            <div>
                <div class="title">
                    <input v-model="article.title" placeholder="title">
                </div>
                <ul class="toolbar clearfix">
                    <li v-on:click="save">Post</li>
                </ul>
                <div class="editor" style="padding: 10PX;background-color: #fff;">
                    <textarea id="text-input" v-model="article.content" v-on:input="update" rows="6" cols="60"></textarea>
                </div>
            </div>
        </div>
        <div class="col-md-6 preview clearfix">
            <div id="preview" style="padding:10px 5px">
            </div>
        </div>
    </div>
</template>
<script>
var Markdown = require('markdown').Converter;
var converter = new Markdown();
export default {
    data: function () {
        return {
            article: {}
        }
    },
    created: function () {
        var id = this.$route.params.id;
        if (id) {
            this.$http.get('/article/' + id).then((response) => {
                this.article = response.data[0];
                this.update();
            });
        }
    },
    methods: {
        update: function () {
            document.getElementById('preview').innerHTML = converter.makeHtml(this.article.content);
        },
        save: function () {
            this.$http.post('/article/save', { article: this.article }).then((response) => {
                alert(response.body.msg);
            });
        },
    }
}
</script>