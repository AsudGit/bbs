/*
 * @Author: your name
 * @Date: 2020-05-18 15:53:59
 * @LastEditTime: 2020-05-18 15:54:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bbsegg\app\controller\UploaderController.js
 */
'use strict';
const sendToWormhole = require('stream-wormhole');
const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;

class UploaderController extends Controller {
  async upload() {
    const ctx = this.ctx;
    const parts = ctx.multipart();
    let part;
    // parts() 返回 promise 对象
    while ((part = await parts()) != null) {
      if (part.length) {
        // 这是 busboy 的字段
        console.log('field: ' + part[0]);
        console.log('value: ' + part[1]);
        console.log('valueTruncated: ' + part[2]);
        console.log('fieldnameTruncated: ' + part[3]);
      } else {
        if (!part.filename) {
          // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
          // 需要做出处理，例如给出错误提示消息
          console.log('空');
          return;
        }
        // part 是上传的文件流
        console.log('field: ' + part.fieldname);
        console.log('filename: ' + part.filename);
        console.log('encoding: ' + part.encoding);
        console.log('mime: ' + part.mime);
        // 文件处理，上传到云存储等等
        const filePath = path.join(path.resolve('./app/upload'), 'headimg.jpg');
        const writerStream = fs.createWriteStream(filePath);
        try {
          await part.pipe(writerStream);
        } catch (err) {
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          await sendToWormhole(part);
          throw err;
        }
        ctx.body = { code: ctx.statusCode.SUCESS, data: { url: filePath } };
      }
    }
    console.log('and we are done parsing the form!');
  }
}

module.exports = UploaderController;
