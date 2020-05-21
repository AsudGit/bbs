/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-05-02 21:45:25
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-05-02 22:01:30
 * @Description: Description
 */
'use strict';

module.exports = app => {
  const { mongoose } = app;

  const likesSchema = new mongoose.Schema({
    lid: { type: String },
    uid: { type: String },
    cid: { type: String },
  });

  return mongoose.model('Likes', likesSchema, 'likes');

};

