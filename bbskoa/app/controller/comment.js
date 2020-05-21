/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-04-18 16:28:21
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-05-01 22:59:26
 * @Description: 评论相关逻辑层
 */
'use strict';
const myUtil = require('../utils/myUtil');
const Comment = require('../model/comment');
const code = require('../model/statusCode');

/**
 * 新增留言
 *
 * @param {*} ctx 上下文
 * @returns {*} null
 */
const add = async function (ctx) {
    const {content, ccid = '', uid} = ctx.request.body;
    const cid = myUtil.getUUID();
    const time = myUtil.getNowDate();
    const likes = 0;
    const comments = 0;
    try {
        await Comment.insertMany([{cid, uid, time, likes, comments, content, ccid}]);
    } catch (error) {
        ctx.body = {code: code.INSERT_FAIL, msg: '新增失败'};
    }
    if (ccid) {
        const commentInfo = await Comment.findOne({cid: ccid});
        commentInfo.comments += 1;
        commentInfo.save();
    }
    ctx.body = {code: code.SUCESS, msg: '新增成功'};
};

/**
 *按分页逻辑取评论数据
 *
 *@param {*} ctx 上下文
 *@returns {*} null
 */
const list = async function (ctx) {
    // eslint-disable-next-line no-magic-numbers
    const {pageSize = 10, pageNo = 1, ccid = ''} = ctx.request.body;
    if (pageNo > 0 && pageSize > 0) {
        const step = (pageNo - 1) * pageSize;
        const option = ccid === '' ? {} : {ccid};
        const result = await Comment.find(option)
            .skip(step)
            .limit(pageSize);
        ctx.body = {code: code.SUCESS, data: result};
    } else {
        ctx.body = {code: code.PARAMETER_ERROR, msg: '页面参数错误'};
    }
};

/**
 *根据id删除评论
 *
 * @param {*} ctx 上下文
 * @returns {*} null
 */
const removeById = async function (ctx) {
    const cid = ctx.params.cid || '';
    if (cid) {
        const delComment = await Comment.findOne({cid});
        const result = await Comment.deleteOne({cid});
        if (delComment.ccid) {
            const commentInfo = await Comment.findOne({cid: delComment.ccid});
            commentInfo.comments -= 1;
            commentInfo.save();
        }
        if (result.deletedCount === 1) {
            ctx.body = {code: code.SUCESS, msg: '删除成功'};
            return;
        }
    }
    ctx.body = {code: code.DELETE_FAIL, msg: '删除失败'};
};

module.exports = {
    add,
    list,
    removeById,
};
