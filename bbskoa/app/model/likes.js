/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-04-19 01:07:13
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-04-19 01:09:40
 * @Description: 点赞类
 */
'use strict';

const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
    lid: {type: String},
    uid: {type: String},
    cid: {type: String},
});

const Likes = mongoose.model('Likes', likesSchema);

module.exports = Likes;
