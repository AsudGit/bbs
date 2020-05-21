/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-04-28 16:07:44
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-04-28 18:14:35
 * @Description: Description
 */
'use strict';
const CronJob = require('cron').CronJob;
const likescontroller = require('../controller/likes');

// eslint-disable-next-line no-unused-vars
const test = new CronJob('0 0 6 * * *', likescontroller.syncData, null, true);


