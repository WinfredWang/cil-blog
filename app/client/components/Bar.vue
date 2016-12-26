<template>
    <div class="list-group">
        <div> {{msg}}</div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                msg: 'Hello Bar!!'
            }
        },
        mounted: function () {
            console.log('bar');
        }
    }
</script>