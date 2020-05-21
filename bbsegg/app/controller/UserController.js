/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-04-30 03:44:10
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-05-02 01:59:11
 * @Description: Description
 */
'use strict';
const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    const { account = '', pwd = '' } = ctx.request.body;
    const { userService } = ctx.service;
    if (account && pwd) {
      const isLogined = await userService.login(account, pwd);
      if (isLogined) {
        ctx.response.body = { code: ctx.statusCode.SUCESS, msg: '登陆成功' };
      } else {
        ctx.response.body = { code: ctx.statusCode.PARAMETER_ERROR, msg: '账号或密码错误' };
      }
    } else {
      ctx.response.body = { code: ctx.statusCode.PARAMETER_MISS, msg: '账号或密码为空' };
    }
  }
  async register() {
    const { ctx } = this;
    const { userService } = ctx.service;
    const { name, phone, email, pwd } = ctx.request.body;
    if (name && phone && email && pwd) {
      const userInfos = await userService.find({ $or: [{ name }, { phone }, { email }] });
      if (userInfos.length > 0) {
        ctx.body = { code: ctx.statusCode.PARAMETER_ERROR, msg: '该账号已存在' };
        return;
      }
      const users = await userService.add({ name, phone, email, pwd });
      if (users.length > 0) {
        ctx.body = { code: ctx.statusCode.SUCESS, msg: '注册成功' };
        ctx.session.userInfo = { name };
      } else {
        ctx.body = { code: ctx.statusCode.INSERT_FAIL, msg: '新增失败' };
      }
    } else {
      ctx.body = { code: ctx.statusCode.PARAMETER_MISS, msg: '缺少必填项' };
    }
  }
  async getOneById() {
    const { ctx } = this;
    const { userService } = ctx.service;
    const uid = ctx.params.uid || '';
    if (uid) {
      const userInfo = await userService.getOneById(uid);
      ctx.body = { code: ctx.statusCode.SUCESS, data: userInfo };
    } else {
      ctx.body = { code: ctx.statusCode.PARAMETER_MISS, msg: '缺少参数' };
    }
  }
  async list() {
    const { userService } = this.ctx.service;
    const data = await userService.find();
    this.ctx.body = { code: this.ctx.statusCode.SUCESS, data };
  }
  async removeById() {
    const { ctx } = this;
    const { userService } = ctx.service;
    const uid = ctx.params.uid || '';
    if (uid) {
      const isDel = await userService.remove({ uid });
      if (isDel) {
        ctx.body = { code: ctx.statusCode.SUCESS, msg: '删除成功' };
      } else {
        ctx.body = { code: ctx.statusCode.DELETE_FAIL, msg: '删除失败' };
      }
    } else {
      ctx.body = { code: ctx.statusCode.PARAMETER_MISS, msg: '缺少参数' };
    }
  }
  async update() {
    const { ctx } = this;
    const { userService } = ctx.service;
    const user = ctx.request.body;
    if (user && user.uid) {
      const isUpdated = await userService.update({ uid: user.uid }, { $set: user });
      if (isUpdated) {
        ctx.body = { code: ctx.statusCode.SUCESS, msg: '更新成功' };
      } else {
        ctx.body = { code: ctx.statusCode.UPDATE_FAIL, msg: '更新失败' };
      }
    } else {
      ctx.body = { code: ctx.statusCode.PARAMETER_MISS, msg: '缺少id参数' };
    }
  }
}

module.exports = UserController;
