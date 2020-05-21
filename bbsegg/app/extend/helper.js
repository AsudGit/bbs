/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-05-01 18:22:26
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-05-22 02:54:10
 * @Description: Description
 */
'use strict';
const uuid = require('uuid');

module.exports = {
  getUUID(version = 'v1') {
    let result = version === 'v1' ? uuid.v1() : uuid.v4();
    result = result.split('-').join('');
    return result;
  },
  getNowDate() {
    const date = new Date();
    date.setHours(date.getHours() + 8);
    return date;
  },
};
