/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-05-02 22:06:39
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-05-02 23:47:27
 * @Description: Description
 */
'use strict';
const Service = require('egg').Service;
class LikesService extends Service {
  get document() {
    return this.ctx.model.Likes;
  }
  async add(data) {
    const { ctx } = this;
    const { uid, cid, lid = ctx.helper.getUUID() } = data;
    try {
      return await this.document.insertMany([{ uid, cid, lid }]);
    } catch (error) {
      return [];
    }
  }

}

module.exports = LikesService;
