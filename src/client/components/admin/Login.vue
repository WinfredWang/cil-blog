<template>
  <div id="login">
    <el-form ref="form" label-width="80px">
        <el-form-item label="Email">
          <el-input v-model="email"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input type="password" auto-complete="off" v-model="pwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">Login</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["bus"],
  data: function() {
    return {
      pwd: "",
      email: "",
      invald: false
    };
  },
  mounted: function() {
    this.$http
      .post("/admin/validate", { email: this.email, pwd: this.pwd })
      .then(response => {
        if (response.body.status == 0) {
          this.$router.push({ path: "/home/manage" });
        }
      });
  },
  methods: {
    login: function() {
      this.$http
        .post("/admin/login", { user: { email: this.email, pwd: this.pwd } })
        .then(response => {
          if (response.body.status == 0) {
            this.invald = false;
            this.$router.push({ path: "/home/manage" });
          } else {
            this.invald = true;
          }
        });
    }
  }
};
</script>
<style>
#login {
  width: 600px;
  margin: 100px auto;
}


</style>