<template>
  <el-dialog
    title="编辑文章"
    :visible.sync="showEditDialog"
    size="small"
    :before-close="hundleCloseDialog">
    <el-form :model="oldData.data" :rules="rules" ref="oldData">
      <el-form-item label="标题:" prop="title">
        <el-input v-model="oldData.data.title" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="内容:" prop="content">
        <el-input v-model="oldData.data.content" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hundleCloseDialog">取 消</el-button>
      <el-button type="primary" @click="submitForm('oldData')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {editPost} from '../api/post'
export default {
  name: 'editPost',
  props: ['oldData', 'showEditDialog', 'closeDialog', 'editTableData'],
  data(){
    return {
      /*subForm: {
       id: -1,
       title: '',
       content: ''
       },*/
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'},
          {min: 2, max: 12, message: '长度在2 到 12 个字符', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '请输入内容', trigger: 'blur'},
          {min: 2, max: 12, message: '长度在6 到 200 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm(data){
      this.$refs[data].validate(valid => {
        if (valid) {
          editPost({...this.oldData.data}, result => {
            this.$emit('editTableData', {index: this.oldData.index, data: this.oldData.data})
            this.hundleCloseDialog()
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          })
        }
      })
    },
    hundleCloseDialog(){
      this.$emit('closeDialog');
      /*this.subForm.title = ''
       this.subForm.content = ''*/
    }
  },
  mounted(){
  }
}
</script>
<style scoped>
</style>
