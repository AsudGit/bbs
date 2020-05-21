/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-04-19 00:59:45
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-04-26 22:59:36
 * @Description: 用户类
 */
'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid: {type: String},
    name: {type: String},
    headimg: {type: String},
    phone: {type: String},
    email: {type: String},
    description: {type: String},
    pwd: {type: String},
    sex: {type: Number},
    birthday: {type: Date},
});
const User = mongoose.model('User', userSchema);

module.exports = User;
