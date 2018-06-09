<template>
    <div class="tag-container">
        <div>
            <el-tag v-for="tag in tags" :key="tag.name" closable  
                :disable-transitions="false"
                @close="deleteTag(tag)">{{tag.name}}</el-tag>
        </div>
        <div class="new-tag-container">
            <el-input class="new-tag-input" v-if="inputVisible" v-model="newTag" @blur="addTag" @keyup.enter.native="addTag"></el-input>
            <el-button v-else class="new-tag-button" size="small" @click="showInput">+ New Tag</el-button>
        </div>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      inputVisible: false,
      newTag: "",
      tags: []
    };
  },
  mounted: function() {
    this.$http.get("/route/tags").then(response => {
      this.tags = response.body;
    });
  },
  methods: {
    deleteTag: function(tag) {
      this.$http.delete(`/route/tag/${tag.name}`).then(() => {
        let index = this.tags.indexOf(tag);
        this.tags.splice(index, 1);
      });
    },
    addTag: function() {
      if (this.newTag) {
        this.$http
          .post(`/route/tag`, { tag: { name: this.newTag } })
          .then(() => {
            this.tags.push({
              name: this.newTag
            });
            this.newTag = "";
            this.showInput();
          });
      }
    },
    showInput: function() {
      this.inputVisible = !this.inputVisible;
    }
  }
};
</script>
<style scoped>
.tag-container .el-tag {
  margin-right: 20px;
}
.new-tag-container {
  margin-top: 20px;
}
.new-tag-button {
  width: 100px;
}
.new-tag-input {
  width: 200px;
}
</style>
