/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-04-28 01:15:46
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-05-03 00:01:23
 * @Description: Description
 */
'use strict';

const Likes = require('../module/likes');
const Comment = require('../module/comment');
const myUtil = require('../utils/myUtil');
const code = require('../module/statusCode');
const redis = require('../utils/redis');
const config = require('config');

/**
 *同步数据到mongodb中
 *@returns {*} null
 */
const syncData = async function () {
    const cKeys = await redis.keys(`${config.redisConfig.keyPrefix}comment:likes:*`);
    cKeys.forEach(async (key) => {
        const cid = key.substr(key.lastIndexOf(':') + 1);
        const likes = await redis.get(key);
        await Comment.updateOne({cid}, {$set: {likes}});
    });

    const lKeys = await redis.keys(`${config.redisConfig.keyPrefix}likes:`);
    const insertArray = [];
    for (const key of lKeys) {
        const status = await redis.get(key);
        if (status === 2) {
            continue;
        }
        const lastIndex = key.lastIndexOf(':');
        const uid = key.substr(key.indexOf('likes:' + 6), lastIndex);
        const cid = key.substr(lastIndex + 1);
        if (status === 1) {
            const lid = myUtil.getUUID();
            insertArray.push({lid, uid, cid});
        } else if (status === 3) {
            await Likes.findOneAndRemove({uid, cid});
        }
    }
    await Likes.insertMany(insertArray);
};


/**
 * 点赞
 *
 * @param {*} ctx 上下文
 * @returns {*} null
 */
const like = async function (ctx) {
    const {uid = '', cid = ''} = ctx.request.body;
    if (uid && cid) {
        try {
            await redis.set(`likes:${uid}:${cid}`, 1);
            const key = `comment:likes:${cid}`;
            let commentLikes = await redis.get(key);
            if (!commentLikes) {
                const commentInfo = await Comment.findOne({cid});
                commentLikes = commentInfo.likes;
            }
            await redis.set(key, ++commentLikes);
            ctx.body = {code: code.SUCESS, msg: '点赞成功'};
        } catch (error) {
            ctx.body = {code: code.INSERT_FAIL, msg: '向redis插入数据失败'};
        }
    } else {
        ctx.body = {code: code.PARAMETER_MISS, msg: '缺少参数'};
    }
};

/**
 *取消点赞
 *
 * @param {*} ctx 上下文
 * @returns {*} null
 */
const unlike = async function (ctx) {
    const {uid = '', cid = ''} = ctx.request.body;
    if (uid && cid) {
        const key1 = `likes:${uid}:${cid}`;
        const status = redis.get(key1);
        if (status === 1) {
            await redis.del(key1);
        } else if (status === 2) {
            await redis.set(key1, 3);
        } else {
            ctx.body = {code: code.PARAMETER_ERROR, msg: '点赞已经取消，此操作异常'};
        }
        const key = `comment:likes:${cid}`;
        let commentLikes = await redis.get(key);
        if (!commentLikes) {
            const commentInfo = await Comment.findOne({cid});
            commentLikes = commentInfo.likes;
        }
        await redis.set(key, --commentLikes);
        ctx.body = {code: code.SUCESS, msg: '取消点赞成功'};
    } else {
        ctx.body = {code: code.PARAMETER_MISS, msg: '缺少参数'};
    }
};

module.exports = {
    like,
    unlike,
    syncData,
};
