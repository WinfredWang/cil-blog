<template>
    <div>
    article detail  {{ $route.params.id }}
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                msg: 'Hello Componet!!'
            }
        }, 
        mounted: function () {
            console.log('detail');
        }
    }

</script>