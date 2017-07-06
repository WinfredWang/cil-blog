<template>
    <div> about me {{msg}}</div>
</template>

<script>
    export default {
        props: ['msg'],
        data: function () {
            return {
                msg:''
            }
        }, 
        mounted: function () {
            console.log('about Componet');
        }
    }

</script>