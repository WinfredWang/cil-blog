<template>
    <div>
        <c-nav-bar v-bind:items="urls"></c-nav-bar>
        <div class="container">
             <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            urls: []
        }
    },
    created: function () {
        this.$http.post('/admin/validate').then((response) => {
            if (response.body.status !== 0) {
                this.$router.push({ path: '/login' })
            } else {
                //this.$router.push({ path: '/login' });
            }
        });

        this.$http.get('/nav/url?u=admin').then((response) => {
            this.urls = response.body;
        });

    }
}
</script>