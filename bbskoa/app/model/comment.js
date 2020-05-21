/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-04-19 01:01:41
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-04-26 22:59:50
 * @Description: 评论类
 */
'use strict';

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    cid: {type: String},
    uid: {type: String},
    time: {type: Date},
    likes: {type: Number},
    comments: {type: Number},
    content: {type: String},
    ccid: {type: String},
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
