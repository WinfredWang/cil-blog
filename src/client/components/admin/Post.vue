<template>
    <div>
        <el-row >
            <el-col :span="12">
                <div class="title">
                    <input type="text" v-model="article.title" placeholder="title">
                    <div></div>
                </div>
                <div>
                    <ul class="toolbar">
                        <li  @click="dialogVisible = true">Add Tag</li>
                        <li v-on:click="save">Post</li>
                        <li v-on:click="draft">Draft</li>
                    </ul>
                </div>
                <div class="editor" style="padding: 10px;background-color: #fff;">
                    <textarea id="text-input" v-model="article.content" v-on:input="update" rows="60" cols="60"></textarea>
                </div>
            </el-col>
            <el-col :span="12">
                <div id="preview" class="markdown-body" style="padding:10px 5px">
                </div>
            </el-col>
        </el-row>
    <el-dialog  title="Add Tag"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">

      <div>
        <el-checkbox-group v-model="article.tags">
          <el-checkbox v-for="tag in tags" :label="tag.name" :key="tag.name">{{tag.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
   
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>
<script>
import { toHTML } from "../../util.js";
export default {
  data: function() {
    return {
      article: {
        tags:[]
      },
      dialogVisible: false,
      tags: []
    };
  },
  created: function() {
    var id = this.$route.params.id;
    if (id) {
      this.$http.get("/route/article/" + id).then(response => {
        this.article = response.data;
        this.update();
      });
    }

    this.$http.get("/route/tags").then(response => {
        this.tags = response.body;
      });
  },
  methods: {
    update: function() {
      document.getElementById("preview").innerHTML = toHTML(
        this.article.content
      );
    },
    save: function() {
      this.article.status = 1;
      this.saveOrUpdate(this.article);
    },
    draft: function() {
      this.article.status = 0;
      this.saveOrUpdate(this.article);
    },
    saveOrUpdate: function(article) {
      if (this.article._id) {
        this.$http
          .put("/route/article", { article: this.article })
          .then(response => {
             this.$message('保存成功');
          });
      } else {
        this.$http
          .post("/route/article", { article: this.article })
          .then(response => {
             this.$message('保存成功');
          });
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style scoped>
input,
textarea {
  border: none;
  outline: none;
  font-family: Consolas, "Courier New", monospace;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0px;
}

.title input {
  height: 40px;
  width: 98%;
  padding-left: 2%;
  font-size: 20px;
}

.toolbar {
  height: 40px;
}
textarea {
  width: 100%;
  resize: none;
  font-weight: normal;
  font-size: 15px;
  color: #5e6d82;
  line-height: 1.5em;
}

.toolbar {
  margin: 0;
  list-style-type: none;
  background-color: #dedede;
  line-height: 40px;
}
.toolbar li {
  float: right;
  padding: 0px 20px;
}
.toolbar li:hover {
  background-color: rgb(85, 85, 85);
  color: #fff;
  cursor: pointer;
}
</style>
