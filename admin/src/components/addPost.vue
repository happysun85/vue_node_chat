<template>
  <el-dialog
    title="添加文章"
    :visible.sync="showAddDialog"
    size="small"
    :before-close="hundleCloseDialog">
    <el-form :model="subForm" :rules="rules" ref="subForm">
      <el-form-item label="标题:" prop="title">
        <el-input v-model="subForm.title" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="内容:" prop="content">
        <el-input v-model="subForm.content" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hundleCloseDialog">取 消</el-button>
      <el-button type="primary" @click="submitForm('subForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {addPost} from '../api/post'
export default {
  name: 'addPost',
  props: ['showAddDialog', 'closeDialog', 'updateTableData'],
  data(){
    return {
      subForm: {
        id: -1,
        title: '',
        content: ''
      },
      rules: {
        title: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 12, message: '长度在2 到 12 个字符', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 2, max: 12, message: '长度在6 到 200 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm(data){
      this.$refs[data].validate(valid => {
        if (valid) {
          addPost(this.subForm, result => {
            this.$emit('updateTableData', result)
            this.hundleCloseDialog()
          })
        }
      })
    },
    hundleCloseDialog(){
      this.$emit('closeDialog');
      this.subForm.title = ''
      this.subForm.content = ''
    }
  },
  mounted(){
    this.subForm.id = this.$route.params.id
  }
}
</script>
<style scoped>
</style>
