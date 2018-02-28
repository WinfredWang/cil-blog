<template>
    <div id="navbar-area">
      <el-menu mode="horizontal" :default-active="$route.name" :router="true">
        <el-menu-item v-for="item in items" v-bind:key="item.url" :index="item.url">
          {{item.name}}
        </el-menu-item>
      </el-menu>
    </div>
</template>

<script>
export default {
  props: ["items"]
};
</script>
<style>
#navbar-area .el-menu {
  padding: 0% 10%;
}
#navbar-area .el-menu--horizontal .el-menu-item {
  float: right;
}
</style>
