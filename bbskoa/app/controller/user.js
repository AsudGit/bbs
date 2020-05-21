/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-04-18 14:22:18
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-05-01 02:19:51
 * @Description: 用户相关逻辑层
 */
'use strict';
const User = require('../module/user');
const myUtil = require('../utils/myUtil');
const code = require('../module/statusCode');

/**
 * 用户登陆处理
 *
 * @param {*} ctx 上下文
 * @returns {object} 登陆状态
 */
const longin = async function (ctx) {
    const {account = '', pwd = ''} = ctx.request.body;
    let userInfo = {};
    if (account) {
        userInfo = await User.findOne({$or: [{name: account}, {phone: account}, {email: account}]}).lean();
    }
    if (userInfo && userInfo.name) {
        const isEqual = await myUtil.encryptCompare(pwd, userInfo.pwd);
        if (isEqual) {
            ctx.session.userInfo = {name: userInfo.name};
            ctx.response.body = {code: code.SUCESS, msg: '登陆成功'};
            return;
        }
    }
    ctx.response.body = {code: code.PARAMETER_ERROR, msg: '账号或密码错误'};
};

/**
 *根据id获取用户信息
 *
 * @param {*} ctx 上下文
 * @returns {*} null
 */
const getOneById = async function (ctx) {
    const uid = ctx.params.uid || '';
    if (uid) {
        const userInfo = User.findOne({uid: uid});
        ctx.body = {code: code.SUCESS, data: userInfo};
    } else {
        ctx.body = {code: code.PARAMETER_MISS, msg: '缺少参数'};
    }
};

/**
 *获取所有用户信息
 *
 * @param {*} ctx ctx
 * @returns {*} null
 */
const list = async function (ctx) {
    const result = await User.find().lean();
    ctx.response.body = {code: code.SUCESS, data: result};
};

/**
 *根据id删除用户
 *
 * @param {*} ctx 上下文
 * @returns {*} null
 */
const removeById = async function (ctx) {
    const uid = ctx.params.uid || '';
    if (uid) {
        const result = await User.deleteOne({uid});
        if (result.deletedCount === 1) {
            ctx.body = {code: code.SUCESS, msg: '删除成功'};
            return;
        }
    }
    ctx.body = {code: code.DELETE_FAIL, msg: '删除失败'};
};

/**
 *更新用户信息
 *
 * @param {*} ctx 上下文
 * @returns {*} null
 */
const update = async function (ctx) {
    const user = ctx.request.body;
    if (user && user.uid) {
        const result = await User.update({uid: user.uid}, {$set: user});
        if (result.nModified === 1) {
            ctx.body = {code: code.SUCESS, msg: '更新成功'};
            return;
        }
    }
    ctx.body = {code: code.UPDATE_FAIL, msg: '更新失败'};
};

/**
 *用户注册处理
 * sex:0保密 1男 2女
 * @param {*} ctx 上下文
 * @returns {*} null
 */
const register = async function (ctx) {
    const {name, phone, email, pwd} = ctx.request.body;
    if (name && phone && email && pwd) {
        const userInfo = await User.findOne({$or: [{name}, {phone}, {email}]}).lean();
        if (userInfo && userInfo.name) {
            ctx.body = {code: code.PARAMETER_ERROR, msg: '该账号已存在'};
            return;
        }
        const uid = myUtil.getUUID();
        const headimg = `${__dirname}/default.jpg`;
        const description = '这个人很懒，什么都没说';
        const sex = 0;
        const birthday = new Date().getDate('2000-01-01');
        const encryptPwd = await myUtil.encrypt(pwd);
        await User.insertMany([{name, phone, email, uid, headimg,
            description, sex, birthday, pwd: encryptPwd}]);
        ctx.session.userInfo = {name};
        ctx.body = {code: code.SUCESS, msg: '注册成功'};
    } else {
        ctx.body = {code: code.PARAMETER_MISS, msg: '缺少必填项'};
    }
};

module.exports = {
    longin,
    getOneById,
    update,
    list,
    register,
    removeById,
};
