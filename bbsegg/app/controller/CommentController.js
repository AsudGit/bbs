/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-05-01 22:36:02
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-05-02 21:42:57
 * @Description: Description
 */
'use strict';
const Controller = require('egg').Controller;

class CommentController extends Controller {
  async add() {
    const { ctx } = this;
    const { commentService } = ctx.service;
    const { content, ccid = '', uid } = ctx.request.body;
    if (content && uid) {
      const comments = await commentService.add({ content, ccid, uid });
      if (comments.length > 0) {
        if (ccid) {
          const commentInfos = await commentService.find({ cid: ccid });
          commentInfos[0].comments += 1;
          try {
            commentInfos[0].save();
          } catch (error) {
            await commentService.remove({ cid: comments[0].cid });
            ctx.body = { code: ctx.statusCode.UPDATE_FAIL, msg: '评论数更新失败' };
            return;
          }
        }
        ctx.body = { code: ctx.statusCode.SUCESS, msg: '新增成功' };
      } else {
        ctx.body = { code: ctx.statusCode.INSERT_FAIL, msg: '新增失败' };
      }
    } else {
      ctx.body = { code: ctx.statusCode.PARAMETER_MISS, msg: '缺少参数' };
    }
  }
  async list() {
    const { ctx } = this;
    const { commentService } = ctx.service;
    const { pageSize = 10, pageNo = 1, ccid = '' } = ctx.request.body;
    if (pageNo > 0 && pageSize > 0) {
      const option = ccid === '' ? {} : { ccid };
      const result = await commentService.pageList(option, pageNo, pageSize);
      ctx.body = { code: ctx.statusCode.SUCESS, data: result };
    } else {
      ctx.body = { code: ctx.statusCode.PARAMETER_ERROR, msg: '页面参数错误' };
    }
  }
  async removeById() {
    const { ctx } = this;
    const { commentService } = ctx.service;
    const cid = ctx.params.cid || '';
    if (cid) {
      const delComment = (await commentService.find({ cid }))[0];
      const isDel = await commentService.remove({ cid });
      if (delComment.ccid) {
        const comments = await commentService.find({ cid: delComment.ccid });
        comments[0].comments -= 1;
        try {
          comments[0].save();
        } catch (error) {
          await commentService.add(delComment);
          ctx.body = { code: ctx.statusCode.UPDATE_FAIL, msg: '评论数更新失败' };
          return;
        }
      } else {
        // 删除跟帖
        await commentService.remove({ ccid: cid });
      }
      if (isDel) {
        ctx.body = { code: ctx.statusCode.SUCESS, msg: '删除成功' };
        return;
      }
    }
    ctx.body = { code: ctx.statusCode.DELETE_FAIL, msg: '删除失败' };
  }
}

module.exports = CommentController;
