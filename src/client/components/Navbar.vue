<template>
    <div id="navbar-area">
      <el-menu mode="horizontal" :default-active="$route.path" :router="true">
        <a class="logo" href="/">
          一箭中的的日志
        </a>
        <el-menu-item v-for="item in items" v-bind:key="item.url" :index="item.url">
          {{item.name}}
        </el-menu-item>
      </el-menu>
    </div>
</template>

<script scoped>
export default {
  props: ["items"]
};
</script>
<style>
#navbar-area .el-menu {
  padding: 0% 10%;
}
.logo {
  float: left;
  height: 60px;
  line-height: 60px;
  font-size: 20pt;
  color: #ff9d00;
  cursor: pointer;
}
.logo:hover {
  opacity: 0.5;
}
#navbar-area .el-menu--horizontal .el-menu-item {
  float: right;
}
</style>
