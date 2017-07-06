<template>
    <div>
	    <div class="list-group">xxx
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
            this.$http.post('/admin/islogin').then((response) => {
                if (response.body.status !== 0) {
                    this.$router.push({ path: '/login' })
                } else {
                    bus.$emit('geturl')
                }
            });
           
        }
    }
</script>