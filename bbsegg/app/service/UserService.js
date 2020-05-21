/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-04-30 04:00:24
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-05-02 14:39:34
 * @Description: Description
 */
'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  get document() {
    return this.ctx.model.User;
  }
  async login(account, pwd) {
    const { ctx } = this;
    const userInfo = await this.document.findOne({ $or: [{ name: account }, { phone: account }, { email: account }] }).lean();
    if (userInfo && userInfo.name) {
      const isEqual = await ctx.compare(pwd, userInfo.pwd);
      if (isEqual) {
        ctx.session.userInfo = { name: userInfo.name };
        return true;
      }
    }
    return false;
  }
  async add(data) {
    const { ctx } = this;
    const { name, phone, email, pwd, sex = 0,
      headimg = `${__dirname}/default.jpg`,
      uid = ctx.helper.getUUID(),
      description = '这个人很懒，什么都没说',
      birthday = new Date().getDate('2000-01-01'),
    } = data;
    const encryptPwd = await ctx.genHash(pwd);
    try {
      const users = await this.document.insertMany([{ name, phone, email, uid, headimg,
        description, sex, birthday, pwd: encryptPwd }]);
      return users;
    } catch (error) {
      return [];
    }
  }
  async getOneById(uid) {
    return await this.document.findOne({ uid }).lean();
  }
  async find(option, includs) {
    const projection = {};
    if (includs && includs instanceof Array) {
      includs.forEach(item => {
        projection[item] = 1;
      });
    }
    return await this.document.find(option, projection).lean();
  }
  async remove(option) {
    const result = await this.document.deleteMany(option);
    if (result.deletedCount > 0) {
      return true;
    }
    return false;
  }
  async update(option, detail) {
    const result = await this.document.update(option, detail);
    if (result.nModified > 0) {
      return true;
    }
    return false;
  }
}

module.exports = UserService;
