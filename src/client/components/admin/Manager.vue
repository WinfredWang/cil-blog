<template>
    <div class="articel-manager">
        <el-card v-for="(item, index) in articles" v-bind:key="item.id">
            <div class="row">
                <div class="item title">{{item.title}}</div>
                <div class="item link"><a href="javascript:void" v-on:click="del(item, index)">delete</a></div>
                <div class="item link"><a href="javascript:void" v-on:click="edit(item)">edit</a></div>
            </div>
        </el-card>
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
<style>
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