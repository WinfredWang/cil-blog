<template>
    <div class="list-group" id="main-content">
        <div class="list-group-item" v-for="item in articles">
            <div class="list-group-item-heading article-title">
                <div class="row">
                    <div class="col-md-10">{{item.title}}</div>
                    <div class="col-md-1">delete</div>
                    <div class="col-md-1">edit</div>
                </div>
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
    color: #000000;
}

#main-content .article-title:hover a {
    color: #ff9d00;
    text-decoration: none;
}

#main-content .article-title {
    font-size: 15px;
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