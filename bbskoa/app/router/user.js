/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-04-18 02:18:37
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-04-27 00:40:37
 * @Description: Description
 */
'use strict';

const router = require('koa-router')();
const userController = require('../controller/user');


router.post('/login', userController.longin);

router.post('/update', userController.update);

router.get('/get/:uid', userController.getOneById);

router.delete('/remove/:uid', userController.removeById);

router.get('/list', userController.list);

router.post('/register', userController.register);

module.exports = router;
