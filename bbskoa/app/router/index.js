/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-04-18 02:17:20
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-04-28 15:53:22
 * @Description: Description
 */
'use strict';

const router = require('koa-router')();
const user = require('./user');
const comment = require('./comment');
const likes = require('./likes');

router.get('/', (ctx, next) => {
    ctx.body = 'hello fuck you';
});

router.use('/user', user.routes());
router.use('/comment', comment.routes());
router.use('/likes', likes.routes());

module.exports = router;
