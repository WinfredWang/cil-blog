<template>
    <nav class="navbar navbar-default">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">Cil Blog</a>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li v-for="item in items">
                        <router-link :to="{ name: item.url}">{{item.name}}</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        data: function () {
            return {
                items: []
            }
        },
        mounted: function () {
            this.$http.get('/url').then((response) => {
                this.items = response.body;
            });
        }
    }

</script>