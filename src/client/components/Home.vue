<template>
    <div class="list-group" id="main-content">
      <el-row>
        <el-col :span="16">
          <el-card class="list-group-item" v-for="item in articles" v-bind:key="item.id">
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
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="6">
          </el-col>
      </el-row>
    </div>
</template>

<script>
import { dateFormat } from "../util";
export default {
  data: function() {
    return {
      articles: []
    };
  },
  mounted: function() {
    this.$http.get("/route/articles").then(response => {
      this.articles = response.body;
    });
  },
  methods: {
    dateFormat: function(time) {
      return dateFormat(time);
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
  border-top: 1px dashed #ff9d00;
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
}
</style>