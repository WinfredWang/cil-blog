<template>
    <div class="row">
        <div class="col-md-12">
            title:<input v-model="title">
        </div>
        <div class="col-md-12">
            Content:<textarea v-model="content"></textarea>
        </div>
        <div class="col-md-6">
            <button v-on:click="post">Post</button>
            <button v-on:click="post">Draft</button>
        </div>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                content: '',
                title: ''
            }
        },
        methods: {
            post: function () {
                this.$http.post('/save', { content: this.content, title: this.title }).then((response) => {
                    alert(response.body.msg);
                });
            }
        },
        mounted: function () {
            console.log('bar');
        }
    }
</script>