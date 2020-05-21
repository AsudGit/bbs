/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-05-01 22:41:31
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-05-02 23:40:15
 * @Description: Description
 */
'use strict';
const Service = require('egg').Service;

class CommentService extends Service {
  get document() {
    return this.ctx.model.Comment;
  }
  async add(data) {
    const { ctx } = this;
    const { uid, content, ccid = '',
      likes = 0,
      comments = 0,
      cid = ctx.helper.getUUID(),
      time = ctx.helper.getNowDate() } = data;
    try {
      return await this.document.insertMany([{ cid, uid, time, likes, comments, content, ccid }]);
    } catch (error) {
      return [];
    }
  }
  async find(option, includs) {
    const projection = {};
    if (includs && includs instanceof Array) {
      includs.forEach(item => {
        projection[item] = 1;
      });
    }
    return await this.document.find(option, projection);
  }
  async remove(option) {
    const result = await this.document.deleteMany(option);
    if (result.deletedCount > 0) {
      return true;
    }
    return false;
  }

  /**
   *
   * 分页返回数据
   *
   * @param {*} option 查询参数
   * @param {number} [pageNo=1] 当前页码
   * @param {number} [pageSize=10] 一页包含多少数据
   * @param {*} includs 返回数据包含字段数组，为空返回全部字段
   * @param {*} [sort={}] 排序
   * @return {Object} 查询出的数据
   * @memberof CommentService
   */
  async pageList(option, pageNo = 1, pageSize = 10, includs, sort = {}) {

    const projection = {};
    if (includs && includs instanceof Array) {
      includs.forEach(item => {
        projection[item] = 1;
      });
    }

    const data = await this.document
      .find(option, projection)
      .skip((pageNo - 1) * pageSize)
      .sort(sort)
      .limit(pageSize);
    return data;
  }

  async update(option, detail) {
    const result = await this.document.updateOne(option, detail);
    if (result.nModified > 0) {
      return true;
    }
    return false;
  }
}

module.exports = CommentService;
