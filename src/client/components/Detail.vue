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
        <div class="comment-area" style="margin:30px auto;width:80%">
          <div class="count">评论数: {{comments.length}}</div>
            <div class="comment-list">
              <div class="comment" v-for="item in comments" v-bind:key="item.id">
                <div class="user">{{item.user}} : </div>
                <div class="content">{{item.content}}</div>
                <div class="footer">{{item.time}}</div>
              </div>
            </div>
            <div class="post-comment" style="width:80%">
                <el-form>
                  <el-form-item  label="请输入昵称">
                      <el-input v-model="comment.nickName" placeholder="请输入昵称"></el-input>
                  </el-form-item>
                  <el-form-item  label="请输入邮件">
                        <el-input v-model="comment.email" placeholder="请输入邮件"></el-input>
                  </el-form-item>
                  <el-form-item label="评论">
                    <el-input type="textarea" v-model="comment.content"></el-input>
                  </el-form-item>
                  <el-form-item >
                        <el-button type="primary" @click="post">发表</el-button>
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
      article: {},
      comments: [],
      comment: {}
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
        this.article = response.body;
        this.initMarkdown();
      });
    },
    updateReadTime: function() {
      //this.$http.post('/article/' + this.article._id + "/readtime", { article: { readTime: this.article.readTime} })
    },
    post: function() {}
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
.el-form-item {
  margin-bottom: 0px;
}
.comment-area .count {
  font-size: 20pt;
  border-bottom: 1px solid #c7c7c7;
}
.comment .user {
  font-size: 16pt;
  color: #ff9d00;
}
.comment .content {
  margin-top: 8px;
  padding: 5px;
}
.comment .footer {
  line-height: 15px;
  height: 15px;
  text-align: right;
}
.comment {
  border-bottom: 1px dashed #f5e5cb;
  padding: 5px 0px;
}
</style>