<template>
    <div>
        <div id="content"></div>
    </div>
</template>
<script>
    var Markdown = require('markdown2');
    export default {
        data: function () {
            return {
                article: null
            }
        },
        created: function () {
            debugger;
            var rA = this.$route.params.article;
            if (rA) {
                this.article = this.$route.params.article;
            } else {
                this.getArticel();
            }
        },
        mounted: function () {
            this.update();
        },
        methods: {
            update: function () {
                document.getElementById('content').innerHTML = Markdown.toHTML(this.article.content);
            },
            getArticel: function() {
                var url = 'article/' + this.$route.params.id
                this.$http.get(url).then((response) => {
                    this.article = response.data[0];
                    this.update();
                });
            }
        }
    }

</script>