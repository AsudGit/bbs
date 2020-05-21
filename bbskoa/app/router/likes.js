/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-04-28 15:51:40
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-04-28 15:54:24
 * @Description: Description
 */
'use strict';
const router = require('koa-router')();
const likesController = require('../controller/likes');

router.post('/like', likesController.like);
router.post('/unlike', likesController.unlike);

module.exports = router;
