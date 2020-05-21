<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="昵称" prop="name">
      <el-input placeholder="昵称" v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pwd">
      <el-input placeholder="密码" v-model="form.pwd" show-password></el-input>
      <level-bar v-bind:level="pwdLevel"></level-bar>
    </el-form-item>
    <el-form-item label="确认密码" prop="pwdCheck">
      <el-input placeholder="确认密码" v-model="form.pwdCheck" show-password>
      </el-input>
    </el-form-item>
    <el-form-item v-if="usePhone" label="手机号" prop="phone">
      <el-input placeholder="手机号" v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item v-else label="邮箱" prop="email">
      <el-input placeholder="邮箱" v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item v-if="usePhone" label="验证码" prop="phoneVerify">
      <el-input placeholder="验证码" v-model="form.phoneVerify">
        <el-button
          @click="smsPhoneVerify"
          type="primary"
          :disabled="isSended"
          slot="append"
          :class="{ 'btn-success': isSended }"
        >
          {{ verifyBtn }}
        </el-button>
      </el-input>
    </el-form-item>
    <el-form-item v-else id="captcha" label="验证码" prop="captcha">
      <el-input
        @focus="initCaptcha"
        placeholder="验证码"
        v-model="form.captcha"
      >
      </el-input>
      <div id="captchaDiv" @click="setCaptcha" v-html="captcha"></div>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="checked">
        我已同意
        <el-link type="primary">
          《bbsweb使用协议》
        </el-link>
      </el-checkbox>
      <el-button
        id="commit"
        type="primary"
        @click="submitForm('form')"
        :disabled="!checked"
        plain
      >
        注册
      </el-button>
    </el-form-item>
    <el-link @click="otherRegister" type="primary">
      {{ linkText }}
    </el-link>
  </el-form>
</template>
<script>
import levelBar from "./LevelBar";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value !== this.form.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: "",
        phone: "",
        pwd: "",
        pwdCheck: "",
        email: "",
        phoneVerify: "",
        captcha: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { max: 14, message: "昵称过长" },
          {
            pattern: /^[a-zA-Z\u4e00-\u9fa5]+[_a-zA-Z0-9\u4e00-\u9fa5]*$/,
            message: "不允许输入空格等特殊符号,首位不能为数字"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 20, message: "密码长度8~20位" }
        ],
        pwdCheck: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" },
          { min: 8, max: 20, message: "密码长度8~20位" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phoneVerify: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      way: "手机号",
      checked: false,
      usePhone: true,
      linkText: "使用邮箱注册>>",
      captcha: "",
      verifyBtn: "获取验证码",
      isSended: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.push("/register/step");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    otherRegister() {
      this.usePhone = !this.usePhone;
      this.linkText = "使用手机号注册>>";
      this.$refs["form"].resetFields();
    },
    setCaptcha() {
      this.$axios.get("/captcha").then(data => {
        this.captcha = data.data;
      });
    },
    initCaptcha() {
      if (!this.captcha) {
        this.setCaptcha();
      }
    },
    smsPhoneVerify() {
      const phone = this.form.phone;
      if (phone) {
        if (/^1[3-9]\d{9}$/.test(phone)) {
          this.$axios.get(`/captcha/sendsms/${phone}`).then(data => {
            console.log(data);
            if (data.data.code === 0) {
              this.isSended = true;
              this.verifyBtn = "已发送";
              this.$message({
                message: data.data.msg,
                type: "success"
              });
              setTimeout(() => {
                this.isSended = false;
                this.verifyBtn = "获取验证码";
              }, 1000 * 10);
            } else {
              this.$message.error(data.data.msg);
            }
          });
        } else {
          this.$message("目前只支持中国大陆的手机号码");
        }
      } else {
        this.$message("请填写手机号");
      }
    }
  },
  components: {
    "level-bar": levelBar
  },
  computed: {
    pwdLevel() {
      const text = this.form.pwd;
      let level = 0;
      if (/\d/.test(text)) {
        level++;
      }
      if (/[a-zA-Z]/.test(text)) {
        level++;
      }
      if (/[^a-zA-Z0-9]/.test(text)) {
        level++;
      }
      return level;
    }
  }
};
</script>
<style scoped lang="scss">
.el-link {
  float: right;
}
.el-form {
  margin-top: 20px;
}
#captcha .el-input {
  width: 50%;
}
#captchaDiv {
  float: right;
}
#captchaDiv:hover {
  cursor: pointer;
}
#commit {
  width: 100%;
}
.el-input .el-button {
  background-color: #409eff;
  color: #ffffff;
  opacity: 0.8;
}
.el-input .el-button:hover {
  opacity: 1;
}
.btn-success {
  background-color: #67c23a !important;
}
</style>
