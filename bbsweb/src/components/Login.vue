<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="账号" prop="account">
      <el-input placeholder="你的手机号/邮箱/昵称" v-model="form.account">
      </el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pwd">
      <el-input placeholder="密码" v-model="form.pwd" show-password> </el-input>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="checked">
        记住密码
        <small>
          不是自己电脑不要勾选此项
        </small>
      </el-checkbox>
      <el-link type="primary" :underline="false">忘记密码？</el-link>
      <el-button type="primary" @click="submitForm('form')" plain>
        登陆
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        account: "",
        pwd: ""
      },
      rules: {
        account: [
          { required: true, message: "请输入手机号/邮箱/昵称", trigger: "blur" }
        ],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
small {
  color: #909399;
}
.el-link {
  float: right;
}
.el-form {
  margin-top: 20px;
}
.el-form-item .el-button {
  width: 100%;
}
</style>
