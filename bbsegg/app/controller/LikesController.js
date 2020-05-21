/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-05-02 22:03:19
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-05-03 00:00:08
 * @Description: Description
 */
'use strict';
const Controller = require('egg').Controller;

class LikesController extends Controller {
  async like() {
    const { ctx, app } = this;
    const { uid = '', cid = '' } = ctx.request.body;
    const { commentService } = ctx.service;
    if (uid && cid) {
      try {
        await app.redis.set(`likes:${uid}:${cid}`, 1);
        const key = `comment:likes:${cid}`;
        let commentLikes = await app.redis.get(key);
        if (!commentLikes) {
          const comments = await commentService.find({ cid });
          commentLikes = comments[0].likes;
        }
        await app.redis.set(key, ++commentLikes);
        ctx.body = { code: ctx.statusCode.SUCESS, msg: '点赞成功' };
      } catch (error) {
        ctx.body = { code: ctx.statusCode.INSERT_FAIL, msg: '向redis插入数据失败' };
      }
    } else {
      ctx.body = { code: ctx.statusCode.PARAMETER_MISS, msg: '缺少参数' };
    }
  }
  async unlike() {
    const { ctx, app } = this;
    const { uid = '', cid = '' } = ctx.request.body;
    const { commentService } = ctx.service;
    if (uid && cid) {
      const key1 = `likes:${uid}:${cid}`;
      const status = app.redis.get(key1);
      if (status === 1) {
        await app.redis.del(key1);
      } else if (status === 2) {
        await app.redis.set(key1, 3);
      } else {
        ctx.body = { code: ctx.statusCode.PARAMETER_ERROR, msg: '点赞已经取消，此操作异常' };
      }
      const key = `comment:likes:${cid}`;
      let commentLikes = await app.redis.get(key);
      if (!commentLikes) {
        const comments = await commentService.find({ cid });
        commentLikes = comments[0].likes;
      }
      await app.redis.set(key, --commentLikes);
      ctx.body = { code: ctx.statusCode.SUCESS, msg: '取消点赞成功' };
    } else {
      ctx.body = { code: ctx.statusCode.PARAMETER_MISS, msg: '缺少参数' };
    }
  }

}

module.exports = LikesController;
