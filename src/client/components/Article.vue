<template>
    <div class="list-group" id="main-content">
        <div class="list-group-item" v-for="item in articles" v-bind:key="item.id">
            <div class="list-group-item-heading article-title">
                <router-link :to="{ name: 'detail', params: { id: item._id, article:item }}">
                    {{item.title}}
                </router-link>
            </div>
            <div class="list-group-item-text">
                {{item.content}}
            </div>
            <div class="article-footer">
                <span>时间 : 2017-1-1</span>
                <span>作者 : Winfred</span>
                <span>阅读 : 128</span>
                <span>评论 : 15</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            debugger;
            return {
                articles: []
            }
        },
        mounted: function () {
            this.$http.get('/article').then((response) => {
                this.articles = response.body;
            });
        }
    }

</script>
<style>
#main-content .article-title a {
    color:#000000;
}
#main-content .article-title:hover a {
    color:#ff9d00;
    text-decoration: none;
}
#main-content .article-title {
    font-size:25px;
    cursor: pointer;
}
#main-content .article-footer {
    border-top: 1px dashed #ff9d00;
    margin: 0px -15px;
    margin-top: 10px;
    font-size: 9px;
    color: #999;
    padding: 9px 0px 0px 15px;
}
#main-content .article-footer span {
    margin-right: 10px;
}
</style>