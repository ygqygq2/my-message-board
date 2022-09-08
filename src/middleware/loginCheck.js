/*
 * @Author      : Chinge Yang
 * @Date        : 2022-09-08 16:29:51
 * @LastEditTime: 2022-09-08 16:36:51
 * @LastEditors : Chinge Yang
 * @Description : 登录验证的中间件
 * @FilePath    : /my-message-board/src/middleware/loginCheck.js
 */

async function loginCheck(ctx, next) {
    const session = ctx.session;
    const userInfo = session.userInfo;
    if (userInfo && userInfo.username) {
        // 登录验证通过
        await next();
        return;
    }
    // 未登录
    ctx.body = {
        errno: -1,
        message: "用户未登录"
    };
}

module.exports = loginCheck;
