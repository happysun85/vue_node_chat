<template>
  <div id="app">
    <el-col :md="2">
      <el-menu>
        <el-menu-item
          v-for="(route, index) in this.$router.options.routes"
          v-if="!route.hidden"
          :index="route.path"
          :key="index"
        >
          <router-link :to="route.path"> {{route.name}}</router-link>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :md="20" offset="1">
      <router-view></router-view>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
}
</style>
