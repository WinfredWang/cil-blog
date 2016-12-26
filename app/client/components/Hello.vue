<template>
    <div> {{msg}}</div>
</template>

<script>
    export default {
        data: function () {
            return {
                msg: 'Hello Componet!!'
            }
        }, 
        mounted: function () {
            console.log('hello');
        }
    }

</script>