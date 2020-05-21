/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-05-19 17:02:07
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-05-22 02:54:16
 * @Description: Description
 */
'use strict';
const Core = require('@alicloud/pop-core');
const crypto = require('crypto');

module.exports = {
  // 阿里短信SDK client实例
  get aliSMS() {
    const { KEY, client } = this.config.aliSMSConfig;
    if (!this[KEY]) {
      this[KEY] = new Core(client);
    }
    return this[KEY];
  },
  aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    let crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  },
  aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  },
};
