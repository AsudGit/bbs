<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="18">
        <el-steps :active="active" simple>
          <el-step title="注册账号" icon="el-icon-user-solid"></el-step>
          <el-step title="完善个人信息" icon="el-icon-document"></el-step>
          <el-step title="完成注册"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row type="flex" v-show="active === 1" justify="center">
      <el-col :span="8">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item>
            <!-- 后端地址 -->
            <el-upload
              ref="upload"
              action="/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :auto-upload="false"
              :file-list="fileList"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="手机号">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.sex" placeholder="请选择活动区域">
              <el-option label="保密" value="shanghai"></el-option>
              <el-option label="男" value="shanghai"></el-option>
              <el-option label="女" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生日">
            <el-col :span="11">
              <el-date-picker
                v-model="form.birthday"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">下一步</el-button>
            <el-button @click="next">跳过</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row type="flex" v-show="active === 2" justify="center">
      <h1>后台处理中...</h1>
    </el-row>
    <el-row type="flex" v-show="active === 3" justify="center">
      <h1>注册完成</h1>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 1,
      form: {
        phone: "",
        sex: "",
        birthday: "",
        description: ""
      },
      pickerOptions: {
        //禁用今天往后的日期（生日）
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      fileList: [],
      imageUrl: ""
    };
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
      const $this = this;
      return new Promise(resolve => {
        setTimeout(() => {
          $this.active = 3;
          resolve();
        }, 1000);
      });
    },
    onSubmit() {
      // console.log("submit!");
      this.$refs.upload.submit();
    },
    handleAvatarSuccess(res, file) {
      console.log(file);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style scoped lang="scss">
.el-form {
  margin-top: 20px;
}
//头像上传框样式
.avatar-uploader-icon:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  margin-left: 50%;
  border: 1px dashed black;
  border-radius: 6px;
  overflow: hidden;
  font-size: 28px;
  color: #8c939d;
  width: 160px;
  height: 160px;
  line-height: 160px;
  text-align: center;
  // border: 1px dashed black;
}
.avatar {
  margin-left: 50%;
  width: 160px;
  height: 160px;
  display: block;
}
</style>
