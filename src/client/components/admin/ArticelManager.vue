<template>
  <div class="articel-manager">
      <el-table :data="articles" style="width: 90%" stripe>
        <el-table-column prop="title" label="标题" width=""></el-table-column>
        <el-table-column prop="status" label="状态" width="100"></el-table-column>
        <el-table-column prop="address" label="评论数" width="80"></el-table-column>
        <el-table-column prop="readTime" label="阅读数" width="80"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="del(scope.row, index)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  data: function() {
    debugger;
    return {
      articles: []
    };
  },
  mounted: function() {
    this.$http.get("/article").then(response => {
      this.articles = response.body;
    });
  },
  methods: {
    del: function(item, index) {
      this.$http.delete("/article/" + item._id).then(response => {
        if (response.body.msg == "sucesss") {
          this.articles.splice(index, 1);
        }
      });
    },
    edit: function(item) {
      this.$router.push({ name: "post", params: { id: item._id } });
    }
  }
};
</script>
<style scoped>
.articel-manager {
  margin: 10px auto;
  width: 80%;
}
.el-card {
  margin-bottom: 10px;
}
.row {
  height: 20px;
  line-height: 20px;
  vertical-align: middle;
}

.articel-manager .item {
  float: left;
}

.articel-manager .title {
  width: 70%;
}

.articel-manager .link {
  width: 8%;
}
</style>