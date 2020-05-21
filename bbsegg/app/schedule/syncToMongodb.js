/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-05-02 23:18:56
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-05-02 23:54:12
 * @Description: Description
 */
'use strict';
module.exports = {
  schedule: {
    cron: '0 0 6 * * *',
    type: 'worker',
  },
  async task(ctx) {
    const { app } = ctx;
    const { config, redis } = app;
    const { keyPrefix } = config.redis.client;
    const { CommentService } = ctx.service;
    const { Likes } = ctx.model;
    const cKeys = await redis.keys(`${keyPrefix}comment:likes:*`);
    cKeys.forEach(async key => {
      const cid = key.substr(key.lastIndexOf(':') + 1);
      const likes = await redis.get(key);
      await CommentService.update({ cid }, { $set: { likes } });
    });

    const lKeys = await redis.keys(`${keyPrefix}likes:`);
    const insertArray = [];
    for (const key of lKeys) {
      const status = await redis.get(key);
      if (status === 2) {
        continue;
      }
      const lastIndex = key.lastIndexOf(':');
      const uid = key.substr(key.indexOf('likes:' + 6), lastIndex);
      const cid = key.substr(lastIndex + 1);
      if (status === 1) {
        const lid = ctx.helper.getUUID();
        insertArray.push({ lid, uid, cid });
      } else if (status === 3) {
        await Likes.findOneAndRemove({ uid, cid });
      }
    }
    await Likes.insertMany(insertArray);
  },
};
