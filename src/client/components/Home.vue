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
          <div class="page-query">
            <span class="more" v-on:click="loadMore" v-if="!isBottom">加载更多</span>
            <span class="no-data" v-else>已到底部</span>
          </div>
            
        </el-col>
        <el-col :span="5" :offset="1">
          <div class="tag-container">
            <h4>文章标签</h4>
              <div class="tag-list">
                  <span class="tag" v-for="tag in tags" :key="tag.name" v-on:click="queryByTag(tag)">{{tag.name}}</span>
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
      tag: "",
      count: 0,
      isBottom: false
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
    queryByTag: function(tag) {
      this.tag = tag;
      this.articles = [];
      this.pageIndex = 1;
      this.queryArticles();
    },
    queryArticles: function() {
      (!this.pageIndex || this.pageIndex < 1) && (this.pageIndex = 1);

      let url = `/route/articles?pageIndex=${this.pageIndex}`;
      this.tag && (url = url + `&tag=${this.tag.name}`);

      return this.$http.get(url).then(response => {
        let body = response.body;

        if (body.value.length > 0) {
          this.articles.push(...body.value);
        }
        this.pageIndex = body.index;
        this.count = body.count;

        this.isBottom = body.count == this.articles.length;
      });
    },
    loadMore: function() {
      if (this.articles.length < this.count) {
        this.pageIndex++;
        this.queryArticles();
      }
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
  padding: 5px;
  background-color: #fff;
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.tag-container h4 {
  border-bottom: 1px solid #ece9e9;
}

.page-query {
  display: flex;
  justify-content: center;
}

.page-query .more,
.page-query .no-data {
  color: #555;
  font-size: 11pt;
  cursor: pointer;
  margin-right: 10px;
  opacity: 0.5;
}

.page-query .more:hover {
  opacity: 1;
}

.tag {
  cursor: pointer;
  margin-top: 10px;
  margin-right: 5px;
  background-color: rgba(144, 147, 153, 0.1);
  padding: 0 10px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  color: #999;
  box-sizing: border-box;
  border: 1px solid #e3e3e3;
  white-space: nowrap;
}
.tag:hover {
  color: #ff9d00;
}
</style>