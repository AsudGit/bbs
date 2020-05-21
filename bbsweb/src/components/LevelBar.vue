<template>
  <div v-bind:class="{ 'level-bars': isShow }">
    <div v-show="level >= 1" class="level-bar danger-color"></div>
    <div v-show="level >= 2" class="level-bar warning-color"></div>
    <div v-show="level >= 3" class="level-bar success-color"></div>
    <p class="level-font" :class="fontColor">{{ levelFont }}</p>
  </div>
</template>
<script>
export default {
  //密码强度水平 0不显示 123依次为"弱", "中", "安全"
  props: ["level"],
  data() {
    return {};
  },
  computed: {
    levelFont() {
      const arr = ["", "弱", "中", "安全"];
      return arr[this.level];
    },
    isShow() {
      return this.level > 0;
    },
    fontColor() {
      return {
        danger: this.level >= 1,
        warning: this.level >= 2,
        success: this.level >= 3
      };
    }
  }
};
</script>
<style scoped lang="scss">
.level-bars {
  margin-top: 10px;
}
.level-font {
  float: right;
  display: block;
  margin: 0px;
  line-height: 14px;
}
.level-bar {
  height: 10px;
  width: 30px;
  border: 1px solid;
  border-radius: 30px;
  float: left;
  margin-right: 10px;
}
.danger-color {
  background-color: #f56c6c;
  border-color: #f56c6c;
}
.warning-color {
  background-color: #e6a23c;
  border-color: #e6a23c;
}
.success-color {
  background-color: #67c23a;
  border-color: #67c23a;
}
.danger {
  color: #f56c6c;
}
.warning {
  color: #e6a23c;
}
.success {
  color: #67c23a;
}
</style>
