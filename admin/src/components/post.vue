<template>
  <el-row>
    <el-table
      :data="tableData"
      strip
    >
      <el-table-column
        prop="username"
        label="评论人"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="title"
        label="标题"
      ></el-table-column>

      <el-table-column
        prop="content"
        label="内容"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建时间"
      ></el-table-column>

      <el-table-column
        prop="updatedAt"
        label="更新时间"
      ></el-table-column>
      <el-table-column
        prop="image"
        label="头像"
      ></el-table-column>
    </el-table>
  </el-row>
</template>

<script>
import {get_all_post} from '../api/post'
import addPost from './addPost.vue'
export default {
  name: 'post',
  data(){
    return {
      tableData: [],
      dialogVisible: false
    }
  },
  components: {
    'addPost': addPost
  },
  methods: {
    fetch_all() {
      get_all_post((result) => {
        this.tableData = result
      });
    }
  },
  mounted(){
    this.fetch_all()
  },
  filter(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
