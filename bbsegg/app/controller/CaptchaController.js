/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-05-17 01:10:28
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-05-19 20:46:04
 * @Description: Description
 */
'use strict';
const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha');

class CaptchaController extends Controller {
  async create() {
    const { ctx } = this;
    const captcha = svgCaptcha.create({ color: true, background: '#909399' });
    ctx.session.captcha = captcha.text;
    ctx.type = 'svg';
    ctx.status = 200;
    ctx.response.body = captcha.data;
  }
  async sendSms() {
    const { ctx, app } = this;
    const phone = ctx.params.phone || '';
    if (phone) {
      const params = this.config.aliSMSConfig.params;
      params.PhoneNumbers = phone;
      const code = Math.random().toString().slice(-6);
      params.TemplateParam = `{code:${code}}`;
      const requestOption = {
        method: 'POST',
      };

      return this.app.aliSMS.request('SendSms', params, requestOption).then(result => {
        console.log(JSON.stringify(result));
        if (result.Code === 'OK') {
          app.redis.set(`captcha:sms:${phone}`, params.TemplateParam);
          ctx.body = { code: ctx.statusCode.SUCESS, msg: '验证码发送成功，请留意手机短信' };
        } else {
          ctx.body = { code: ctx.statusCode.SMS_FAIL, msg: '发送失败' };
        }
      }, ex => {
        console.log(ex);
      });
    }
    ctx.body = { code: ctx.statusCode.PARAMETER_MISS, msg: '缺少参数' };
  }
}
module.exports = CaptchaController;
