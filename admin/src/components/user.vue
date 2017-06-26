<template>
<el-row>
<p>
  <el-button @click="dialogVisible = true" type="success">添加用户</el-button>
</p>
<el-dialog
  title="添加用户"
  :visible.sync="dialogVisible"
  size="small"
  :before-close="handleClose">
  <el-form :model="subForm" :rules="rules" ref="subForm">
    <el-form-item label="用户名:" :label-width="formLabelWidth" prop="username">
      <el-input v-model="subForm.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码:" :label-width="formLabelWidth" prop="password">
      <el-input v-model="subForm.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="昵称:" :label-width="formLabelWidth" prop="nickname">
      <el-input v-model="subForm.nickname" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="头像:" :label-width="formLabelWidth" prop="remoteUrl">
      <input v-model="subForm.remoteUrl" type="hidden" name="remoteUrl">
      <el-upload
        name="logo"
        class="avatar-uploader"
        action="http://localhost:3000/upload/logo"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" id="avatar" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('subForm')">确 定</el-button>
  </span>
</el-dialog>
<el-table
  :data="tableData"
  strip
>
  <el-table-column
    prop="username"
    label="用户名"
    width="150"
  >
    <template scope="scope">
      <router-link :to=" 'user/'+scope.row.id ">{{scope.row.username}}</router-link>
    </template>
  </el-table-column>
  <el-table-column
    prop="password"
    label="密码"
  ></el-table-column>

  <el-table-column
    prop="nickname"
    label="昵称"
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
      <!--<el-button
        size="small"
        @click="handleEdit(scope.$index, scope.row)">编辑
      </el-button>-->
      <el-button
        size="small"
        type="danger"
        @click="showConfirm(scope.$index, scope.row)">删除
      </el-button>
    </template>
  </el-table-column>
</el-table>
<!-- 确认删除提示框 -->
<el-dialog
  title="提示"
  :visible.sync="confirmVisible"
  size="tiny"
  :before-close="handleClose">
  <span>确定要删除吗？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="confirmVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleConfirmDel">确 定</el-button>
  </span>
</el-dialog>
</el-row>
</template>
<script>
import {get_all_user, add_user, del_user} from '../api/user'
import config from '../api/config'
export default {
  name: 'user',
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      dialogVisible: false,
      confirmVisible: false,
      formLabelWidth: '80px',
      subForm: {
        username: '',
        nickname: '',
        password: '',
        remoteUrl: ''
      },
      imageUrl: '',
      delData: {
        id: -1,
        index: -1
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 12, message: '长度在2 到 12 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 2, max: 12, message: '长度在2 到 12 个字符', trigger: 'blur'}
        ],
        nickname: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
          {min: 2, max: 6, message: '长度在2 到 6 个字符', trigger: 'blur'}
        ],
        remoteUrl: [
          {required: true, message: '请上传图片', trigger: 'change'}
        ],
      }
    }
  },
  methods: {
    fetch_all() {
      get_all_user((result) => {
        this.tableData = result
      });
    },
    beforeAvatarUpload(){
      //TODO 上传之前 的实现
    },
    handleClose(){
      this.dialogVisible = false   //关闭窗口
      this.confirmVisible = false   //关闭确认框
    },
    handleAvatarSuccess(res){
      this.subForm.remoteUrl = this.imageUrl = res.url;
    },
    //显示删除对话框
    showConfirm(index, data){
      this.confirmVisible = true;
      this.delData.index = index
      this.delData.id = data.id
    },
    //确认删除
    handleConfirmDel(){
      this.handleDelete(this.delData.index, this.delData.id);
    },
    //添加用户
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          add_user(this.subForm, (result) => {
            that.$data.tableData.push(result)
            that.addMessage();
            that.$data.subForm.username = ''
            that.$data.subForm.nickname = ''
            that.$data.subForm.password = ''
            that.$data.subForm.remoteUrl = ''
            that.$data.imageUrl = ''
          })
        } else {
          throw new Error('error submit!!')
          return false;
        }
        that.dialogVisible = false
      });
    },
    handleEdit(){
    },
    //删除操作
    handleDelete(index, id){
      const that = this;
      del_user(id, function() {
        that.$data.tableData.splice(index, 1);
        that.delMessage()
        that.confirmVisible = false;
        that.delData.id = -1
        that.delData.index = -1
      });
    },
    delMessage(){
      this.$message('删除成功')
    },
    addMessage(){
      this.$message('添加成功')
    },
  },
  mounted() {
    this.fetch_all();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
