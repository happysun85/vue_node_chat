<template>
<el-row>
<h1>{{ username }}</h1>
<p>
  <el-button @click="showAddDialog = true" type="success">添加文章</el-button>
  <el-button @click="handleDel" type="danger">删除文章</el-button>
  <addPost
    :showAddDialog="showAddDialog"
    v-on:closeDialog="closeDialog"
    v-on:updateTableData="updateTableData"
  >
  </addPost>
  <editPost
    :showEditDialog="showEditDialog"
    :oldData="editData"
    v-on:closeDialog="closeDialog"
    v-on:editTableData="editTableData"
  ></editPost>
</p>
<el-table
  :data="tableData"
  @selection-change="handleSelectionChange"
  strip
>
  <el-table-column
    type="selection"
    width="55"
  >
  </el-table-column>
  <el-table-column
    prop="id"
    label="ID"
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
    prop="id"
    label="操作"
  >
    <template scope="scope">
      <el-button
        size="small"
        @click="handleEdit(scope.$index, scope.row)">编辑
      </el-button>
    </template>
  </el-table-column>
</el-table>
<p>
  <el-select v-model="relation" placeholder="请选择">
    <el-option
      v-for="item in all_user"
      :key="item.id"
      :label="item.username"
      :value="item.id">
    </el-option>
  </el-select>
  <el-button @click="addFriend" type="success">添加好友</el-button>
</p>
<el-table
  :data="friendList"
>
  <el-table-column
    prop="username"
    label="好友名称"
  >
  </el-table-column>
  <el-table-column
    prop="nickname"
    label="昵称"
  >
  </el-table-column>
  <el-table-column
    prop="logo"
    label="头像"
  >
    <template scope="scope">
      <img width="100" :src="scope.row.logo" alt="">
    </template>
  </el-table-column>
  <el-table-column
    prop="id"
    label="操作"
  >
    <template scope="scope">
      <el-button
        size="small"
        type="danger"
        @click="delRelation(scope.$index, scope.row.id)">删除
      </el-button>
    </template>
  </el-table-column>
</el-table>
</el-row>
</template>
<script>
import {getUserById} from '../api/user'
import {getPostListByUserId, delPost} from '../api/post'
import {get_not_relation, add_relation, get_relation, del_relation} from '../api/relations'
import addPost from'./addPost'
import editPost from'./editPost'
export default {
  name: 'userItem',
  components: {
    'addPost': addPost,
    'editPost': editPost
  },
  data(){
    return {
      id: -1,
      username: '',
      showAddDialog: false,
      showEditDialog: false,
      tableData: [],
      multipleSelection: [],
      notRelation: [],
      editData: {
        index: -1,
        data: {
          title: '',
          content: '',
          updateAt: ''
        }
      },
      relation: '',
      all_user: [],
      friendList: []
    }
  },
  methods: {
    getNotRelation(){
      get_not_relation(this.id, result => {
        this.all_user = result;
      })
    },
    getUserById(){
      getUserById(this.id, (result) => {
        this.username = result.username
      })
    },
    getPostListByUserId(){
      getPostListByUserId(this.id, (result) => {
        this.tableData = result
      })
    },
    closeDialog(){
      this.showAddDialog = false   //关闭窗口
      this.showEditDialog = false
    },
    updateTableData(result){
      this.tableData.push(result)
    },
    editTableData(result){
      this.tableData.splice(result.index, 1, result.data)
    },
    handleSelectionChange(val){
      console.log(arguments)
      let arr = [];
      val.map(item => {
        arr.push(item.id)
      })
      this.multipleSelection = arr
    },
    handleDel(){
      if (this.multipleSelection.length > 0) {
        delPost(this.multipleSelection, () => {
//        this.getPostListByUserId();
          //TODO  删除数据成功后删除对应HTML遇到的问题
          //el-table 的type="select"不返回索引，只有当前ROW的数据对象
          //使用两个FOR循环嵌套得到索引在删除也不行。
          //因为遍历是逐个删除，速度很快。而VUE的钩子函数处理的速度慢，会导致数据错乱
          //临时解决办法，请求一次接口。  或者逆向遍历来删除
          let data = this.tableData,
            delData = this.multipleSelection,
            arr = [];
          for (let i = 0; i < data.length; i++) {
            for (let d = 0; d < delData.length; d++) {
              if (data[i].id == delData[d]) {
                arr.push(i)
              }
            }
          }
          for (var i = arr.length - 1; i >= 0; i--) {
            data.splice(arr[i], 1)
          }
        })
      } else {
        this.$message({
          message: '请选择要删除的消息',
          type: 'error'
        })
      }

    },
    handleEdit(index, data){
      this.editData.index = index;
      Object.assign(this.editData.data, data)
      this.showEditDialog = true
    },
    addFriend(){
      console.log(this.relation)
      add_relation({
        userId: this.id,
        friendId: this.relation
      }, (result) => {
        console.log(result)
      })
    },
    getRelationList(){
      get_relation(this.id, (result) => {
        this.friendList = result
      })
    },
    delRelation(index, friendId){
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          del_relation({
            userId: this.id,
            friendId: friendId
          })
            .then(result => {
              console.log(result)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  mounted(){
    this.id = this.$route.params.id;
    this.getUserById();
    this.getPostListByUserId();
    this.getNotRelation();
    this.getRelationList();
  }
}
</script>
<style scoped>
</style>
