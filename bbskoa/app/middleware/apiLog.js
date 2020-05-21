/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-04-22 17:12:48
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-04-26 23:00:55
 * @Description: 请求日志记录
 */
'use strict';

const logger = require('../utils/logger');

const apiLog = async function (ctx, next) {
    const record = `[${ctx.request.method || 'get'}]\t${ctx.request.url}\t${JSON.stringify(ctx.request.body)}`;
    console.log(record);
    logger.info(record);
    await next();
};

module.exports = apiLog;
