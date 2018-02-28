<template>
    <div>
      <el-menu mode="horizontal">
        <el-menu-item v-for="item in items" v-bind:key="item.url" :index="item.url">
          <router-link :to="{ name: item.url}">{{item.name}}</router-link>
        </el-menu-item>
      </el-menu>
    </div>
</template>

<script>
export default {
  props: ["items"]
};
</script>
