<template>
    <div style="margin:0 auto;width:1000px">

        <div id="article-detail">
            <div class="title">
                {{article.title}}
            </div>
            <div class="tag">
                <span>时间 : {{dateFormat(article.postTime)}}</span>
                <span>阅读 : {{article.readTime}}</span>
                <span>评论 : {{comments.length}}</span>
            </div>
            <div class="content markdown-body" id="content">
                {{article.content}}
            </div>
        </div>
        <div class="comment-area" style="margin-top:30px ">
          <div class="count">评论数: {{comments.length}}</div>
            <div class="comment-list">
              <div class="comment" v-for="item in comments" v-bind:key="item.id">
                <div class="user">{{item.nickName}} : </div>
                <div class="content">{{item.content}}</div>
                <div class="footer">{{dateFormat(item.time)}}</div>
              </div>
            </div>
            <div class="post-comment" style="width: 60%;">
                <el-form :label-position="'left'"  :model="comment" :rules="rules" ref="comment" label-width="100px">
                  <el-form-item  label="请输入昵称"  prop="nickName">
                      <el-input v-model="comment.nickName" placeholder="请输入昵称"></el-input>
                  </el-form-item>
                  <el-form-item  label="请输入邮件" prop="email">
                        <el-input v-model="comment.email" placeholder="请输入邮件"></el-input>
                  </el-form-item>
                  <el-form-item label="评论" prop="content">
                    <el-input type="textarea"   :autosize="{ minRows: 2, maxRows: 40}" v-model="comment.content"></el-input>
                  </el-form-item>
                  <el-form-item >
                        <el-button type="primary" @click="post('comment')">发表</el-button>
                  </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import { dateFormat, toHTML } from "../util.js";

export default {
  data: function() {
    return {
      article: {},
      comments: [],
      comment: {
        nickName: "",
        email: "",
        content: ""
      },
      rules: {
        nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "请输入邮件",
            trigger: "blur"
          },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        content: [
          {
            required: true,
            message: "请留下你的评论",
            trigger: "blur"
          },
          {
            min: 3,
            max: 200,
            message: "长度在 3 到 200 个字符",
            trigger: "blur"
          }
        ]
      }
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
    this.getComments();
  },
  methods: {
    getComments: function() {
      var url = "/route/article/" + this.$route.params.id + "/comments";
      this.$http.get(url).then(response => {
        this.comments = response.body;
      });
    },
    initMarkdown: function() {
      document.getElementById("content").innerHTML = toHTML(
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
      setTimeout(() => {
        this.$http.put("/route/article/" + this.article._id + "/readtime");
      }, 10000);
    },
    post: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.comment.articleId = this.article._id;
          this.$http
            .post(`/route/comment`, { comment: this.comment })
            .then(response => {
              this.$message({ type: "success", message: "评论成功" });
            });
        }
        return false;
      });
    },
    dateFormat: function(time) {
      return dateFormat(time);
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
  font-size: 25pt;
  margin: 5px 0px;
  border-bottom: 1px solid #efefef;
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
  font-size: 14pt;
  border-bottom: 1px solid #c7c7c7;
}
.comment .user {
  font-size: 12pt;
  color: #ff9d00;
}
.comment .content {
  margin-top: 8px;
  padding: 5px;
  font-size: 10pt;
}
.comment .footer {
  line-height: 12px;
  height: 12px;
  text-align: right;
  font-size: 9pt;
  opacity: 0.5;
}
.comment {
  border-bottom: 1px dashed #f5e5cb;
  padding: 5px 0px;
}
.post-comment .el-form-item {
  margin-top: 25px;
}
</style>