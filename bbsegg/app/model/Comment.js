/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-05-01 22:58:40
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-05-01 22:59:52
 * @Description: Description
 */
'use strict';

module.exports = app => {
  const { mongoose } = app;
  const commentSchema = new mongoose.Schema({
    cid: { type: String },
    uid: { type: String },
    time: { type: Date },
    likes: { type: Number },
    comments: { type: Number },
    content: { type: String },
    ccid: { type: String },
  });
  return mongoose.model('Comment', commentSchema);
};
