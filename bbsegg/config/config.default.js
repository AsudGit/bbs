/*
 * @Author: your name
 * @Date: 2020-04-30 03:28:46
 * @LastEditTime: 2020-04-30 23:36:24
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \bbsegg\config\config.default.js
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1588188407339_4887';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ],
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/eggcomment',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10,
        auth: { authSource: 'admin' },
        user: 'admin',
        pass: 'rootadmin',
      },
    },
  };
  config.bcrypt = {
    saltRounds: 10,
  };

  config.session = {
    key: 'egg:sess',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
    // 每次访问都重新设置cookie
    rolling: false,
    // 在每次访问快要过期时才重新设置cookie
    renew: true,
  };
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      keyPrefix: 'bbsegg:', // 存诸前缀
      // eslint-disable-next-line no-magic-numbers
      // ttl: 60 * 60 * 23, // 过期时间
      db: 0,
      password: 'bohee12345',
    },
    agent: true,
  };

  config.aliSMSConfig = {
    client: {
      accessKeyId: '46ba7c085bbc4aa7135cd3415a33da63be9ab36dafa7bffeef0fe1b2ba4eb855',
      accessKeySecret: 'abacb775c1efe625bccd45bfd14bbc3943356f476b9a90986d1e9fd1a14a3167',
      endpoint: 'https://dysmsapi.aliyuncs.com',
      apiVersion: '2017-05-25',
    },
    KEY: Symbol('bssegg#alisms'),
    params: {
      RegionId: 'cn-hangzhou',
      // PhoneNumbers: '',
      SignName: '8d203accf6b324ab377826c343b50aa0',
      TemplateCode: 'SMS_138000010',
      // TemplateParam: '{code:''}',
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
