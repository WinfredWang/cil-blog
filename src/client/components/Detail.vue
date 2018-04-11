<template>
    <div>
        <div id="article-detail">
            <div class="title">
                {{article.title}}
            </div>
            <div class="tag">
                <span>时间 : 2017-1-1</span>
                <span>作者 : Winfred</span>
                <span>阅读 : 128</span>
                <span>评论 : 15</span>
            </div>
            <div class="content" id="content">
                {{article.content}}
            </div>
        </div>
        <div class="comment-area" style="margin-top:30px;">
          <div>留言</div>

            <div class="comment-list">

            </div>
            
            <div class="post-comment">
                <el-form>
                     <textarea></textarea>
                    <el-form-item>
                        <el-button type="primary" @click="login">Login</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
var Markdown = require("markdown").Converter;
var converter = new Markdown();
export default {
  data: function() {
    return {
      article: {}
    };
  },
  created: function() {
    var rA = this.$route.params.article;
    if (rA) {
      this.article = this.$route.params.article;
    } else {
      this.getArticel();
    }
  },
  mounted: function() {
    this.initMarkdown();
    this.updateReadTime();
  },
  methods: {
    initMarkdown: function() {
      document.getElementById("content").innerHTML = converter.makeHtml(
        this.article.content
      );
    },
    getArticel: function() {
      var url = "/route/article/" + this.$route.params.id;
      this.$http.get(url).then(response => {
        this.article = response.data[0];
        this.initMarkdown();
      });
    },
    updateReadTime: function() {
      //this.$http.post('/article/' + this.article._id + "/readtime", { article: { readTime: this.article.readTime} })
    }
  }
};
</script>
<style scoped>
#article-detail {
  background-color: #fff;
  padding: 15px;
}

#article-detail .title {
  font-size: 20px;
  margin: 5px 0px;
}

#article-detail .tag {
  font-size: 9px;
  color: #999;
  margin: 10px 0px;
  text-align: right;
}
#article-detail .tag span {
  margin-left: 10px;
}
</style>