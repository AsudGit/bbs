/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-04-18 02:18:25
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-05-01 23:02:05
 * @Description: Description
 */
'use strict';

const router = require('koa-router')();
const commentController = require('../controller/comment');

router.post('/add', commentController.add);

router.get('/list', commentController.list);

router.delete('/remove/:cid', commentController.removeById);

module.exports = router;
