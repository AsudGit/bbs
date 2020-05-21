/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-04-26 20:04:51
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-04-26 23:00:24
 * @Description: 登陆检测
 */
'use strict';

const loginCheck = async function (ctx, next) {
    const whiteList = ['/', '/user/login', '/user/list', '/user/register'];
    const reqUrl = ctx.request.url;
    for (const url of whiteList) {
        if (url === reqUrl) {
            await next();
            return;
        }
    }
    const userInfo = ctx.session.userInfo;
    if (userInfo && userInfo.name) {
        await next();
    } else {
        ctx.body = {code: '500', msg: '未登录'};
    }
};

module.exports = loginCheck;
