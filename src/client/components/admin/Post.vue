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
                        <li v-on:click="save">Post</li>
                    </ul>
                </div>
                <div class="editor" style="padding: 10px;background-color: #fff;">
                    <textarea id="text-input" v-model="article.content" v-on:input="update" rows="60" cols="60"></textarea>
                </div>
            </el-col>
            <el-col :span="12">
                <div id="preview" style="padding:10px 5px">
                </div>
            </el-col>
        </el-row>

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
    var id = this.$route.params.id;
    if (id) {
      this.$http.get("/route/article/" + id).then(response => {
        this.article = response.data;
        this.update();
      });
    }
  },
  methods: {
    update: function() {
      document.getElementById("preview").innerHTML = converter.makeHtml(
        this.article.content
      );
    },
    save: function() {
      if (this.article._id) {
        this.$http
          .put("/route/article", { article: this.article })
          .then(response => {
            alert(response.body.msg);
          });
      } else {
        this.$http
          .post("/route/article", { article: this.article })
          .then(response => {
            alert(response.body.msg);
          });
      }
    }
  }
};
</script>

<style scoped>
input,
textarea {
  border: none;
  outline: none;
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
