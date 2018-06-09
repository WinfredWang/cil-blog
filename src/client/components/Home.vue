<template>
    <div class="list-group" id="main-content">
      <el-row>
        <el-col :span="16" :offset="1">
          <el-card class="list-group-item" v-for="item in articles" v-bind:key="item.id" shadow="hover">
            <div class="list-group-item-heading article-title">
              <router-link :to="{ name: 'detail', params: { id: item._id, article:item }}">
                  {{item.title}}
              </router-link>
            </div>
            <div class="article-footer">
              <span>时间 : {{dateFormat(item.postTime)}}</span>
              <span>阅读 : {{item.readTime}}</span>
            </div>
          </el-card>
          <div class="page-query-index">
            <span class="index" v-on:click="lastPage">上一页</span>
            <span class="index" v-on:click="nextPage">下一页</span>
          </div>
            
        </el-col>
        <el-col :span="5" :offset="1">
          <div class="tag-container">
            <h4>文章标签</h4>
              <div class="tag-list" v-on:click="queryByTag">
                  <el-tag type="info" v-for="tag in tags" :key="tag.name" >{{tag.name}}</el-tag>
              </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import { dateFormat } from "../util";
export default {
  data: function() {
    return {
      articles: [],
      tags: [],
      pageIndex: 1,
      tag: ""
    };
  },
  mounted: function() {
    this.queryArticles();
    this.$http.get("/route/tags").then(response => {
      this.tags = response.body;
    });
  },
  methods: {
    dateFormat: function(time) {
      return dateFormat(time);
    },
    queryByTag: function(e) {
      if (e.target && e.target.classList.contains("el-tag")) {
        let tag = e.target.textContent;
        if (tag) {
          this.tag = tag;
          this.queryArticles();
        }
      }
    },
    queryArticles: function() {
      (!this.pageIndex || this.pageIndex < 1) && (this.pageIndex = 1);
      let url = `/route/articles?pageIndex=${this.pageIndex}`;
      this.tag && (url = url + `&tag=${this.tag}`);
      this.$http.get(url).then(response => {
        this.articles = response.body;
      });
    },
    lastPage: function() {
      this.pageIndex--;
      this.queryArticles();
    },
    nextPage: function() {
      this.pageIndex++;
      this.queryArticles();
    }
  }
};
</script>
<style scoped>
#main-content .article-title {
  font-size: 25px;
  cursor: pointer;
}
#main-content .article-footer {
  border-top: 1px dashed #d8d6d2;
  margin: 0px -15px;
  margin-top: 10px;
  font-size: 9px;
  color: #999;
  padding: 9px 0px 0px 15px;
}
#main-content .article-footer span {
  margin-right: 10px;
}
.el-card {
  margin-bottom: 10px;
  border: none;
  border-radius: 0;
}
.tag-container {
  border: 1px solid #ece9e9;
  border-radius: 10px;
  padding: 5px;
  background-color: #fff;
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.el-tag {
  cursor: pointer;
  margin-top: 10px;
  margin-right: 5px;
}
.el-tag:hover {
  color: #ff9d00;
}
.tag-container h4 {
  border-bottom: 1px solid #ece9e9;
}

.page-query-index {
  display: flex;
  justify-content: flex-end;
}

.page-query-index .index {
  color: #555;
  font-size: 11pt;
  cursor: pointer;
  margin-right: 10px;
  opacity: 0.5;
}

.page-query-index .index:hover {
  opacity: 1;
}
</style>