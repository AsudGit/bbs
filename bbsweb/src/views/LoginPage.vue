<!--
 * @Author: your name
 * @Date: 2020-05-14 12:05:00
 * @LastEditTime: 2020-05-16 12:03:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bbsweb\src\views\Login.vue
 -->
<template>
  <el-row type="flex" justify="center">
    <el-col :span="8">
      <el-tabs v-model="activeName">
        <el-tab-pane label="注册" name="register">
          <register-form></register-form>
        </el-tab-pane>
        <el-tab-pane label="登陆" name="login">
          <login-form></login-form>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>
<script>
import register from "../components/Register";
import login from "../components/Login";
export default {
  data() {
    return {
      activeName: "login"
    };
  },
  components: {
    "register-form": register,
    "login-form": login
  },
  methods: {}
};
</script>
<style scoped lang="scss"></style>
