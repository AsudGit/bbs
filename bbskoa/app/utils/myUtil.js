/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-04-24 20:06:04
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-04-28 02:10:18
 * @Description: 工具类
 */
'use strict';
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const config = require('config');


/**
 *获取uuid
 *
 * @param {string} [version='v1'] 使用的时间戳还是随机生成
 * @returns {string} uuid
 */
const getUUID = function (version = 'v1') {
    let result = version === 'v1' ? uuid.v1() : uuid.v4();
    result = result.split('-').join('');
    return result;
};


/**
 *加密
 *
 * @param {string} text 需要加密的文本
 * @returns {string} 加密结果
 */
const encrypt = async function (text) {
    const result = await bcrypt.hash(text, config.saltRounds);
    return result;
};

/**
 *比较文本是否是加密文本原文本
 *
 * @param {string} text 原文本
 * @param {string} ciphertext 加密文本
 * @returns {boolean} 比较结果
 */
const encryptCompare = async function (text, ciphertext) {
    return await bcrypt.compare(text, ciphertext);
};

/**
 *返回当前日期对象（东八区时间）
 *
 * @returns {Date} 日期对象
 */
const getNowDate = function () {
    const date = new Date();
    date.setHours(date.getHours() + 8);
    return date;
};

module.exports = {
    getUUID,
    encrypt,
    encryptCompare,
    getNowDate,
};
