/*
 * @Author: your name
 * @Date: 2020-04-30 03:28:46
 * @LastEditTime: 2020-05-01 02:27:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bbsegg\app\router.js
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.post('/user/login', controller.userController.login);
  router.post('/user/register', controller.userController.register);
  router.post('/user/update', controller.userController.update);
  router.get('/user/get/:uid', controller.userController.getOneById);
  router.delete('/user/remove/:uid', controller.userController.removeById);
  router.get('/user/list', controller.userController.list);

  router.post('/comment/add', controller.commentController.add);
  router.get('/comment/list', controller.commentController.list);
  router.delete('/comment/remove/:cid', controller.commentController.removeById);

  router.post('/likes/like', controller.likesController.like);
  router.post('/likes/unlike', controller.likesController.unlike);

  router.get('/captcha', controller.captchaController.create);
  router.get('/captcha/sendsms/:phone', controller.captchaController.sendSms);

  router.post('/upload', controller.uploaderController.upload);
};
