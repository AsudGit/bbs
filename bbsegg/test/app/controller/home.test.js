'use strict';

// const { app, assert } = require('egg-mock/bootstrap');
// const fs = require('fs');
const path = require('path');
const fs = require('fs-extra');
const crypto = require('crypto');

function aesEncrypt(data, key) {
  const cipher = crypto.createCipher('aes192', key);
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function aesDecrypt(encrypted, key) {
  const decipher = crypto.createDecipher('aes192', key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

describe('test/app/controller/home.test.js', () => {
  // it('should assert', () => {
  //   const pkg = require('../../../package.json');
  //   assert(app.config.keys.startsWith(pkg.name));

  //   // const ctx = app.mockContext({});
  //   // yield ctx.service.xx();
  // });

  // it('should GET /', () => {
  //   return app.httpRequest()
  //     .get('/')
  //     .expect('hi, egg')
  //     .expect(200);
  // });
  it('jiami', () => {
    const data = 'LTAI4G17jDBsfskN8f38NsAu';
    const key = fs.readFileSync(path.resolve('../keysfile/privateKey'), 'utf8');
    const encrypted = aesEncrypt(data, key);
    const decrypted = aesDecrypt(encrypted, key);
    console.log('Plain text: ' + data);
    console.log('Encrypted text: ' + encrypted);
    console.log('Decrypted text: ' + decrypted);
  });
});
