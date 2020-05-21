/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-04-30 04:57:43
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-04-30 05:00:45
 * @Description: Description
 */
'use strict';

module.exports = app => {
  const { mongoose } = app;
  const userSchema = new mongoose.Schema({
    uid: { type: String },
    name: { type: String },
    headimg: { type: String },
    phone: { type: String },
    email: { type: String },
    description: { type: String },
    pwd: { type: String },
    sex: { type: Number },
    birthday: { type: Date },
  });
  return mongoose.model('User', userSchema, 'user');
};
