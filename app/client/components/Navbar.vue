<template>
    <nav class="navbar navbar-default">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">Cil Blog</a>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
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

<style>
.nav>li>.router-link-active {
    border-bottom: 3px solid #ff9d00;
    color:#ff9d00 !important
}
nav .navbar-header .navbar-brand {
     color:#ff9d00;
}

</style>