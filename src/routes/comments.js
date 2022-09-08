/*
 * @Author      : Chinge Yang
 * @Date        : 2022-09-06 11:03:05
 * @LastEditTime: 2022-09-08 17:03:52
 * @LastEditors : Chinge Yang
 * @Description : 评论相关的路由
 * @FilePath    : /my-message-board/src/routes/comments.js
 */
const router = require("koa-router")();
const loginCheck = require("../middleware/loginCheck");
const { getCommentList, createComment } = require("../controller/comment");

router.prefix("/comment");

// 定义路由：获取留言板列表
router.get("/list", loginCheck, async (ctx, next) => {
    // 获取 filterType: 1 - 全部, 2 - 我的
    let { filterType } = ctx.query;
    filterType = parseInt(filterType) || 1;

    // 获取当前用户名
    let username = "";
    if (filterType === 2) {
        username = ctx.session.userInfo.username;
    }

    // 获取留言列表
    const list = await getCommentList(username);
    ctx.body = {
        errno: 0,
        data: list
    };
});

// 定义路由：创建留言
router.post("/create", loginCheck, async (ctx, next) => {
    const { content } = ctx.request.body;
    const { username } = ctx.session.userInfo;

    try {
        // 提交留言
        const newComment = await createComment(content, username);

        // 返回
        ctx.body = {
            errno: 0,
            data: newComment
        };
    } catch (ex) {
        console.error(ex);
        ctx.body = {
            errno: -1,
            message: "创建留言失败"
        };
    }
});

module.exports = router;
