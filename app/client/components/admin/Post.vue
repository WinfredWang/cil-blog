<template>
    <div class="row">
        <div class="col-md-6 write clearfix">
            <div>
                <div class="title">
                    <input v-model="title" placeholder="title">
                </div>
                <ul class="toolbar clearfix">
                    <li v-on:click="save">Post</li>
                </ul>
                <div class="editor" style="padding: 10PX;background-color: #fff;">
                    <textarea id="text-input" v-model="content" v-on:input="update" rows="6" cols="60"></textarea>
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
            content: '',
            title: ''
        }
    },
    methods: {
        update: function () {
            document.getElementById('preview').innerHTML = converter.makeHtml(this.content);
        },
        save: function () {
            this.$http.post('article/save', { content: this.content, title: this.title }).then((response) => {
                alert(response.body.msg);
            });
        },
    }
}
</script>