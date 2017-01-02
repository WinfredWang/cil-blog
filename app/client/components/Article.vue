<template>
    <div class="list-group">
        <div class="list-group-item" v-for="item in articles">
            <router-link :to="{ name: 'detail', params: { id: item._id }}">
                <div>
                    <h4 class="list-group-item-heading">{{item.title}}</h4>
                    <p class="list-group-item-text">{{item.content}}</p>
                </div>
            </router-link>
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